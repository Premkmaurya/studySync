/**
 * Centralized AI Health & Operations Tracker
 * Tracks service availability, error classification, timeouts, and recovery
 */

class AIHealthService {
  constructor() {
    this.status = "operational"; // operational | degraded | unavailable | recovering
    this.consecutiveFailures = 0;
    this.consecutiveSuccesses = 0;
    this.totalRequests = 0;
    this.successfulRequests = 0;
    this.failedRequests = 0;
    this.lastSuccessTime = new Date();
    this.lastFailureTime = null;
    this.lastErrorReason = null;
    this.lastOutageNotifiedAt = null;

    // Configurable thresholds
    this.thresholds = {
      degradedThreshold: 2, // 2 consecutive failures -> degraded
      unavailableThreshold: 4, // 4 consecutive failures -> unavailable
      recoverySuccessThreshold: 2, // 2 consecutive successes to be operational
      timeoutMs: 25000, // 25 seconds before timeout
      unusuallyLongMs: 10000, // 10 seconds considered unusually long
      outageNotificationCooldownMs: 120000, // 2 minutes cooldown between global outage notifications
    };
  }

  getStatus() {
    const successRate =
      this.totalRequests === 0
        ? 100
        : Math.round((this.successfulRequests / this.totalRequests) * 100);

    return {
      status: this.status,
      consecutiveFailures: this.consecutiveFailures,
      totalRequests: this.totalRequests,
      successfulRequests: this.successfulRequests,
      failedRequests: this.failedRequests,
      successRate: `${successRate}%`,
      lastSuccessTime: this.lastSuccessTime,
      lastFailureTime: this.lastFailureTime,
      lastErrorReason: this.lastErrorReason,
    };
  }

  classifyError(err) {
    if (!err) return { kind: "unknown", message: "Unknown AI service error" };

    const errStr = (err.message || String(err)).toLowerCase();

    if (err.isTimeout || errStr.includes("timeout") || errStr.includes("timed out") || errStr.includes("etimedout")) {
      return {
        kind: "timeout",
        message: "AI request timed out. The model took too long to respond.",
        userAction: "Try shortening your prompt or asking a more focused question.",
      };
    }

    if (
      errStr.includes("quota") ||
      errStr.includes("rate limit") ||
      errStr.includes("429") ||
      errStr.includes("resource_exhausted")
    ) {
      return {
        kind: "rate_limit",
        message: "AI usage limit reached temporarily.",
        userAction: "Please wait a moment before trying again.",
      };
    }

    if (
      errStr.includes("safety") ||
      errStr.includes("blocked") ||
      errStr.includes("content policy") ||
      errStr.includes("invalid argument")
    ) {
      return {
        kind: "content_policy",
        message: "AI could not process this prompt.",
        userAction: "Please rephrase your request.",
      };
    }

    if (
      errStr.includes("503") ||
      errStr.includes("unavailable") ||
      errStr.includes("enotfound") ||
      errStr.includes("econnrefused") ||
      errStr.includes("fetch failed")
    ) {
      return {
        kind: "service_unavailable",
        message: "AI service connection error.",
        userAction: "The AI service is experiencing a brief disruption.",
      };
    }

    return {
      kind: "generation_failed",
      message: "Syncie was unable to generate a response.",
      userAction: "Please try again shortly.",
    };
  }

  recordSuccess({ io, broadcastAlert = false } = {}) {
    this.totalRequests += 1;
    this.successfulRequests += 1;
    this.consecutiveFailures = 0;
    this.consecutiveSuccesses += 1;
    this.lastSuccessTime = new Date();

    const previousStatus = this.status;

    if (this.status === "unavailable") {
      this.status = "recovering";
      this.consecutiveSuccesses = 1;
      this._emitStatusChange(io, previousStatus);
    } else if (
      this.status === "recovering" &&
      this.consecutiveSuccesses >= this.thresholds.recoverySuccessThreshold
    ) {
      this.status = "operational";
      this._emitStatusChange(io, previousStatus, { isRecovery: true });
    } else if (this.status === "degraded") {
      this.status = "operational";
      this._emitStatusChange(io, previousStatus, { isRecovery: true });
    }
  }

