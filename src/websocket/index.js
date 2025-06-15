const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 }, () => {
  console.log('Socket start');
});

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    console.log('Data received: ' + data);
    ws.send(data);
  });
});

wss.on('listening', () => {
  console.log('Socket is lestening on port 8080');
});
