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
import MainImage from '../MainImage';
import LineSize from '../LineSize';

// styles
import IMG_SRC from '../../assets/mona-lisa.jpg'
import DrawGameViewStyles from './DrawGameViewStyles';
const { silhouetteStyles } = DrawGameViewStyles;


// move this to .env later
const API = 'http://localhost:5555';


export default function DrawGameView(props) {
  const { lobbyID, socket, changeViewHandler, myQuadrant, myLobbyObj } = props;

  const [state, setState] = useState({
    coordinates: [],
    drawing: false,
    currentColor: 'blue',
    currentLineSize: 5,
    openLineSize: false,
    openColor: false,
    roundFinished:false,
    maxWidth: null,
    maxHeight: null
  });

  const { coordinates, drawing, currentColor, currentLineSize, openLineSize, openColor, roundTime, roundFinished, maxWidth, maxHeight } = state;


  // helpers
  const { togglePalette, toggleLineSize, updateLineSize, updateColor } = paletteHelpers;
  const { onMouseUpHandler, onMouseDownHandler, onMouseMoveHandler, draw } = drawHelpers;

  useEffect(() => {
    socket.on('roundFinished', () => {
      console.log('Round finished!');
      const roundFinished = true;
      setState(prev => ({...prev, roundFinished}));
    })
    
    socket.on('changeView', nextView => {
      changeViewHandler(nextView);
    })
  }, [])

  // === rebuild
  // send final coordinates before view change
  useEffect(() => {
    if(roundFinished) {
      const PLAYERS_IN_ROOM = Object.keys(myLobbyObj.players).length;
      
      const data = {
        coordinates,
        lobbyID,
        myQuadrant,
        PLAYERS_IN_ROOM
      }

      console.log('Game finished. Sending final coordinates...', coordinates);

      axios.post(API + '/finalCoords', data)
      .then()
      .catch(err => console.log(err));
    }
  }, [roundFinished])
  // === rebuild

  // canvas
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, window.innerHeight, window.innerWidth);
    coordinates.forEach(coordinate => {
      const { x, y, color, lineSize } = coordinate;
      const data = {
        x: x * maxWidth,
        y: y * maxHeight,
        color,
        lineSize
      }
      draw(ctx, data);
    });
  });

  // constants
  const CANVAS_H = window.innerHeight * 0.9;
  const CANVAS_W = CANVAS_H * 0.8;


  // ** BG LOGIC AND TRANSFORMATIONS ** //
  const _silhouetteStyles = silhouetteStyles();
  const bg_h = (window.innerHeight * 0.9) * 2;
  const bg_w = bg_h * 0.8;
  
  
  let translation = '';
  if(myQuadrant === 'quadrant_1') {
    translation = 'translate(25%, 25%)';
  } else if(myQuadrant === 'quadrant_2') {
    translation = 'translate(-25%, 25%)';
  } else if(myQuadrant === 'quadrant_3') {
    translation = 'translate(25%, -25%';
  } else if(myQuadrant === 'quadrant_4') {
    translation = 'translate(-25%, -25%';
  }
  _silhouetteStyles['transform'] = translation;

  // ** PALETTE BUTTONS LOGIC ** //
  const lineSizeClickHandler = e => {
    setState(prev => ({...prev, openColor: false}));
    toggleLineSize(e, state, setState);
  }

  const colorClickHandler = e => {
    setState(prev => ({...prev, openLineSize: false}));
    togglePalette(e, state, setState);
  }


  return (
    <div className="DrawGameView--container">
      <div
      className="DrawGameView--slicer"
      height={CANVAS_H}
      width={CANVAS_W}>
        <img
        className="DrawGameView--silhouette"
        style={_silhouetteStyles}
        height={bg_h}
        width={bg_w}
        src={IMG_SRC} alt="silhouette"/>
      </div>
      <canvas
      className="DrawGameView--canvas"
      ref={canvasRef}
      width={CANVAS_W}
      height={CANVAS_H}
      onMouseDown={e => onMouseDownHandler(e, state, setState)}
      onMouseUp={e => onMouseUpHandler(e, state, setState)}
      onMouseMove={e => onMouseMoveHandler(e, state, setState, CANVAS_W, CANVAS_H)}></canvas>
      
      <div className="DrawGameView--toggleBtn-container">
        <button
        style={{background: currentColor}}
        className="palette--button"
        onClick={e => colorClickHandler(e)}></button>

        <button
        style={{height: currentLineSize + 10,
        width: currentLineSize + 10}}
        onClick={e => lineSizeClickHandler(e)}
        className="lineSize--button"></button>
      </div>

      {openColor && (<Palette
        setState={setState}
        state={state}
        updateColor={updateColor}/>)}

      {openLineSize && (<LineSize
        setState={setState}
        state={state}
        updateLineSize={updateLineSize}/>)}

      {/* <NavButton
      nextView={'ResultsView'}
      buttonTitle={'Next'}
      changeViewHandler={props.changeViewHandler}/> */}
    </div>
  )
}
