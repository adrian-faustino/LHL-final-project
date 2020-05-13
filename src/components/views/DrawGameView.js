import React, { useState, useEffect, useRef } from 'react'
import './DrawGameView.css'

// Begin: Dummy code to have static reference image. Take out when real image is available.
import MLReference from '../../assets/MLReference.jpg';
// End: Dummy code to have static reference image. Take out when real image is available.

// helpers
import paletteHelpers from '../../helpers/paletteHelpers';
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

  const { coordinates, drawing, currentColor, currentLineSize, open } = state;


  // helpers
  const { togglePalette, updateLineSize, updateColor } = paletteHelpers;
  const { onMouseUpHandler, onMouseDownHandler, onMouseMoveHandler, draw } = drawHelpers;


  // canvas
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


  return (
    <div>
      <div className="DrawGameView__header">
        <p>0:24</p>
        <button
          className=""
          onClick={e=> togglePalette(e, state, setState)}
          >
          <i className="fas fa-palette"></i>
        </button>
      </div>

      {open && (<Palette
        setState={setState}
        state={state}
        updateLineSize={updateLineSize}
        updateColor={updateColor}
        />)
      }

      <canvas
        className="DrawGameView__drawPort"
        ref={canvasRef}
        onMouseDown={e => onMouseDownHandler(e, state, setState)}
        onMouseUp={e => onMouseUpHandler(e, state, setState)}
        onMouseMove={e => onMouseMoveHandler(e, state, setState)}
      />

      <img className="GameDrawView__image--reference" src={MLReference} alt="Portion of image to draw."></img>

      {/* <NavButton
      nextView={'ResultsView'}
      buttonTitle={'Next'}
      changeViewHandler={props.changeViewHandler}/> */}
    </div>
  )
}



// <canvas
//   className="DrawGameView__drawPort"
//   ref={canvasRef}
//   width={window.innerWidth}
//   height={window.innerHeight}
//   onMouseDown={e => onMouseDownHandler(e, state, setState)}
//   onMouseUp={e => onMouseUpHandler(e, state, setState)}
//   onMouseMove={e => onMouseMoveHandler(e, state, setState)}
// />
// <h1 style={{color: "red", fontSize: "14px"}}>DrawGameView.js</h1>
