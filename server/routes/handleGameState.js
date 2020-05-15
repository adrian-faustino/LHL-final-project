module.exports = function(games, client, db, io) {
  // models
  const { Lobby, Player, Coordinate } = db; 

  // constants
  const MAX_PLAYERS = 4;

  // === bigrebuild
  client.on('joinLobby', lobbyID => {
    console.log(`Attempting to join lobby ${lobbyID}...`);
    client.join(lobbyID);
    io.in(lobbyID).emit('newUserJoined');
  });

  client.on('changeView', data => {
    const { lobbyID, nextView } = data;
    io.in(lobbyID).emit('changeView', nextView);
  })
  // === bigrebuld


  // ===> VIEW CHANGE HANDLERS

  /* Given 'lobbyID', trigger view changes for all players in a lobby */
  /* ==> Inteded this for host start button. Once clicked, this will be called */
  client.on('changeView', data => {
    const { lobbyID, nextView } = data;
    
    console.log(`Emitting changeView to everyone in lobby ${lobbyID} to view: ${nextView}`);
    io.in(lobbyID).emit('changeView', data);
  });

  // Lobby ==> InstructionsView
  client.on('startGame', data => {
    const { lobbyID, nextView } = data;
    const myLobbyObj = games[lobbyID];

    io.in(lobbyID).emit('startGame', { myLobbyObj, nextView });
  })
  
  
  // InstructionsView ==> DrawGameView
  const VIEW_TIME = 1000; // time in ms
  const GAME_TIME = 30000; //  time in ms
  client.on('instructionsViewTimeout', data => {
    const { lobbyID } = data;
    const nextView = 'DrawGameView'

    setTimeout(() => {
      console.log(`View change: Instructions => Draw in lobby ${lobbyID}`);
      client.emit('changeView', { nextView });
    }, VIEW_TIME);
  })

  client.on('drawViewTimeout', data => {
    const { lobbyID } = data;
    const nextView = 'ResultsView';

    console.log(`View change: Draw => Results in lobby ${lobbyID}`);
    setTimeout(() => {
      client.emit('roundFinished');
      client.emit('changeView', { nextView });
    }, GAME_TIME);
  })
  
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

    console.log(`${username} is ready.`);
  });

};