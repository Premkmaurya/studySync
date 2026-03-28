const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const notesController = require("../controllers/notes.controller")
const router = express.Router()


router.post("/create",authMiddleware,notesController.createNote)

router.get("/get",authMiddleware,notesController.getNotes)

router.get('/my-notes', authMiddleware, notesController.getMyNotes)

router.post('/save-note/:noteId',authMiddleware,notesController.saveNote)

router.get('/saved-notes', authMiddleware, notesController.getSavedNotes)

router.get("/search",authMiddleware,notesController.searchNotes)

module.exports = router;