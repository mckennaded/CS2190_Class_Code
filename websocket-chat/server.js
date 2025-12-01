// server.js
const http = require("http");
const WebSocket = require("ws");

// WebSocket server in "noServer" mode 
const wss = new WebSocket.Server({ noServer: true });

// Track all connected clients
const clients = new Set();

function sanitize(str) {
  if (typeof str !== "string") return "";
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function onSocketConnect(ws) {
  clients.add(ws);

  ws.on("message", msg => {
    let data;
    try {
      data = JSON.parse(msg.toString());
    } catch {
      return;
    }

    const safeUsername = sanitize(data.username || "Anonymous");
    const safeText = sanitize(data.text || "");

    const outgoing = JSON.stringify({
      username: safeUsername,
      text: safeText
    });

    // broadcast to all connected clients
    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(outgoing);
      }
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
  });
}

// HTTP server that upgrades to WebSocket
const server = http.createServer((req, res) => {
  res.writeHead(404);
  res.end();
});

server.on("upgrade", (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, onSocketConnect);
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`WebSocket server listening on ws://localhost:${PORT}`);
});
