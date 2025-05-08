const express = require('express');

const router = express.Router();

const chatController = require('../controllers/chatController')

//fetch chat
router.post('/:id', chatController.chat_post);
router.post('/:id/send', chatController.chat_send);


//get username by id
router.post('/getUser/:id', chatController.chat_get_user_post)

module.exports = router;