/**
 * Centralized E2EE Manager for StudySync
 * - Manages user key pair lifecycle (singleton initialization)
 * - Manages group encryption key resolution, unwrapping, and distribution
 * - Provides high-performance message decryption caching
 */

import api from "../api";
import {
  generateUserKeyPair,
  generateGroupKey,
  wrapGroupKeyForRecipient,
  unwrapGroupKeyForUser,
  decryptMessage,
  getGroupKeyFingerprint,
  validateAndNormalizePublicKeyJwk,
} from "./cryptoService";
import {
  getUserKeyPair,
  saveUserKeyPair,
  getGroupKey,
  saveGroupKey,
} from "./cryptoStorage";

// In-memory singletons to prevent concurrent duplicate initializations
let userInitPromise = null;
let currentLoadedUserKeys = null;
let currentLoadedUserId = null;

const groupInitPromises = new Map(); // groupId -> Promise
const groupKeyMemoryCache = new Map(); // `${groupId}_v${version}` -> CryptoKey
const decryptedMessageCache = new Map(); // messageId -> FormattedMessage

/**
 * Ensures user's local RSA key pair is generated, persisted in IndexedDB,
 * and registered with the backend public key registry.
 */
export async function ensureUserE2EE(userId, userDoc = null) {
  if (!userId) return null;
  const normalizedUserId = userId.toString();

  if (currentLoadedUserId === normalizedUserId && currentLoadedUserKeys?.privateKey) {
    return currentLoadedUserKeys;
  }

  if (userInitPromise && currentLoadedUserId === normalizedUserId) {
    return await userInitPromise;
  }

  userInitPromise = (async () => {
    try {
      console.log("[E2EE] Initialization started for user:", normalizedUserId);

      // Step 1: Check local IndexedDB for existing key pair
      let userKeys = await getUserKeyPair(normalizedUserId);

      if (!userKeys || !userKeys.privateKey || !userKeys.publicKeyJwk) {
        console.log("[E2EE] Generating local user key pair...");
        const newKeyPair = await generateUserKeyPair();
        await saveUserKeyPair(normalizedUserId, newKeyPair);
        userKeys = newKeyPair;

        // Register public key JWK on the server
        try {
          await api.put("/auth/public-key", { publicKey: newKeyPair.publicKeyJwk });
          console.log("[E2EE] Public key registered for user:", normalizedUserId);
        } catch (apiErr) {
          console.error("[E2EE] Failed to register public key on server:", apiErr?.response?.data?.message || apiErr?.message);
        }
      } else {
        console.log("[E2EE] Local key pair loaded for user:", normalizedUserId);
        // If server user object is known to lack publicKey, sync it up
        if (userDoc && !userDoc.publicKey) {
          try {
            await api.put("/auth/public-key", { publicKey: userKeys.publicKeyJwk });
            console.log("[E2EE] Synced existing local public key to server for user:", normalizedUserId);
          } catch {
            // Silently ignore sync errors if server already has it
          }
        }
      }

      currentLoadedUserId = normalizedUserId;
      currentLoadedUserKeys = userKeys;
      return userKeys;
    } catch (err) {
      console.error("[E2EE] User key initialization error:", err?.message || err);
      throw err;
    } finally {
      userInitPromise = null;
    }
  })();

  return await userInitPromise;
}

/**
 * Resolves the active group AES encryption key for a given group.
 * Handles unwrapping, auto-provisioning, and envelope wrapping for members.
 */
