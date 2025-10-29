const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const notesController = require("../controllers/notes.controller")
const router = express.Router()


router.post("/create",authMiddleware,notesController.createNote)


module.exports = router;