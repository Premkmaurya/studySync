const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true});

noteSchema.index({ title: "text", content: "text" });

const noteModel = mongoose.model('note', noteSchema);

module.exports = noteModel;