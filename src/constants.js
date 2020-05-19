/** All time variables in milliseconds **/

/** Switch between dev mode and production **/
const isDevMode = true;
const API = isDevMode ? 'http://localhost:5555' : 'https://draw-mageddon.herokuapp.com';

/** length of time in InstructionsView **/
const VIEW_TIME = 7000; 

/** length of time in DrawingGameView **/
const ROUND_TIME = 60000;

/** for rendering final picture animation **/
const MIN_RENDER_TIME = 5000; 
const CANVAS_H = window.innerHeight * 0.9;
const CANVAS_W = CANVAS_H * 0.8;

const constants = {
  VIEW_TIME,
  ROUND_TIME,
  API,
  MIN_RENDER_TIME,
  CANVAS_W,
  CANVAS_H
}

export default constants;