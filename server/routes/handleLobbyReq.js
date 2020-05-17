const constants = require('../constants');
const util = require('../helpers/util');
const { MAX_PLAYERS_PER_LOBBY } = constants;
const { generateUniquePID, generateQuadrant } = util;



module.exports = function(games, client, db, io, app) {
  const { Lobby, Player, Coordinate } = db;


  app.post('/finalCoords', (req, res) => {
    const { coordinates, lobbyID, myQuadrant, PLAYERS_IN_ROOM } = req.body;
    
    console.log(`Recieved coordinates from lobby ${lobbyID}:`, coordinates);
  
    /** Populate quadrants **/
    games[lobbyID].coordinates[myQuadrant] = coordinates;
    
    /** Emit final coordinates once all quadrants have been received **/
    if(Object.keys(games[lobbyID].coordinates).length === PLAYERS_IN_ROOM) {
      const finalCoordinates = games[lobbyID].coordinates;
  
      console.log('Sending final coordinates:', finalCoordinates);
      io.in(lobbyID).emit('finalCoords', finalCoordinates);
    }
  });
  
  
  /** Handle create lobby **/
  app.post('/createLobby', (req, res) => {
    const { genLobbyID, myUsername } = req.body;
    if(games.hasOwnProperty(genLobbyID)) {
      console.log('That lobby exists already!');
    }
  
    games[genLobbyID] = {
        host: myUsername,
        coordinates: {},
        players: {}
    }
  
    const data = {
      myLobbyObj: games[genLobbyID],
    }
    console.log('Lobby created. Sending data:', data);
    res.json(data);
  });
  
  
  /** Handle join lobby **/
  app.post('/joinLobby', (req, res) => {
    const { lobbyID, myUsername } = req.body;
  
    console.log(`${myUsername} attempting to join lobby: ${lobbyID}`);
  
    if(!games[lobbyID]) {
      console.log(`Lobby doesn't exist!`);
      return res.status(500).send({err: 'Lobby doesn`t exist!'});
    }
  
    const currentUserNum = Object.keys(games[lobbyID].players).length;
  
    if(currentUserNum === MAX_PLAYERS_PER_LOBBY) {
      console.log('Lobby is full!');
      return res.status(500).send({err: 'Lobby is full!'});
    }

    /** Pass all filters => join lobby */
    console.log('Added to socket room:', lobbyID);
    client.join(lobbyID);
  
    const myLobbyObj = games[lobbyID];
    const myPlayerID = generateUniquePID(myLobbyObj.players);
    const myQuadrant = generateQuadrant(myLobbyObj.coordinates);
  
    /** Add player to players obj */
    myLobbyObj.players[myPlayerID] = {
      username: myUsername,
      ready: false,
      myQuadrant
    }
    /** Add quadrant to coordinates obj **/
    myLobbyObj.coordinates[myQuadrant] = [];
    
    console.log(`${myUsername} joined lobby ${lobbyID}. This lobby:`, myLobbyObj);
  
    const data = { myLobbyObj, myPlayerID };
    res.json(data);
  });
  
  /** Handle request for updated game lobby data **/
  app.post('/reqLobbyInfo', (req, res) => {
    const { lobbyID } = req.body;
  
    console.log('User request for lobby obj:', lobbyID);
    const data = { myLobbyObj: games[lobbyID] }
    res.json(data);
  })
  // === big rebuild



};