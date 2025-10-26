const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")


router.post("/register",authController.registerUser)

router.post("/login",authController.loginUser)

router.get("/me",authMiddleware,authController.getMe)

module.exports = router;
