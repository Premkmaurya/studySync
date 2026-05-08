const express = require('express')
const authMiddleware = require("../middlewares/auth.middleware")
const messageController = require("../controllers/message.controller")
const router = express.Router();


router.get("/:groupId",authMiddleware,messageController.getMessages)

router.get("/ai/:groupId/:id",authMiddleware,messageController.getAiChats)


module.exports = router;