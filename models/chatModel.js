//no user chat yet, global chat group for now
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    Messager: {
        type: ObjectId,
    },
    Message: {
        type: String,
    },
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema)
module.exports = Chat;