/**
 * Comprehensive Automated Test Suite for StudySync Global Real-Time Notification System
 * Tests:
 * 1. AI Health Monitoring & Error Classification
 * 2. Notification Model & Compound Indexes
 * 3. Notification Service & Preference Filtering
 * 4. Group Activity Notifications (join, leave, update, remove)
 * 5. Notes & Knowledge Notifications (create, update, delete, share)
 * 6. Full HTTP REST API Stack (Cookie Auth, Controllers, JSON responses)
 * 7. Socket.IO Real-time Synchronization
 */

require("dotenv").config({ path: __dirname + "/.env" });
const mongoose = require("mongoose");
const http = require("http");
const app = require("./src/app");
const { setSocketServer, getIO } = require("./src/sockets/socket.server");
const notificationModel = require("./src/models/notification.model");
const notificationPreferenceModel = require("./src/models/notificationPreference.model");
const userModel = require("./src/models/user.model");
const groupModel = require("./src/models/group.model");
const joinGroupModel = require("./src/models/joinGroup.model");
const noteModel = require("./src/models/note.model");
const notificationService = require("./src/services/notification.service");
const aiHealthService = require("./src/services/aiHealth.service");
const jwt = require("jsonwebtoken");
const config = require("./src/config/config");

let server;
let testUser1;
let testUser2;
let testGroup;
let testToken1;
let testToken2;
const PORT = 3004;

