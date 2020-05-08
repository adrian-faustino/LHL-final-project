const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');


// constants
const PORT = process.env.PORT || 5555


// middleware
//app.use(cors())  --> uncomment when we need


// basic testroutes
app.get('/', (req, res) => {
  res.json({message: "This is the '/' route!"})
})
app.get('/test', (req, res) => {
  res.json({message: "This is the '/test' route!"})
})

const lobbies = [];

// socket
io.on('connection', client => {
  console.log('A user connected!');
  
  io.emit('welcome', "A user has joined!")
  client.emit('welcome', 'Hello you!')

  // attempt at making unique rooms...
  client.on('joinRoom', room => {
    // if (lobbies.include(lobbyID)) ...
    client.join('randomizeThisLater')
    return client.emit('lobby_join_success', 'Welcome to the room!')
    // else error handle "room doesnt exist!"
  })
})

// on disconnect, remove that ID from the list of lobbies on line 24


// server
http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})