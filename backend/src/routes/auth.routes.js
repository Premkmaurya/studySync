const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const passport = require("passport");

const upload = require("../middlewares/multer.middleware");

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.post("/logout", authController.logoutUser);

router.get("/me", authMiddleware, authController.getMe);

router.put("/profile", authMiddleware, authController.updateUserProfile);

router.patch(
  "/user/:id/update-profile-pic",
  authMiddleware,
  upload.single("profilePicture"),
  authController.updateProfilePicture,
);

router.get("/user/:id", authMiddleware, authController.getUserById);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  authController.googleCallback,
);

module.exports = router;
