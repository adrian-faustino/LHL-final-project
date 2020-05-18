/** All time variables in milliseconds **/

const VIEW_TIME = 2000; // for InstructionsView;
const ROUND_TIME = 5000;
const API = 'http://localhost:5555';
const MIN_RENDER_TIME = 4000; // for rendering final picture
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