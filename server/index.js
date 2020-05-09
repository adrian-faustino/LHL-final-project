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
const lobbies = [];

// socket
io.on('connection', client => {
  // when user selects "create lobby", append to list of lobbies
  client.on('createLobby', lobbyID => {
    lobbies.push(lobbyID);
  })

  // ...then receive the host's request to join their own lobby
  client.on('joinRoom', lobbyID => {
    if(lobbies.includes(lobbyID)) {
      client.join(lobbyID)
      return client.emit('success', `You are now in this lobby: ${lobbyID}`);
    } else {
      return client.emit('err', `Failed to join lobby: ${lobbyID}`)
    }
  });

  //====

  // when client joins, ask for name
  client.emit('nameReq');
  client.on('nameRes', name => {
    console.log(name)
  })
  

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