module.exports = function(games, client, db, io) {
  // models
  const { Lobby, Player, Coordinate } = db; 

  // constants
  const MAX_PLAYERS = 4;

  /* Given 'lobbyID', allow users to join a lobby */
  client.on('joinLobby', data => {
    const { lobbyID } = data;

    console.log(`Attempting to join lobby ${lobbyID}...`);

    // === rebuild
    const currentLobby = games[lobbyID].coordinates;
    let myQuadrant = '';
    if(currentLobby) {
      if(!currentLobby.hasOwnProperty('quadrant_1')) {
        myQuadrant = 'quadrant_1';
      } else if (!currentLobby.hasOwnProperty('quadrant_2')) {
        myQuadrant = 'quadrant_2';
      } else if (!currentLobby.hasOwnProperty('quadrant_3')) {
        myQuadrant = 'quadrant_3';
      } else if(!currentLobby.hasOwnProperty('quadrant_4')) {
        myQuadrant = 'quadrant_4';
      } else {
        console.log('Lobby is full! - games');
        return client.emit('err', 'Lobby is full!');
      }
    } else {
      console.log(`Lobby doesn't exist. - games`);
      return client.emit('err', `Lobby doesn't exist`);
    }

    currentLobby[myQuadrant] = [];
    client.emit('joinedLobby', { myQuadrant })
    client.join(lobbyID);
    // === rebuild

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
        // client.join(lobbyID); rebuild

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

  // Lobby ==> InstructionsView
  client.on('startGame', data => {
    const { lobbyID, nextView } = data;
    const myLobbyObj = games[lobbyID];

    io.in(lobbyID).emit('startGame', { myLobbyObj, nextView });
  })
  
  
  // InstructionsView ==> DrawGameView
  const VIEW_TIME = 1000; // time in ms
  const GAME_TIME = 8000; //  time in ms
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