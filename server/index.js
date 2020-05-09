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

// replace this var with a db later?
const dummyLobby = {
  'V3RFFI':{
    players: [{}, {}, {}],
  }
}
const dummyPlayers = [{
  username: 'Mike',
  coordinates: [{x: 6, y: 5}]
  // add client id later incase we need to access
}]

// GAME STATE
const lobbies = [];
const players = [];

// socket
io.on('connection', client => {
  // when user selects "create lobby", append to list of lobbies
  client.on('createLobby', lobbyID => {
    lobbies.push(lobbyID);
  })

  // ...then receive the host's request to join their own lobby
  client.on('joinRoom', data => {
    const { lobbyID, username } = data;

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