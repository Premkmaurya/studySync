const mongoose = require("mongoose")

const memberSchema = new mongoose.Schema({
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
})

const noteSchema = new mongoose.Schema({
    type:mongoose.Schema.Types.ObjectId,
    ref:"note"
})

const groupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    members:[memberSchema],
    notes:[noteSchema],
    lastUpdated:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})

const groupModel = mongoose.model("group",groupSchema)

module.exports = groupModel;