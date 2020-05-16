const constants = require('../constants');
const { VIEW_TIME, ROUND_TIME } = constants; 

module.exports = function(games, client, db, io) {
  // models
  const { Lobby, Player, Coordinate } = db; 



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
     
      interval = setInterval(() => {
        console.log('Starting tick.');
        opacity *= 0.90
        console.log(opacity)
        io.in(lobbyID).emit('fadeSilhouette', opacity);
      }, 800);


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