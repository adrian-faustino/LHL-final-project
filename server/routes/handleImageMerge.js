module.exports = function(games, client, db, io) {

  const { Lobby, Player, Coordinate } = db;

  client.on('finalCoords', data => {
    const { lobbyID, coordinates } = data;

    console.log(`Game round finished for lobby ${lobbyID}. Coordinates:`, coordinates);
  })

}