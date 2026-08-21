const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {
  updatePublicKey,
  getGroupKeys,
  saveGroupKeys,
} = require("../controllers/groupKey.controller");

router.put("/auth/public-key", authMiddleware, updatePublicKey);
router.get("/groups/:groupId/keys", authMiddleware, getGroupKeys);
router.post("/groups/:groupId/keys", authMiddleware, saveGroupKeys);

module.exports = router;
