const Chat = require('../models/chatModel');
const User = require('../models/userModel');

//for fetching chat info, especially msgs
const chat_post = (req, res) => {
    const id = req.params.id;
    Chat.findById(id)
        .then(result => {
            res.status(200).json(result);
    })
};

const chat_send = (req, res) => {
    const id = req.params.id;
    Chat.findByIdAndUpdate(id, {$push: {
        messages:
            {
                messager: req.user._id,
                message: req.body.message,
            }
    }}).then(result => res.json(result));
}

//for fetching user info (shouldve use a user route instead)
const chat_get_user_post = (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(result => {
            res.status(200).json(result)
        })
};

module.exports = {
    chat_post,
    chat_send,
    chat_get_user_post,
}