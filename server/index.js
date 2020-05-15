const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// middleware
app.use(cors());
app.use(express.json());

// data
const games = require('./data/games');

// constants
const PORT = process.env.PORT;
const DB_URI = process.env.ATLAS_URI;


// database
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true, 
  useUnifiedTopology: true
  });
mongoose.set('useFindAndModify', false);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully.');
})


// routes
app.get('/', (req, res) => res.send('Welcome!'))
app.post('/test', (req, res) => {
  console.log('Client sent test data:', req.body);
  res.send('POST successful!');
});
app.post('/finalCoords', (req, res) => {
  const { coordinates, lobbyID, myQuadrant, PLAYERS_IN_ROOM } = req.body;
  
  // add coords to games obj
  games[lobbyID].coordinates[myQuadrant] = coordinates;

  if(Object.keys(games[lobbyID].coordinates).length === PLAYERS_IN_ROOM) {
    const finalCoordinates = games[lobbyID].coordinates;

    console.log('Sending final coordinates:', finalCoordinates);
    io.in(lobbyID).emit('finalCoords', finalCoordinates);
  }
  // put together

  // io emit to that lobby the final pick and also changeView
});

// === big rebuild
/** Handle create lobby **/
app.post('/createLobby', (req, res) => {
  const { genLobbyID, myUsername } = req.body;
  if(games.hasOwnProperty(genLobbyID)) {
    console.log('That lobby exists already!');
  }

  games[genLobbyID] = {
      host: myUsername,
      coordinates: {},
      players: {}
  }

  const data = {
    myLobbyObj: games[genLobbyID],
  }
  console.log('Lobby created. Sending data:', data);
  res.json(data);
});


/** Handle join lobby **/
app.post('/joinLobby', (req, res) => {
  const { lobbyID, myUsername } = req.body;

  console.log(`${myUsername} attempting to join lobby: ${lobbyID}`);

  if(!games[lobbyID]) {
    console.log(`Lobby doesn't exist!`);
    return res.status(400).json({err: 'Lobby doesn`t exist!'});
  }

  // constants
  const MAX_PLAYERS = 4;
  const currentUserNum = Object.keys(games[lobbyID].players).length;

  if(currentUserNum === MAX_PLAYERS) {
    console.log('Lobby is full!');
    return res.status(400).json({err: 'Lobby is full!'});
  }

  const myLobbyObj = games[lobbyID];
  const myPlayerID = generateUniquePID(myLobbyObj.players);
  const myQuadrant = generateQuadrant(myLobbyObj.coordinates);

  /** Add player to players obj */
  myLobbyObj.players[myPlayerID] = {
    username: myUsername,
    ready: false,
    myQuadrant
  }
  /** Add quadrant to coordinates obj **/
  myLobbyObj.coordinates[myQuadrant] = [];
  
  console.log(`${myUsername} joined lobby ${lobbyID}. This lobby:`, games[lobbyID]);
  // // constants
  // console.log('join lobby =>', games[lobbyID])
  // const MAX_PLAYERS = 4;
  // if(!games.hasOwnProperty(lobbyID)) {
  //   console.log(`That lobby doesn't exist!`);
  //   res.status(400).send({err: `Lobby doesn't exist!`});
  // } else if (games[lobbyID].players && Object.keys(games[lobbyID].players).length === MAX_PLAYERS) {
  //   res.status(400).send({err: `Lobby is full!`});
  // } else {
  //   const myLobbyObj = games[lobbyID];
  //   const myPlayerID = generateUniquePID(myLobbyObj.players);
  //   const myQuadrant = generateQuadrant(myLobbyObj);
  //   myLobbyObj.players[myPlayerID].username = myUsername;
  //   myLobbyObj.players[myPlayerID].myQuadrant = myQuadrant;

  //   const data = { myLobbyObj, myPlayerID };
  //   res.json(data);

  //   /** When user added to lobby, then add to socket room **/
});

/** Handle request for updated game lobby data **/
app.post('/reqLobbyInfo', (req, res) => {
  const { lobbyID } = req.body;
  const data = games[lobbyID];
  res.json(data);
})
// === big rebuild


// models
const Lobby = require('./models/lobby.model');
const Player = require('./models/player.model');
const Coordinate = require('./models/coordinate.model');
const db = {Lobby, Player, Coordinate};


//=== rebuild
// socket
const handleCRUD = require('./routes/handleCRUD');
const handleGameState = require('./routes/handleGameState');
const handleImageMerge = require('./routes/handleImageMerge');

io.on('connection', client => {
  // handle DB crud
  handleCRUD(games, client, db);
  handleGameState(games, client, db, io);
  handleImageMerge(games, client, db, io);

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

// === big rebuild
function randomNumAllInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// returns a 6 digit alphanumeric all capital ID
function generatePlayerID(ID_length) {
  // List does not include 0 or O;
  const ALPHA_NUM = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
  let id = ''

  // push random letters/numbers into the array until desired ID length
  for (let i = 0; i < ID_length; i++) {
    const randomIndex = randomNumAllInclusive(0, ALPHA_NUM.length - 1);
    id += ALPHA_NUM[randomIndex]
  }

  return id;
}

function generateUniquePID(playersObj) {
  const uniqueID = generatePlayerID(6);
  if (playersObj.hasOwnProperty(uniqueID)) {
    uniqueID = generateUniquePID(playersObj);
  }

  return uniqueID;
}

function generateQuadrant(coordinatesObj) {
  let myQuadrant = '';

  if(!coordinatesObj.hasOwnProperty('quadrant_1')) {
    myQuadrant = 'quadrant_1';
  } else if(!coordinatesObj.hasOwnProperty('quadrant_2')) {
    myQuadrant = 'quadrant_2';
  } else if(!coordinatesObj.hasOwnProperty('quadrant_3')) {
    myQuadrant = 'quadrant_3';
  } else if(!coordinatesObj.hasOwnProperty('quadrant_4')) {
    myQuadrant = 'quadrant_4';
  }

  return myQuadrant;
}
// === big rebuild