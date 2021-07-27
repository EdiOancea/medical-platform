const WebSocketServer = require('websocket').server;
const http = require('http');

const port = process.env.PORT || 8080;
const server = http.createServer((request, response) => {
  response.writeHead(404);
  response.end();
});
server.listen(port, () => console.log(`Server is listening on port ${port}`));

const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

module.exports = { wsServer };
