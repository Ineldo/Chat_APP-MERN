const mongoose = require('mongoose')

const ChatModel=mongoose.Schema(
    {
        chatName: {type: 'string', trim: true},
        isGroupChat: {type: 'boolean', default: false},
        users:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",

        },],
        latestMessage:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",

        },
        groupAdmin: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    },
    {
        timestamps:true,
    }
);

const Chat =mongoose.model('Chat',ChatModel);

module.exports = Chat;