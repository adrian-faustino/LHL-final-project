const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// constants
const PORT = process.env.PORT;
const DB_URI = process.env.ATLAS_URI;
const MAX_PLAYERS_PER_ROOM = 4;


// database
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true, 
  useUnifiedTopology: true
  });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully.');
})


// routes
app.get('/', (req, res) => res.send('Welcome!'))



// models
let Lobby = require('./models/lobby.model');
let Player = require('./models/player.model');
let Coordinates = require('./models/coordinates.model');


// GAME STATE
const lobbies = [];
const players = [];

const db = {
  lobbyID: '',
  players: []
};

// socket
io.on('connection', client => {
  // when user selects "create lobby", append to list of lobbi  es
  client.on('createLobby', lobbyID => {
    lobbies.push(lobbyID);
  })

  // ...then receive the host's request to join their own lobby
  client.on('joinRoom', data => {
    const { lobbyID, username } = data;

    // if lobby is full, emit error msg
    if(players.length >= MAX_PLAYERS_PER_ROOM) {
      return client.emit('err', 'Room is full!');
    }

    // ...if they successfully join, start updating user data and emit it
    if(lobbies.includes(lobbyID)) {
      client.join(lobbyID)

      // add player info to array of player objects
      const playerObj = {username};
      players.push(playerObj);

      // emit list of players for client ot renter
      io.emit('playersInLobby', players);

      return client.emit('success', `You are now in this lobby: ${lobbyID}`);
    } else {
      return client.emit('err', `Failed to join lobby: ${lobbyID}`)
    }
  });

  // to synchronize all the client to start game emit a change of view triggered by host component unmount
  client.on('changeView', data => {
    const { lobbyID, nextView } = data;

    io.to(lobbyID).emit('receiveView', nextView )
  })
})

// on disconnect, remove that ID from the list of lobbies on line 24


// server
http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})


// HELPER FUNCTIONS -- we need to move this to a different folder
// returns an object
const createPlayerObject = () => {}