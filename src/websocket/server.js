const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 }, () => {
  console.log('✅ WebSocket server started on port 8080');
});

wss.on('connection', (ws) => {
  console.log('🔌 New client connected');

  ws.on('message', (data) => {
    console.log('📨 Message received:', data.toString());
    ws.send(`Echo: ${data}`);
  });

  ws.on('close', () => {
    console.log('❌ Client disconnected');
  });
});

wss.on('listening', () => {
  console.log('👂 Server is listening');
});

module.exports = wss;
