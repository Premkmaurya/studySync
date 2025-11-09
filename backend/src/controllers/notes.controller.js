const noteModel = require("../models/note.model")


async function createNote(req,res) {
    const user = req.user;

    const {content,title} = req.body;

    const note = await noteModel.create({
        userId:user.id,
        content,
        title
    })

    return res.status(201).json({
        message:"your note created successfully."
    })
}

async function getNotes(req,res){
    const notes = await noteModel.find({})
    return res.status(200).json({
        message:"notes fetch successfully.",
        notes
    })
}


module.exports = {
    createNote,
    getNotes
}