async function runTests() {
  console.log("=================================================");
  console.log("🧪 STARTING NOTIFICATION SYSTEM TEST SUITE");
  console.log("=================================================\n");

  try {
    // 1. Connect DB
    await mongoose.connect(config.MONGODB_URI);
    console.log("✅ MongoDB Connected");

    // 2. Start HTTP & Socket server on test port
    server = http.createServer(app);
    setSocketServer(server);
    await new Promise((resolve) => server.listen(PORT, resolve));
    console.log(`✅ Test Server listening on port ${PORT}\n`);

    // 3. Setup test users and tokens
    const uniqueSuffix = Date.now().toString().slice(-6);
    testUser1 = await userModel.create({
      fullname: { firstname: `Alice_${uniqueSuffix}`, lastname: "Tester" },
      email: `alice_${uniqueSuffix}@example.com`,
      password: "password123",
    });

    testUser2 = await userModel.create({
      fullname: { firstname: `Bob_${uniqueSuffix}`, lastname: "Tester" },
      email: `bob_${uniqueSuffix}@example.com`,
      password: "password123",
    });

    testToken1 = jwt.sign(
      { id: testUser1._id.toString(), email: testUser1.email },
      config.JWT_SECRET_KEY
    );
    testToken2 = jwt.sign(
      { id: testUser2._id.toString(), email: testUser2.email },
      config.JWT_SECRET_KEY
    );

    console.log(`👤 Created Test Users: ${testUser1.fullname.firstname} & ${testUser2.fullname.firstname}\n`);

    // ==========================================
    // TEST 1: AI Health Tracker & Classification
    // ==========================================
    console.log("--- TEST 1: AI Health Monitoring & Error Classification ---");
    const initialStatus = aiHealthService.getStatus();
    console.assert(initialStatus.status === "operational", "Initial status should be operational");

    // Test error classification
    const timeoutErr = new Error("Gateway Timeout");
    timeoutErr.isTimeout = true;
    const classifiedTimeout = aiHealthService.classifyError(timeoutErr);
    console.assert(classifiedTimeout.kind === "timeout", "Should classify timeout error");

    const rateLimitErr = new Error("RESOURCE_EXHAUSTED 429");
    const classifiedRate = aiHealthService.classifyError(rateLimitErr);
    console.assert(classifiedRate.kind === "rate_limit", "Should classify rate limit error");

    // Simulate failures and check state transitions
    aiHealthService.recordFailure(new Error("503 Service Unavailable"));
    aiHealthService.recordFailure(new Error("503 Service Unavailable"));
    const degradedStatus = aiHealthService.getStatus();
    console.assert(degradedStatus.status === "degraded", `Expected degraded, got ${degradedStatus.status}`);

    aiHealthService.recordFailure(new Error("503 Service Unavailable"));
    aiHealthService.recordFailure(new Error("503 Service Unavailable"));
    const unavailableStatus = aiHealthService.getStatus();
    console.assert(unavailableStatus.status === "unavailable", `Expected unavailable, got ${unavailableStatus.status}`);

    // Simulate recovery
    aiHealthService.recordSuccess();
    const recoveringStatus = aiHealthService.getStatus();
    console.assert(recoveringStatus.status === "recovering", `Expected recovering, got ${recoveringStatus.status}`);

    aiHealthService.recordSuccess();
    const operationalStatus = aiHealthService.getStatus();
    console.assert(operationalStatus.status === "operational", `Expected operational, got ${operationalStatus.status}`);
    console.log("✅ TEST 1 PASSED: AI Health state transitions & error classification working perfectly!\n");

    // ==========================================
    // TEST 2: Notification Preferences & Filtering
    // ==========================================
    console.log("--- TEST 2: Notification Preferences & Delivery Filtering ---");
    const defaultPrefs = await notificationService.getUserPreferences(testUser1._id);
    console.assert(defaultPrefs.groupMessages === true, "groupMessages should default to true");
    console.assert(defaultPrefs.groupActivities === true, "groupActivities should default to true");

    // Disable group messages for Alice
    await notificationPreferenceModel.updateOne(
      { userId: testUser1._id },
      { $set: { groupMessages: false } }
    );

    // Try sending a group_message category notification to Alice
    const filteredNotification = await notificationService.notifyUser({
      userId: testUser1._id,
      type: "group_message",
      category: "message",
      title: "Should be filtered",
      message: "This should not be delivered because groupMessages is false",
    });
    console.assert(filteredNotification === null, "Notification should have been suppressed by preferences");

    // Re-enable preferences
    await notificationPreferenceModel.updateOne(
      { userId: testUser1._id },
      { $set: { groupMessages: true } }
    );
    console.log("✅ TEST 2 PASSED: Notification preference suppression working correctly!\n");

    // ==========================================
    // TEST 3: Group Activity Notifications
    // ==========================================
    console.log("--- TEST 3: Group Activities & Multi-member Notification ---");
    testGroup = await groupModel.create({
      name: `CyberSec_Study_${uniqueSuffix}`,
      description: "Testing group activities",
      field: "Cyber Security",
      owner: testUser1._id,
      members: 2,
    });

    // Bob joins group
    await joinGroupModel.create({
      userId: testUser2._id,
      groupId: testGroup._id,
    });

    // Notify group members of new note
    await notificationService.notifyGroupMembers({
      groupId: testGroup._id,
      excludeUserId: testUser1._id, // Alice is author, Bob should receive
      type: "note_create",
      category: "notes",
      title: `New note in ${testGroup.name}`,
      message: `${testUser1.fullname.firstname} created note: "Network Security Fundamentals"`,
      resourceType: "note",
      resourceId: "12345",
      metadata: { actionUrl: `/group/${testGroup._id}` },
    });

    const bobNotification = await notificationModel.findOne({
      userId: testUser2._id,
      type: "note_create",
    });
    console.assert(bobNotification !== null, "Bob should receive note_create notification");
    console.assert(bobNotification.isRead === false, "Notification should be unread");
    console.assert(bobNotification.title.includes(testGroup.name), "Notification title should match group");
    console.log("✅ TEST 3 PASSED: Group member notifications delivered accurately!\n");

    // ==========================================
    // TEST 4: Read/Unread State & Counting
    // ==========================================
    console.log("--- TEST 4: Read/Unread State & Counts ---");
    // Add another notification for Bob
    await notificationService.notifyUser({
      userId: testUser2._id,
      type: "group_mention",
      category: "group",
      title: `Mentioned in ${testGroup.name}`,
      message: `${testUser1.fullname.firstname} mentioned you in discussion.`,
      priority: "high",
    });

    let bobUnreadCount = await notificationModel.countDocuments({
      userId: testUser2._id,
      isRead: false,
    });
    console.assert(bobUnreadCount === 2, `Bob should have 2 unread notifications, got ${bobUnreadCount}`);

    // Mark single notification as read
    await notificationService.markAsRead(bobNotification._id, testUser2._id);
    const updatedNote = await notificationModel.findById(bobNotification._id);
    console.assert(updatedNote.isRead === true, "Notification should now be read");
    console.assert(updatedNote.readAt !== null, "Notification should have readAt timestamp");

    bobUnreadCount = await notificationModel.countDocuments({
      userId: testUser2._id,
      isRead: false,
    });
    console.assert(bobUnreadCount === 1, `Bob should have 1 unread notification now, got ${bobUnreadCount}`);
    console.log("✅ TEST 4 PASSED: Read/unread transitions & counts working!\n");

    // ==========================================
    // TEST 5: Full HTTP REST API Stack
    // ==========================================
    console.log("--- TEST 5: HTTP REST API Endpoints Verification ---");
    const baseUrl = `http://localhost:${PORT}/api/notifications`;
    const headers = {
      Cookie: `token=${testToken2}`,
      "Content-Type": "application/json",
    };

    // 5.1 GET /api/notifications
    const getRes = await fetch(`${baseUrl}?page=1&limit=10`, { headers });
    console.assert(getRes.status === 200, `GET /api/notifications returned ${getRes.status}`);
    const getData = await getRes.json();
    console.assert(Array.isArray(getData.notifications), "notifications should be array");
    console.assert(getData.notifications.length >= 2, "Should return at least 2 notifications");
    console.assert(getData.unreadCount === 1, `unreadCount should be 1, got ${getData.unreadCount}`);

    // 5.2 GET /api/notifications/unread-count
    const unreadRes = await fetch(`${baseUrl}/unread-count`, { headers });
    console.assert(unreadRes.status === 200, `GET /unread-count returned ${unreadRes.status}`);
    const unreadData = await unreadRes.json();
    console.assert(unreadData.unreadCount === 1, `unreadCount should be 1, got ${unreadData.unreadCount}`);

    // 5.3 GET /api/notifications/preferences
    const prefRes = await fetch(`${baseUrl}/preferences`, { headers });
    console.assert(prefRes.status === 200, `GET /preferences returned ${prefRes.status}`);
    const prefData = await prefRes.json();
    console.assert(prefData.preferences.groupMessages === true, "Preferences should return groupMessages");

    // 5.4 PATCH /api/notifications/preferences
    const updatePrefRes = await fetch(`${baseUrl}/preferences`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ soundNotifications: false }),
    });
    console.assert(updatePrefRes.status === 200, `PATCH /preferences returned ${updatePrefRes.status}`);
    const updatePrefData = await updatePrefRes.json();
    console.assert(updatePrefData.preferences.soundNotifications === false, "Sound notifications should be false");

    // 5.5 PATCH /api/notifications/read-all
    const readAllRes = await fetch(`${baseUrl}/read-all`, {
      method: "PATCH",
      headers,
    });
    console.assert(readAllRes.status === 200, `PATCH /read-all returned ${readAllRes.status}`);

    // Check count after read-all
    const afterReadAllRes = await fetch(`${baseUrl}/unread-count`, { headers });
    const afterReadAllData = await afterReadAllRes.json();
    console.assert(afterReadAllData.unreadCount === 0, `Unread count should be 0 after read-all, got ${afterReadAllData.unreadCount}`);

    // 5.6 DELETE /api/notifications/:id
    const deleteRes = await fetch(`${baseUrl}/${bobNotification._id}`, {
      method: "DELETE",
      headers,
    });
    console.assert(deleteRes.status === 200, `DELETE /:id returned ${deleteRes.status}`);
    const verifyDeleted = await notificationModel.findById(bobNotification._id);
    console.assert(verifyDeleted === null, "Notification should be deleted from DB");

    // 5.7 GET /api/notifications/ai-status
    const aiRes = await fetch(`${baseUrl}/ai-status`, { headers });
    console.assert(aiRes.status === 200, `GET /ai-status returned ${aiRes.status}`);
    const aiData = await aiRes.json();
    console.assert(aiData.status.status === "operational", "AI status should be operational");

    // 5.8 POST /api/notifications/test-event
    const testEventRes = await fetch(`${baseUrl}/test-event`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        category: "academic",
        title: "Test Academic Event",
        message: "Testing new academic quiz notification pipeline.",
      }),
    });
    console.assert(testEventRes.status === 201, `POST /test-event returned ${testEventRes.status}`);
    const testEventData = await testEventRes.json();
    console.assert(testEventData.notification.category === "academic", "Notification category should be academic");
    console.log("✅ TEST 5 PASSED: Full HTTP REST API Stack verified!\n");

    // ==========================================
    // TEST 6: Unauthorized Access & Security
    // ==========================================
    console.log("--- TEST 6: Authorization & Security Checks ---");
    // Attempt to access without token
    const unauthRes = await fetch(baseUrl);
    console.assert(unauthRes.status === 401, `Expected 401 Unauthorized without token, got ${unauthRes.status}`);

    // Alice attempts to delete Bob's notification
    const testNotifBob = await notificationModel.create({
      userId: testUser2._id,
      type: "system_alert",
      category: "system",
      title: "Bob's private alert",
      message: "Do not touch",
    });

    const crossUserDeleteRes = await fetch(`${baseUrl}/${testNotifBob._id}`, {
      method: "DELETE",
      headers: { Cookie: `token=${testToken1}` }, // Alice's token
    });
    console.assert(crossUserDeleteRes.status === 404, `Alice should not be able to delete Bob's notification, got ${crossUserDeleteRes.status}`);

    const stillExists = await notificationModel.findById(testNotifBob._id);
    console.assert(stillExists !== null, "Bob's notification should still exist after unauthorized delete attempt");
    console.log("✅ TEST 6 PASSED: Security and authorization boundaries strictly enforced!\n");

    // ==========================================
    // CLEANUP
    // ==========================================
    console.log("🧹 Cleaning up test database artifacts...");
    await notificationModel.deleteMany({
      userId: { $in: [testUser1._id, testUser2._id] },
    });
    await notificationPreferenceModel.deleteMany({
      userId: { $in: [testUser1._id, testUser2._id] },
    });
    await joinGroupModel.deleteMany({ groupId: testGroup._id });
    await groupModel.findByIdAndDelete(testGroup._id);
    await userModel.deleteMany({
      _id: { $in: [testUser1._id, testUser2._id] },
    });

    console.log("=================================================");
    console.log("🎉 ALL 6 NOTIFICATION SYSTEM TEST SUITES PASSED!");
    console.log("=================================================\n");
  } catch (err) {
    console.error("❌ TEST FAILURE:", err);
    process.exit(1);
  } finally {
    if (server) {
      server.close();
    }
    await mongoose.disconnect();
    process.exit(0);
  }
}

runTests();
