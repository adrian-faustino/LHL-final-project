module.exports = function(client, db) {
  // models
  const { Lobby, Player, Coordinate } = db; 

  // ==========> CREATE

  /* Add lobby to DB */
  client.on('createLobby', data => {
    const { lobbyID } = data;

    const newLobby = new Lobby({
      lobbyID,
      players: []
    })

    newLobby.save().then(() => {
      console.log(`Successfully added ${lobbyID} to the DB.`);
      client.emit('success', `Successfully added ${lobbyID} to the DB.`);
    }).catch(err => {
      console.log(err);
      client.emit('err', err);
    });
  })


  /* Add user to DB */
  client.on('createPlayer', data => {
    const { username, coordinates } = data;

    const newPlayer = new Player({
      username,
      coordinates
    });

    newPlayer.save().then(() => {
      console.log(`Successfully added ${username} to the DB.`);
      client.emit('success', `Successfully added ${username} to the DB.`);
    }).catch(err => {
      console.log(err);
      client.emit('err', err);
    });
  });


  // ==========> READ

  /* Given 'lobbyID', return that lobby object from the DB */
  client.on('findLobby', data => {
    const { lobbyID } = data;

    Lobby.findOne({lobbyID}, (err, lobbyObj) => {
      if(err) {
        console.log(`Failed to find lobby: ${err}`);
        client.emit('err', err);
      } else {
        console.log(`Successfully found lobby: ${lobbyID}`);
        client.emit('gameState', lobbyObj);
      }
    });
  });


  // ==========> UPDATE
  
  /* Given 'lobbyID', add player to players array (players in lobby) */
  client.on('addToPlayers', data => {
    const { lobbyID, players } = data;
    const filter = { lobbyID };
    const update = { players };

    Lobby.findOneAndUpdate(filter, update, { new: true }, (err, lobbyObj) => {
      if(err) {
        console.log(err);
        client.emit('err', err);
      } else {
        console.log(`Successfully updated game state.`);
        client.emit('gameState', lobbyObj);
      }
    });
  })

  // ==========> DELETE


}