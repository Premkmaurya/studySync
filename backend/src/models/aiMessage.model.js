const mongoose = require('mongoose');

const { Schema } = mongoose;

const aiMessageSchema = new Schema(
    {
        userId: { 
            type: Schema.Types.ObjectId, 
            ref: 'user', 
            required: true, 
            index: true 
        },
        role:{
            type:String,
            enum:["user","model"],
        },
        text: { 
            type: String, 
            required: true, 
            trim: true 
        }
    },
    { timestamps: true }
);

const aiMessageModel =  mongoose.model('aiMessage', aiMessageSchema);

module.exports = aiMessageModel;