export async function resolveGroupE2EE(groupId, userId, userDoc = null) {
  if (!groupId || !userId) {
    return {
      groupKey: null,
      keyVersion: 1,
      fingerprint: "NONE",
      status: "error",
      error: "Missing groupId or userId",
    };
  }

  const normalizedGroupId = groupId.toString();
  const normalizedUserId = userId.toString();
  const cacheKey = `${normalizedGroupId}_${normalizedUserId}`;

  if (groupInitPromises.has(cacheKey)) {
    return await groupInitPromises.get(cacheKey);
  }

  const promise = (async () => {
    try {
      // 1. Ensure user's personal keys are ready
      const userKeys = await ensureUserE2EE(normalizedUserId, userDoc);
      if (!userKeys?.privateKey) {
        return {
          groupKey: null,
          keyVersion: 1,
          fingerprint: "NONE",
          status: "error",
          error: "User private key unavailable",
        };
      }

      // 2. Fetch server envelopes & member public keys
      const keysRes = await api.get(`/groups/${normalizedGroupId}/keys`);
      const {
        hasGroupKey,
        keyVersion: serverKeyVer,
        myEnvelope,
        existingEnvelopeUserIds = [],
        members = [],
      } = keysRes.data || {};

      const currentVersion = serverKeyVer || 1;
      const memCacheId = `${normalizedGroupId}_v${currentVersion}`;

      // 3. Check in-memory cache first
      let groupKey = groupKeyMemoryCache.get(memCacheId) || null;

      // 4. Check local IndexedDB
      if (!groupKey) {
        groupKey = await getGroupKey(normalizedGroupId, currentVersion);
      }

      // 5. If not in local storage, unwrap from user's server envelope
      if (!groupKey && myEnvelope?.encryptedGroupKey) {
        try {
          groupKey = await unwrapGroupKeyForUser(
            myEnvelope.encryptedGroupKey,
            userKeys.privateKey
          );
          await saveGroupKey(normalizedGroupId, currentVersion, groupKey);
          console.log("[E2EE] Group key unwrapped for group:", normalizedGroupId);
        } catch (unwrapErr) {
          console.error("[E2EE] Failed to unwrap group key:", unwrapErr?.message || unwrapErr);
        }
      }

      // 6. If NO canonical group key exists anywhere for this group, provision version 1
      if (!groupKey && !hasGroupKey && !myEnvelope) {
        console.log("[E2EE] Provisioning new canonical group key for group:", normalizedGroupId);
        groupKey = await generateGroupKey();
        await saveGroupKey(normalizedGroupId, currentVersion, groupKey);
      }

      // 7. If group key exists on server, but current user lacks an envelope
      if (!groupKey && hasGroupKey && !myEnvelope) {
        console.log(`[E2EE] Member public key registered, waiting for group key envelope in group ${normalizedGroupId}`);
        return {
          groupKey: null,
          keyVersion: currentVersion,
          fingerprint: "PENDING",
          status: "waiting_for_key",
          error: "Waiting for an active group member to wrap key for your account.",
        };
      }

      if (!groupKey) {
        return {
          groupKey: null,
          keyVersion: currentVersion,
          fingerprint: "NONE",
          status: "error",
          error: "Failed to resolve or decrypt group key",
        };
      }

      // Store in memory cache
      groupKeyMemoryCache.set(memCacheId, groupKey);

      // 8. Auto-wrap canonical group key for any members who are missing envelopes
      if (Array.isArray(members) && members.length > 0) {
        const envelopeSet = new Set(existingEnvelopeUserIds.map((id) => id.toString()));
        const newEnvelopes = [];

        for (const member of members) {
          const mId = member._id?.toString();
          if (!mId) continue;

          // If member does not already have an envelope on the server
          if (!envelopeSet.has(mId)) {
            if (!member.publicKey) {
              console.log(`[E2EE] Member ${mId} has not initialized E2EE public key yet`);
              continue;
            }

            const cleanJwk = validateAndNormalizePublicKeyJwk(member.publicKey);
            if (!cleanJwk) {
              console.warn(`[E2EE] Member ${mId} has invalid or incompatible public key`);
              continue;
            }

            try {
              const wrapped = await wrapGroupKeyForRecipient(groupKey, cleanJwk);
              newEnvelopes.push({
                userId: mId,
                encryptedGroupKey: wrapped,
              });
            } catch (wrapErr) {
              console.warn(`[E2EE] Failed to wrap key for member ${mId}:`, wrapErr?.message || wrapErr);
            }
          }
        }

        if (newEnvelopes.length > 0) {
          try {
            await api.post(`/groups/${normalizedGroupId}/keys`, {
              keyVersion: currentVersion,
              envelopes: newEnvelopes,
            });
            console.log(`[E2EE] Successfully published ${newEnvelopes.length} new group key envelopes`);
          } catch (postErr) {
            console.error("[E2EE] Failed to save member envelopes:", postErr?.response?.data?.message || postErr?.message);
          }
        }
      }

      // 9. Compute diagnostic fingerprint
      const fingerprint = await getGroupKeyFingerprint(groupKey);

      console.log(`[E2EE] Group key active for group ${normalizedGroupId} [v${currentVersion}:${fingerprint}]`);

      return {
        groupKey,
        keyVersion: currentVersion,
        fingerprint,
        status: "ready",
      };
    } catch (err) {
      console.error("[E2EE] Error resolving group E2EE:", err?.message || err);
      return {
        groupKey: null,
        keyVersion: 1,
        fingerprint: "NONE",
        status: "error",
        error: err?.message || "E2EE initialization failed",
      };
    } finally {
      groupInitPromises.delete(cacheKey);
    }
  })();

  groupInitPromises.set(cacheKey, promise);
  return await promise;
}

