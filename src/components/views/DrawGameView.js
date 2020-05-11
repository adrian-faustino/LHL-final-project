import React from 'react'
import './DrawGameView.css'
import draw from '../../helpers/draw';

// Notes: We will remove the NavButton component later and replace it with a socket emit so it automatically moves to the next page for all the players

// subcomponents
import NavButton from '../NavButton'

export default function DrawGameView(props) {
  
  // draw helpers
  const { onMouseDownHandler,
          onMouseUpHandler,
          onChangeHandler } = draw;
  // constants


  const CANV_HEIGHT = 800;
  const CANV_WIDTH = 800;
  const CANV_BG_COLOR = 'grey';




  return (

    <div>
      <h1>Find me at components/DrawGameView.js</h1>

      <canvas
      onMouseDown={e => onMouseDownHandler(e)}
      onMouseUp={e => onMouseUpHandler(e)}
      onChange={e => onChangeHandler(e)}
      id={"canvas"}/>

      <NavButton
      nextView={'ResultsView'}
      buttonTitle={'Next'}
      changeViewHandler={props.changeViewHandler}/>
    </div>
  )
}
