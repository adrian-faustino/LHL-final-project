import React, { useState } from 'react'
import './DrawGameView.css'
import draw from '../../helpers/draw';

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
    currentColor: 'black',
    currentLineSize: '5'
  });
  const { coordinates, drawing, currentColor, currentLineSize } = state;

  // draw helpers
  const { onMouseDownHandler,
          onMouseUpHandler,
          onMouseMoveHandler } = draw;
  // constants


  const CANV_HEIGHT = 800;
  const CANV_WIDTH = 800;
  const CANV_BG_COLOR = 'grey';

  console.log('coordinates:', coordinates);



  return (

    <div>
      <h1>Find me at components/DrawGameView.js</h1>

      <canvas
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
