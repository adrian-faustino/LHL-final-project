/** All time variables in milliseconds **/

/** Switch between dev mode and production **/
const isDevMode = false;
const API = isDevMode ? 'http://localhost:5556' : 'https://draw-mageddon.herokuapp.com';

/** length of time in InstructionsView **/
const VIEW_TIME = isDevMode ? 1000 : 15000;
//=== Change the 1st number for dev mode ===// 
/** length of time in DrawGameView **/
const ROUND_TIME = isDevMode ? 1000 : 120000; 

/** for rendering final picture animation **/
const MIN_RENDER_TIME = 5000; 
const CANVAS_H = window.innerHeight * 0.9;
const CANVAS_W = CANVAS_H * 0.8;

/** DrawGameView canvas navbar offset */
const HEIGHT_OFFSET = 0.05;

/** IMG API **/

const constants = {
  isDevMode,
  VIEW_TIME,
  ROUND_TIME,
  API,
  MIN_RENDER_TIME,
  CANVAS_W,
  CANVAS_H,
  HEIGHT_OFFSET
}

export default constants;