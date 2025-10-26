const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const {groupCreateValidation} = require("../middlewares/validate.middleware")
const groupController = require("../controllers/group.controller")


const router = express.Router()

router.get("/all", authMiddleware, groupController.getAllGroups)

router.post("/join/:groupId",authMiddlewae,groupController.joinGroup)

router.post("/create",authMiddleware, groupCreateValidation, groupController.createGroup)

router.get("/my-groups",authMiddleware, groupController.getGroups)

router.delete("/delete/:groupId", authMiddleware, groupController.deleteGroup)

router.patch("/update/:groupId", authMiddleware, groupController.updateGroup)

module.exports = router;