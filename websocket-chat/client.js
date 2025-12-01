// client.js

// Connect to local WebSocket server
const socket = new WebSocket("ws://localhost:8080");

const statusElem = document.getElementById("connection-status");
const messagesElem = document.getElementById("messages");
const form = document.getElementById("publish");
const messageInput = document.getElementById("message-input");
const usernameInput = document.getElementById("username");

// Show connection state
socket.addEventListener("open", () => {
  statusElem.textContent = "Connected";
});

socket.addEventListener("close", () => {
  statusElem.textContent = "Disconnected";
});

socket.addEventListener("error", () => {
  statusElem.textContent = "Error";
});

// Handle incoming messages
socket.addEventListener("message", event => {
  let data;
  try {
    data = JSON.parse(event.data);
  } catch {
    return;
  }

  const { username, text } = data;

  const messageElem = document.createElement("div");
  messageElem.className = "message";

  // Use textContent instead of innerHTML to avoid XSS
  // (recommended by OWASP and MDN for untrusted data). [web:43][web:44][web:48]
  messageElem.textContent = `${username}: ${text}`;

  // Newest on top (like the javascript.info example) [web:22]
  messagesElem.prepend(messageElem);
});

// Send message on form submit
form.addEventListener("submit", event => {
  event.preventDefault();

  if (socket.readyState !== WebSocket.OPEN) {
    alert("WebSocket connection is not open.");
    return;
  }

  const username = usernameInput.value.trim() || "Anonymous";
  const text = messageInput.value.trim();
  if (!text) return;

  const payload = {
    username,
    text
  };

  socket.send(JSON.stringify(payload));
  messageInput.value = "";
});
