const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const notesController = require("../controllers/notes.controller");

const router = express.Router();

router.post("/create", authMiddleware, notesController.createNote);
router.patch("/:id", authMiddleware, notesController.updateNote);
router.put("/:id", authMiddleware, notesController.updateNote);
router.delete("/:id", authMiddleware, notesController.deleteNote);
router.post("/:id/share", authMiddleware, notesController.shareNote);
router.post("/academic-activity", authMiddleware, notesController.createAcademicActivity);

router.get("/get", authMiddleware, notesController.getNotes);
router.get("/my-notes", authMiddleware, notesController.getMyNotes);
router.get("/get/:groupId", authMiddleware, notesController.getNoteById);
router.post("/save-note", authMiddleware, notesController.saveNote);
router.get("/saved-notes", authMiddleware, notesController.getSavedNotes);
router.get("/search", authMiddleware, notesController.searchNotes);

module.exports = router;
