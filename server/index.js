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


// database
mongoose.connect(DB_URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully.');
})


// routes
app.get('/', (req, res) => res.send('Welcome!'))


// models
const Lobby = require('./models/lobby.model');
const Player = require('./models/player.model');
const Coordinate = require('./models/coordinate.model');
const db = {Lobby, Player, Coordinate};


//=== rebuild
// socket
const handleCRUD = require('./routes/handleCRUD');
const handleGameState = require('./routes/handleGameState');

io.on('connection', client => {
  // handle DB crud
  handleCRUD(client, db);
  handleGameState(client, db, io);

  // handle DC client.on('disconnect') STRETCH
})
//=== rebuild


// server
http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})











// io.on('connection', client => {
  

//   // emit number of players in lobby once game starts for skip button
//   // HostLobbyView ==> InstructionsView
//   client.on('checkPlayerAmt', data => {
//     client.emit('receivePlayerAmt', {
//       playerAmt: players.length,
//       lobbyID: data.lobbyID
//     });
//   });

//   // handle skip button logic in InstructionsView
//   client.on('skipOK', data => {
//     const { username, lobbyID } = data;
//     const index = players.findIndex(e => e === username);
//     players.splice(index, 1);

//     if(players.length === 0) {
//       console.log('everyone is ready!');
//       io.to(lobbyID).emit('receiveView', 'DrawGameView');
//     } else {
//       io.to(lobbyID).emit('receivePlayerAmt', players.length);
//     }
//   });
// });

// on disconnect, remove that ID from the list of lobbies on line 24
