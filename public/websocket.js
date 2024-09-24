const socket = io('http://localhost:1234');

socket.on('connect', () => {
  console.log('Connected to WebSocket server');

  // Send a message to the server
  socket.emit('message', 'Hello from the client!');
});

socket.on('response', (data) => {
  console.log('Received response:', data);
});