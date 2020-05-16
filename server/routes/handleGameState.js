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
  // === bigrebuld


  // ===> VIEW CHANGE HANDLERS

  /* Given 'lobbyID', trigger view changes for all players in a lobby */  
  // InstructionsView ==> DrawGameView
  const VIEW_TIME = 1000; // time in ms
  const GAME_TIME = 1000000; //  time in ms


  // === bigrebuild
  client.on('startGame', data => {
    const { lobbyID, nextView } = data;
    io.in(lobbyID).emit('changeView', nextView);

    let opacity = 1;
    let interval;

    /** Timeout for InstructionsView **/
    setTimeout(() => {
      io.in(lobbyID).emit('changeView', 'DrawGameView');
  

      /** Fade logic **/
      let interval;
      let opacity = 1;
      setTimeout(() => {
        interval = setInterval(() => {
          opacity *= 0.95
          console.log(opacity)
          io.in(lobbyID).emit('fadeSilhouette', opacity);

          if(opacity < 0.04) {
            console.log('Interval cleared!')
            clearInterval(interval);
          }
        }, 1000)
      }, VIEW_TIME);

      /** Timeout for DrawGameView **/
      setTimeout(() => {
        console.log('Game finished.');
        io.in(lobbyID).emit('roundFinished')
        io.in(lobbyID).emit('changeView', 'ResultsView');
      }, GAME_TIME);

    }, VIEW_TIME);
  });
};