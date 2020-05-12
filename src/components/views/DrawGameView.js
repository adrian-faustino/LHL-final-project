import React, { useState, useEffect, useRef } from 'react'
import './DrawGameView.css'
import drawHelpers from '../../helpers/drawHelpers';

// Notes: We will remove the NavButton component later and replace it with a socket emit so it automatically moves to the next page for all the players

// subcomponents
import NavButton from '../NavButton'
import Palette from '../Palette';

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
    currentLineSize: 5,
    open: false
  });

  const { coordinates, drawing, currentColor, currentLineSize } = state;

  const { onMouseUpHandler,
        onMouseDownHandler,
        onMouseMoveHandler,
      draw } = drawHelpers;

  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, window.innerHeight, window.innerWidth);
    coordinates.forEach(coordinate => {
      const { x, y, color, lineSize } = coordinate;
      draw(ctx, coordinate);
    });
  });

  // helpers
  const togglePalette = e => {
    e.preventDefault();
    const open = !state.open;
    setState({...state, open});
  }


  return (
    <div className="no-animaion">
      <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={e => onMouseDownHandler(e, state, setState)}
      onMouseUp={e => onMouseUpHandler(e, state, setState)}
      onMouseMove={e => onMouseMoveHandler(e, state, setState)}/>

      <button
      onClick={e=> togglePalette(e)}
      >test</button>
      <Palette />

      {/* <NavButton
      nextView={'ResultsView'}
      buttonTitle={'Next'}
      changeViewHandler={props.changeViewHandler}/> */}
    </div>
  )
}