/**
 * Formats and decrypts a single message document with high performance caching.
 */
export async function formatAndDecryptMessage(msgDoc, groupKey, cryptoStatus, currentUserId) {
  if (!msgDoc) return null;

  const msgId = msgDoc._id || msgDoc.id || `temp_${Date.now()}_${Math.random()}`;
  const msgUserId = msgDoc.user?._id || msgDoc.user?.id || msgDoc.user;
  const isYou =
    msgUserId && currentUserId
      ? msgUserId.toString() === currentUserId.toString()
      : false;

  const cacheKey = `${msgId}_${cryptoStatus === "ready" ? "ready" : "pending"}`;

  // Check cache for already decrypted message
  const cached = decryptedMessageCache.get(cacheKey);
  if (cached && (cached.decryptionStatus === "success" || cached.decryptionStatus === "failed")) {
    return { ...cached, isYou };
  }

  let text = "";
  let dStatus = "loading";
  let errorMessage = "";

  const isEncrypted = Boolean(msgDoc.ciphertext && msgDoc.iv);

  if (isEncrypted) {
    if (cryptoStatus === "ready" && groupKey) {
      try {
        text = await decryptMessage(
          { ciphertext: msgDoc.ciphertext, iv: msgDoc.iv },
          groupKey
        );
        dStatus = "success";
      } catch (err) {
        console.warn("[E2EE] Message decryption failed for msg:", msgId, err?.message || err);
        text = "";
        dStatus = "failed";
        errorMessage = "Unable to decrypt message";
      }
    } else if (cryptoStatus === "error") {
      text = "";
      dStatus = "failed";
      errorMessage = "Unable to decrypt message";
    } else if (cryptoStatus === "waiting_for_key") {
      text = "";
      dStatus = "failed";
      errorMessage = "Encryption key unavailable";
    } else {
      // cryptoStatus === "initializing" -> explicit genuine pending state
      text = "";
      dStatus = "loading";
    }
  } else if (msgDoc.message || msgDoc.text) {
    // Plaintext legacy / system message
    text = msgDoc.message || msgDoc.text || "";
    dStatus = "success";
  } else {
    text = "";
    dStatus = "failed";
    errorMessage = "Unable to decrypt message";
  }

  const result = {
    id: msgId,
    rawDoc: msgDoc,
    text,
    decryptionStatus: dStatus,
    errorMessage,
    sender: {
      firstname: msgDoc.user?.fullname?.firstname || "Member",
      lastname: msgDoc.user?.fullname?.lastname || "",
    },
    isYou,
    createdAt: msgDoc.createdAt || new Date().toISOString(),
  };

  if (dStatus === "success" || dStatus === "failed") {
    decryptedMessageCache.set(cacheKey, result);
  }

  return result;
}

/**
 * Batch decrypts a list of messages concurrently
 */
export async function batchFormatAndDecryptMessages(messagesList, groupKey, cryptoStatus, currentUserId) {
  if (!Array.isArray(messagesList) || messagesList.length === 0) {
    return [];
  }

  return await Promise.all(
    messagesList.map((msg) =>
      formatAndDecryptMessage(msg.rawDoc || msg, groupKey, cryptoStatus, currentUserId)
    )
  );
}

/**
 * Clear memory caches on logout
 */
export function clearE2EEMemoryCache() {
  currentLoadedUserKeys = null;
  currentLoadedUserId = null;
  userInitPromise = null;
  groupInitPromises.clear();
  groupKeyMemoryCache.clear();
  decryptedMessageCache.clear();
}
