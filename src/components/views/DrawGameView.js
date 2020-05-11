import React, { useState, useRef } from 'react'
import './DrawGameView.css'
import drawHelpers from '../../helpers/drawHelpers';

// Notes: We will remove the NavButton component later and replace it with a socket emit so it automatically moves to the next page for all the players

// subcomponents
import NavButton from '../NavButton'

export default function DrawGameView(props) {
  const [state, setState] = useState({
    coordinates: [{
      x: null,
      y: null,
      color: null,
      lineSize: null
    }],
    drawing: false,
    currentColor: 'blue',
    currentLineSize: 5
  });

  const { coordinates, drawing, currentColor, currentLineSize } = state;

  const { onMouseDownHandler,
    onMouseUpHandler,
    onMouseMoveHandler } = drawHelpers;

  const canvasRef = useRef(null);
  // rebuild




  // constants


  const CANV_HEIGHT = 800;
  const CANV_WIDTH = 800;
  const CANV_BG_COLOR = 'grey';

  console.log('coordinates:', coordinates);



  return (
    <div className="no-animaion">
      <h1>Find me at components/DrawGameView.js</h1>

      <canvas
      ref={canvasRef}
      onMouseDown={e => onMouseDownHandler(e, state, setState)}
      onMouseUp={e => onMouseUpHandler(e, state, setState)}
      onMouseMove={e => onMouseMoveHandler(e, state, setState)}
      id={"canvas"}/>


      <NavButton
      nextView={'ResultsView'}
      buttonTitle={'Next'}
      changeViewHandler={props.changeViewHandler}/>
    </div>
  )
}
