/** All time variables in milliseconds **/

const MAX_PLAYERS_PER_LOBBY = 4;

/** length of time in InstructionsView **/
const VIEW_TIME = 2000;

/** length of time in DrawGameView **/
const ROUND_TIME = 20000; 

/** the length of time we wait before sending the final coordinates out in the event that a player disconnects during the game **/
const DELAY_FOR_COORDS = 3000;

/** the rate which we are reducing the opacity by per game tick. 0.95 => 5% less everytime. **/
const OPACITY_DECAY = 0.98; 

const constants = {
  MAX_PLAYERS_PER_LOBBY,
  VIEW_TIME,
  ROUND_TIME,
  DELAY_FOR_COORDS,
  OPACITY_DECAY
}

module.exports = constants;