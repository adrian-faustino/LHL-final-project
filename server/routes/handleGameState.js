module.exports = function(client, db, io) {
  // models
  const { Lobby, Player, Coordinate } = db; 

  // constants
  const MAX_PLAYERS = 4;

  /* Given 'lobbyID', allow users to join a lobby */
  client.on('joinLobby', data => {
    const { lobbyID } = data;

    console.log(`Attempting to join lobby ${lobbyID}...`);

    Lobby.findOne({ lobbyID }, (err, lobbyObj) => {
      if(err) {
        console.log(err);
        client.emit('err', err);
      }

      if(lobbyObj.players.length >= MAX_PLAYERS) {
        console.log('Lobby is full!');
        client.emit('err', 'Lobby is full!');
      } else {
        console.log(`Joined lobby: ${lobbyID}`);
        client.join(lobbyID);

        // emit to all users to let them know someone joined the lobby
        io.in(lobbyID).emit('userJoinLobby');
      }
    });
  });


  // ===> VIEW CHANGE HANDLERS

  /* Given 'lobbyID', trigger view changes for all players in a lobby */
  /* ==> Inteded this for host start button. Once clicked, this will be called */
  client.on('changeView', data => {
    const { lobbyID, nextView } = data;
    
    console.log(`Emitting changeView to everyone in lobby ${lobbyID} to view: ${nextView}`);
    io.in(lobbyID).emit('changeView', data);
  });
  
  client.on('lobbyID', data => {
    const { lobbyID } = data;

    console.log(`To all => lobbyID: ${lobbyID}`);
    io.in(lobbyID).emit('lobbyID', data);
  });

  
  // ===> INSTRUCTIONS VIEW

  /* Given 'username' add user to array of ready players */
  const readyLobbies = {
    'exampleLobbyID' : {
      readyLength: ['user1', 'user2'].length,
      readyUsers: ['tom', 'adrian']
    }
  };

  client.on('readyOK', data => {
    const { username } = data;


  });

};