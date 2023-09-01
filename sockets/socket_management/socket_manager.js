const socketIO = require('socket.io');

let ioInstance;

function init(server) {
  ioInstance = socketIO(server);

  ioInstance.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Handle socket events here

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}

function getIO() {
  if (!ioInstance) {
    throw new Error('Socket.io not initialized');
  }
  return ioInstance;
}

module.exports = { init, getIO };
