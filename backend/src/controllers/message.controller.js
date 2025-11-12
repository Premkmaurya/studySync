const messageModel = require("../models/message.model")

const getMessages = async (req,res)=>{
       const {_id} = req.params;
       const user= req.user;
       
       const chat = await messageModel.find({
        group:_id
      })
       res.status(201).json({
        message:'message find successfully.',
        chat
       })

}

module.exports = getMessages;