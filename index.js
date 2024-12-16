const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Create an Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Handle a basic route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log("User connect : " , socket.id)
  //write your code here

  socket.on('message',(message)=>{
    console.log(`Message from ${socket.id} : ${message}`)

    socket.broadcast.emit('message' , message)
  })

  socket.on('disconnect', ()=>{
    console.log(`User disconnected : ${socket.id}`)
  })
}); 

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = {app}