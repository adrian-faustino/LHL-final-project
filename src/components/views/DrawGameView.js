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

// styles
import DrawGameViewStyles from './DrawGameViewStyles';
const { canvasStyles } = DrawGameViewStyles;

// move this to .env later
const API = 'http://localhost:5555';


export default function DrawGameView(props) {
  const { lobbyID, socket, changeViewHandler, playerObj, myQuadrant, myLobbyObj, view } = props;

  const [state, setState] = useState({
    coordinates: [],
    drawing: false,
    currentColor: 'blue',
    currentLineSize: 5,
    open: false,
    roundTime: null,
    roundFinished:false,
    maxWidth: null,
    maxHeight: null
  });

  const { coordinates, drawing, currentColor, currentLineSize, open, roundTime, roundFinished, maxWidth, maxHeight } = state;


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

  // === rebuild
  // send final coordinates before view change
  useEffect(() => {
    if(roundFinished) {
      const PLAYERS_IN_ROOM = Object.keys(myLobbyObj.coordinates).length;
      
      const data = {
        coordinates,
        lobbyID,
        myQuadrant,
        PLAYERS_IN_ROOM
      }
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
  console.log('CANVAS W, CAMVAS H', CANVAS_W, CANVAS_H)

  // bg logic
  const _canvasStyles = canvasStyles();
  const bg_h = window.innerHeight * 2 + 'px';
  const bg_w = bg_h * 0.8 + 'px'// change ratio later
  _canvasStyles['backgroundSize'] = `${bg_h} ${bg_w}`;


  return (
    <div className="no-animaion">
      <canvas
      style={_canvasStyles}
      ref={canvasRef}
      width={CANVAS_W}
      height={CANVAS_H}
      onMouseDown={e => onMouseDownHandler(e, state, setState)}
      onMouseUp={e => onMouseUpHandler(e, state, setState)}
      onMouseMove={e => onMouseMoveHandler(e, state, setState, CANVAS_W, CANVAS_H)}/>

      <button
      className="palette--button"
      onClick={e=> togglePalette(e, state, setState)}
      ></button>

      <MainImage
      myQuadrant={myQuadrant}
      view={view}></MainImage>

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
