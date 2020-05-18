/** All time variables in milliseconds **/

const VIEW_TIME = 1000; // for InstructionsView;
const ROUND_TIME = 50000000;
const API = 'http://localhost:5555';
const MIN_RENDER_TIME = 4000; // for rendering final picture animation
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