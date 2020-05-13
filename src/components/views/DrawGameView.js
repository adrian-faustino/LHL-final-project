import React, { useState, useEffect, useRef } from 'react'
import './DrawGameView.css';
import axios from 'axios';

// helpers
import paletteHelpers from '../../helpers/paletteHelpers';
import drawHelpers from '../../helpers/drawHelpers';

// Notes: We will remove the NavButton component later and replace it with a socket emit so it automatically moves to the next page for all the players

// subcomponents
import NavButton from '../NavButton';
import Palette from '../Palette';

// move this to .env later
const API = 'http://localhost:5555';


export default function DrawGameView(props) {
  const { lobbyID, socket, changeViewHandler, playerObj } = props;

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
    open: false,
    roundTime: null,
    roundFinished:false
  });

  const { coordinates, drawing, currentColor, currentLineSize, open, roundTime, roundFinished } = state;


  // helpers
  const { togglePalette, updateLineSize, updateColor } = paletteHelpers;
  const { onMouseUpHandler, onMouseDownHandler, onMouseMoveHandler, draw } = drawHelpers;

  // set game timer and trigger view change
  useEffect(() => {
    console.log('DrawGameView mounted with lobbyID', lobbyID);
    socket.emit('drawViewTimeout', { lobbyID });

    socket.on('roundFinished', () => {
      const roundFinished = true;
      setState(prev => ({...prev, roundFinished}));
    })
    
    socket.on('changeView', data => {
      const { nextView } = data;
      changeViewHandler(nextView);
    })
  }, [])

    // send final coordinates before view change
    useEffect(() => {
      if(roundFinished) {
        axios.post(API + '/test', { data: 'test' }).then(msg => {
          console.log('Server says:', msg);
        }).catch(err => console.log(err));

        socket.emit('saveFinalCoords', { coordinates });

        console.log('DrawView unmounting...');
        console.log(playerObj, '<--id');
      }
    }, [roundFinished])

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
    <div className="no-animaion">
      <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={e => onMouseDownHandler(e, state, setState)}
      onMouseUp={e => onMouseUpHandler(e, state, setState)}
      onMouseMove={e => onMouseMoveHandler(e, state, setState)}/>

      <button
      className="palette--button"
      onClick={e=> togglePalette(e, state, setState)}
      ></button>


      {open && (<Palette
        setState={setState}
        state={state}
        updateLineSize={updateLineSize}
        updateColor={updateColor}/>)}

      {/* <NavButton
      nextView={'ResultsView'}
      buttonTitle={'Next'}
      changeViewHandler={props.changeViewHandler}/> */}
    </div>
  )
}
