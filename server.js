
const app=require('./config/index');
const socketManager = require('./sockets/socket_management/socket_manager');

const PORT = process.env.PORT || 8081;
const http = require('http');

const server = http.createServer(app);
socketManager.init(server);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });