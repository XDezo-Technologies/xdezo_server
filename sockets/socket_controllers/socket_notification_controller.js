const notificationModel = require('../socket_models/socket_notification_model');

// function initSocket(io) {
//   io.on('connection', (socket) => {
//     console.log('Client connected:', socket.id);

//     socket.on('broadcast', (notification) => {
//       console.log('Received message:', notification);

//       // Broadcast the message to all connected clients except the sender
//       socket.broadcast.emit('broadcast', notification);

//       // Store the message in the messages array
//       notificationModel.addNotification(notification);
//     });

//     socket.on('disconnect', () => {
//       console.log('Client disconnected:', socket.id);
//     });
//   });
// }

// function sendMessage(io, notification) {
//   io.emit('broadcast', notification);
//   notificationModel.addNotification(notification);
// }

// module.exports = { initSocket, sendMessage };
const offlineMessages = {}; // Map to store offline messages by user ID

function initSocket(io) {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('broadcast', (data) => {
      console.log('Received message:', data);

      // Broadcast the message to all connected clients except the sender
      socket.broadcast.emit('broadcast', data);

      // Store the message in the offlineMessages list for users who are currently offline
      io.clients((error, clients) => {
        if (!error) {
          clients.forEach(clientId => {
            if (clientId !== socket.id) {
              if (!offlineMessages[clientId]) {
                offlineMessages[clientId] = [];
              }
              offlineMessages[clientId].push(data);
            }
          });
        }
      });
    });

    socket.on('broadcast', () => {
      const userId = socket.id; // Use the socket ID as a common identifier
      console.log('User online:', userId);

      // Send stored offline messages when the user comes online
      if (offlineMessages[userId]) {
        const storedMessages = offlineMessages[userId];
        storedMessages.forEach((message) => {
          socket.emit('broadcast', message);
        });
        delete offlineMessages[userId]; // Remove stored messages
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}

function sendMessage(io, notification) {
  io.emit('broadcast', notification);
  notificationModel.addNotification(notification);
}

module.exports = { initSocket, sendMessage };
