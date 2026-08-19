const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")


const upload = require("../middlewares/multer.middleware")


router.post("/register",authController.registerUser)

router.post("/login",authController.loginUser)

router.post("/logout",authController.logoutUser)

router.get("/me",authMiddleware,authController.getMe)

router.put("/profile", authMiddleware, authController.updateUserProfile)

router.patch("/user/:id/update-profile-pic", authMiddleware, upload.single("profilePicture"), authController.updateProfilePicture)

router.get("/user/:id",authMiddleware,authController.getUserById)

module.exports = router;
