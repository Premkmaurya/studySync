const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true});

const noteModel = mongoose.model('note', noteSchema);

module.exports = noteModel;