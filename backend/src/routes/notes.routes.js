const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const notesController = require("../controllers/notes.controller")
const router = express.Router()


router.post("/create",authMiddleware,notesController.createNote)

router.get("/get",authMiddleware,notesController.getNotes)


module.exports = router;