  recordFailure(err, { io } = {}) {
    this.totalRequests += 1;
    this.failedRequests += 1;
    this.consecutiveFailures += 1;
    this.consecutiveSuccesses = 0;
    this.lastFailureTime = new Date();

    const classified = this.classifyError(err);
    this.lastErrorReason = classified.message;

    const previousStatus = this.status;

    if (this.consecutiveFailures >= this.thresholds.unavailableThreshold) {
      this.status = "unavailable";
    } else if (this.consecutiveFailures >= this.thresholds.degradedThreshold) {
      this.status = "degraded";
    }

    if (previousStatus !== this.status) {
      this._emitStatusChange(io, previousStatus, {
        isOutage: this.status === "unavailable" || this.status === "degraded",
        reason: classified.message,
      });
    }

    return classified;
  }

  _emitStatusChange(io, previousStatus, options = {}) {
    if (!io) return;

    const currentStatus = this.status;
    const payload = {
      previousStatus,
      status: currentStatus,
      timestamp: new Date().toISOString(),
      ...options,
    };

    io.emit("ai:status", payload);

    // Controlled system alert on recovery or outage
    const notificationService = require("./notification.service");
    const now = Date.now();

    if (options.isRecovery) {
      notificationService.broadcastSystemAlert({
        type: "ai_service_recovered",
        category: "ai",
        title: "AI service has recovered",
        message: "Syncie and AI learning features are fully operational.",
        priority: "medium",
        metadata: { status: "operational" },
      });
    } else if (
      options.isOutage &&
      (!this.lastOutageNotifiedAt ||
        now - this.lastOutageNotifiedAt > this.thresholds.outageNotificationCooldownMs)
    ) {
      this.lastOutageNotifiedAt = now;
      notificationService.broadcastSystemAlert({
        type: "ai_service_outage",
        category: "ai",
        title: `AI service ${currentStatus}`,
        message: options.reason || "AI operations are experiencing elevated failure rates.",
        priority: "high",
        metadata: { status: currentStatus },
      });
    }
  }

  /**
   * Execute an AI operation with timeout, duration tracking, and error handling
   */
  async executeWithHealthCheck({ userId, groupId, noteId, taskName = "AI Request", io }, operationFn) {
    const startTime = Date.now();
    let isFinished = false;
    let longRunningTimer = null;

    // Track unusually long operations
    if (userId && io) {
      longRunningTimer = setTimeout(() => {
        if (!isFinished) {
          const notificationService = require("./notification.service");
          notificationService.notifyUser({
            userId,
            type: "ai_long_running",
            category: "ai",
            title: "AI operation taking longer than usual",
            message: `${taskName} is taking extra time to generate. Please hold on...`,
            resourceType: "ai",
            resourceId: noteId || groupId || null,
            groupId: groupId || null,
            priority: "low",
            metadata: { durationSoFar: Date.now() - startTime },
          });
        }
      }, this.thresholds.unusuallyLongMs);
    }

    try {
      // Timeout promise
      let timeoutId;
      const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => {
          const timeoutErr = new Error("AI request timed out");
          timeoutErr.isTimeout = true;
          reject(timeoutErr);
        }, this.thresholds.timeoutMs);
      });

      const result = await Promise.race([operationFn(), timeoutPromise]);
      clearTimeout(timeoutId);
      isFinished = true;
      if (longRunningTimer) clearTimeout(longRunningTimer);

      this.recordSuccess({ io });

      // Notify completion if it took unusually long or was a background note generation task
      const duration = Date.now() - startTime;
      if (duration > 8000 && userId) {
        const notificationService = require("./notification.service");
        notificationService.notifyUser({
          userId,
          type: "ai_task_completed",
          category: "ai",
          title: "AI task completed",
          message: `${taskName} generated successfully in ${Math.round(duration / 1000)}s.`,
          resourceType: "ai",
          resourceId: noteId || groupId || null,
          groupId: groupId || null,
          priority: "low",
          metadata: { duration },
        });
      }

      return result;
    } catch (err) {
      isFinished = true;
      if (longRunningTimer) clearTimeout(longRunningTimer);

      const classified = this.recordFailure(err, { io });

      // Notify the calling user with a sanitized, friendly error
      if (userId) {
        const notificationService = require("./notification.service");
        notificationService.notifyUser({
          userId,
          type: classified.kind === "timeout" ? "ai_timeout" : "ai_error",
          category: "ai",
          title: classified.kind === "timeout" ? "Syncie operation timed out" : "Syncie request failed",
          message: `${classified.message} ${classified.userAction}`,
          resourceType: "ai",
          resourceId: noteId || groupId || null,
          groupId: groupId || null,
          priority: "medium",
          metadata: {
            errorKind: classified.kind,
            taskName,
          },
        });
      }

      throw err;
    }
  }
}

const aiHealthService = new AIHealthService();
module.exports = aiHealthService;
