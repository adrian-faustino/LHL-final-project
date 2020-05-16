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
  const VIEW_TIME = 10000; // time in ms
  const ROUND_TIME = 10000; //  time in ms


  // === bigrebuild
  client.on('startGame', data => {
    const { lobbyID, nextView } = data;
    io.in(lobbyID).emit('changeView', nextView);

    let opacity = 1;
    let interval;

    /** Timeout for InstructionsView **/
    setTimeout(() => {
      io.in(lobbyID).emit('changeView', 'DrawGameView');
  

      /** Fade logic - Also dictates countdown timer **/
      let interval;
      let opacity = 1;
      setTimeout(() => {
        interval = setInterval(() => {
          opacity *= 0.90
          console.log(opacity)
          io.in(lobbyID).emit('fadeSilhouette', opacity);
        }, 800)
      }, VIEW_TIME);

      /** Timeout for DrawGameView **/
      setTimeout(() => {
        console.log('Game finished.');
        clearInterval(interval);
        io.in(lobbyID).emit('roundFinished')
        io.in(lobbyID).emit('changeView', 'ResultsView');
      }, ROUND_TIME);

    }, VIEW_TIME);
  });
};