//no user chat yet, global chat group for now
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inChatSchema = new Schema({
    messager: {
        type: String,
    },
    message: {
        type: String,
    }
}, { timestamps: true })
const chatSchema = new Schema({
    ChatName: {
        type: String
    },
    Img: {
        type: String
    },
    messages: [inChatSchema],
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema)
module.exports = Chat;