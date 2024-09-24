const express = require('express');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const port = process.env.PORT || 1234;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle requests for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Create a WebSocket server
const httpServer = app.listen(port, () => {
  console.log(`HTTP server listening on port ${port}`);
});
const io = new Server(httpServer);

// WebSocket event handlers
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle WebSocket messages
  socket.on('message', (data) => {
    console.log('Received message:', data);
    // Process the message and send a response
    socket.emit('response', 'Message received!');
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});