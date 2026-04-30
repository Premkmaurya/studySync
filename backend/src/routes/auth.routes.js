const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")


const upload = require("../middlewares/multer.middleware")


router.post("/register",authController.registerUser)

router.post("/login",authController.loginUser)

router.get("/me",authMiddleware,authController.getMe)

router.get("/user/:id",authMiddleware,authController.getUserById)

router.patch("/user/:id/update-profile-pic", authMiddleware, upload.single('profilePicture'), authController.updateProfilePicture)

module.exports = router;
