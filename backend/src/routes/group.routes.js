const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const {groupCreateValidation} = require("../middlewares/validate.middleware")
const groupController = require("../controllers/group.controller")
const multer = require("multer")

const router = express.Router()
const upload = multer({storage: multer.memoryStorage()})


router.get("/all", authMiddleware, groupController.getAllGroups)

router.post("/join/:groupId",authMiddleware,groupController.joinGroup)

// router.get("/search")

router.post("/create",authMiddleware,upload.single("image"), groupCreateValidation, groupController.createGroup)

router.get("/my-groups",authMiddleware, groupController.getGroups)

router.delete("/delete/:groupId", authMiddleware, groupController.deleteGroup)

router.patch("/update/:groupId", authMiddleware, groupController.updateGroup)

module.exports = router;