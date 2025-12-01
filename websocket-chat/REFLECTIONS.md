# REFLECTIONS

## Security vulnerabilities

- **XSS via chat messages**: If the user input was inserted with `innerHTML`, an attacker could send HTML or JavaScript that executes in other users' browsers. Using `textContent` on the client and escaping `<`/`>` on the server reduces this risk but does not guarantee complete protection in a real system. 
- **Unencrypted WebSocket (`ws://`)**: The assignment uses `ws://localhost`, which is not encrypted. On a network an attacker could intercept or modify messages, so `wss://` with TLS is needed in production.
- **No authentication or authorization**: Any script that can reach the server can connect and send messages, which could allow impersonation or spam if deployed without access controls. 

## What I learned

- How to use the browser WebSocket API to connect, send, and receive messages, following the structure from the javascript.info chat example. 
- How to implement a simple WebSocket server in Node using the `ws` package and broadcast messages to all connected clients. 
- How adding usernames requires designing a small JSON protocol between client and server and addressing input validation and XSS mitigation.
