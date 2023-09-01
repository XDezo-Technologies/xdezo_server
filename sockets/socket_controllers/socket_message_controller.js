const messageModel = require('../socket_models/socket_message_model');
const connectedUsers = {};

function initSocket(io) {
  io.on('connection', (socket) => {
    
  console.log('A user connected:', socket.id);

  socket.on('join', (username) => {
    connectedUsers[socket.id] = username;
    io.emit('userJoined', username);
  });

  socket.on('sendMessage', (message) => {
    const senderUsername = connectedUsers[socket.id];
    // Emit the message to all connected clients except the sender
    socket.broadcast.emit('newMessage', { username: senderUsername, message });
  });

  socket.on('disconnect', () => {
    const disconnectedUser = connectedUsers[socket.id];
    delete connectedUsers[socket.id];
    io.emit('userLeft', disconnectedUser);
  });

  });
}

// function sendMessage(io, message) {
//   io.emit('newMessage', message);
//   // console.log(message);
//   messageModel.addMessage(message);
// }

module.exports = { initSocket, sendMessage };
