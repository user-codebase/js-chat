const express = require('express');
const path = require('path');
const http = require('http');
const socket = require('socket.io');

const app = express();
const PORT = 8000;

const server = http.createServer(app);

const io = socket(server);

const messages = [];
const users = [];

app.use(express.static(path.join(__dirname, 'client')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});


io.on('connection', (socket) => {
  console.log('New client:', socket.id);

  socket.on('join', (name) => {
    const user = {
      name,
      id: socket.id
    };

    users.push(user);

    console.log('User joined:', user);

    socket.broadcast.emit('newUser', name);
  });


  socket.on('message', (message) => {
    messages.push(message);

    socket.broadcast.emit('message', message);
  });


  socket.on('disconnect', () => {
    const index = users.findIndex(user => user.id === socket.id);

    if (index !== -1) {
      const removedUser = users.splice(index, 1)[0];

      console.log('User left:', removedUser);

      socket.broadcast.emit('removeUser', removedUser.name);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});