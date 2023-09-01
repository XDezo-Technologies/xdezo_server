const Message = require("../../../models/chats_model/group_chat_model/group_chat");
const messageController = require('../../../sockets/socket_controllers/socket_message_controller');
const socketManager = require('../../../sockets/socket_management/socket_manager');

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const groupName = req.body.groupname;
  const content = req.body.message;
  const senderId = req.body.sender_id;


//   const timestamp = new Date(); // You might want to adjust this based on your needs

  const newMessage = new Message({
    groupName,
    content,
    senderId
  });

  Message.create(newMessage, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Message.",
      });
    } else {      
      messageController.sendMessage(socketManager.getIO(), {
        content
      });

      res.send(data);
    }
  });
};

exports.findAll = (req, res) => {
  // Retrieve all messages or implement pagination as needed
  Message.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Messages."
      });
    else res.send(data);
  });
};

