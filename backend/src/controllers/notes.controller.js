const noteModel = require("../models/note.model")


async function createNote(req,res) {
    const user = req.user;

    const {content} = req.body;

    const note = await noteModel.create({
        userId:user.id,
        content
    })

    return res.status(201).json({
        message:"your note created successfully."
    })
}



module.exports = {
    createNote
}