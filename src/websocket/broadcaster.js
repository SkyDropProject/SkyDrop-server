const wss = require('./server');

function broadcast(data) {
  const message = typeof data === 'string' ? data : JSON.stringify(data);

  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(message);
    }
  });
}

module.exports = {
  broadcast,
};
