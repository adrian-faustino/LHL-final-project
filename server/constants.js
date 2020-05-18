const MAX_PLAYERS_PER_LOBBY = 4;

const VIEW_TIME = 10000; // fthe length of time in InstructionsView
const ROUND_TIME = 5000; // the length of time in DrawGameView
const DELAY_FOR_COORDS = 3000; // the length of time we wait before sending the final coordinates out in the event that a player disconnects during the game

const constants = {
  MAX_PLAYERS_PER_LOBBY,
  VIEW_TIME,
  ROUND_TIME,
  DELAY_FOR_COORDS
}

module.exports = constants;