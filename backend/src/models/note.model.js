const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"group"
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

noteSchema.index({ title: "text"});

const noteModel = mongoose.model('note', noteSchema);

module.exports = noteModel;