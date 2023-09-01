const express = require('express');
const router = express.Router();

const messageController = require('../../../controllers/chats_controller/group_chat_controller/group_chat_controller');

router.post("/messages", messageController.create); // Adjust for message context
router.get("/messages", messageController.findAll); // Adjust for message context
// router.get("/messages/:message_id", messageController.findOne); // Adjust for message context
// router.patch('/messages/:message_id', messageController.update); // Adjust for message context
// router.delete("/messages/:message_id", messageController.delete); // Adjust for message context

module.exports = router;
