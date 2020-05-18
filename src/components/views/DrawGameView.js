import React, { useState, useEffect, useRef } from 'react'
import './DrawGameView.css';
import axios from 'axios';

// helpers
import paletteHelpers from '../../helpers/paletteHelpers';
import drawHelpers from '../../helpers/drawHelpers';
import constants from '../../constants';

// Notes: We will remove the NavButton component later and replace it with a socket emit so it automatically moves to the next page for all the players

// subcomponents
import NavButton from '../NavButton';
import Palette from '../Palette';
import MainImage from '../MainImage';
import LineSize from '../LineSize';
import CountdownTimer from '../CountdownTimer';

// styles
import IMG_SRC from '../../assets/mona-lisa.jpg'
import DrawGameViewStyles from './DrawGameViewStyles';



const { API, ROUND_TIME, CANVAS_W, CANVAS_H } = constants;
const { silhouetteStyles, slicerStyles } = DrawGameViewStyles;


export default function DrawGameView(props) {
  const { lobbyID, socket, changeViewHandler, myQuadrant, myLobbyObj } = props;

  const [state, setState] = useState({
    coordinates: [],
    drawing: false,
    currentColor: 'blue',
    currentLineSize: 12,
    openLineSize: false,
    openColor: false,
    roundFinished:false,
    maxWidth: null,
    maxHeight: null,
    opacity: 1
  });

  const { coordinates, drawing, currentColor, currentLineSize, openLineSize, openColor, roundTime, roundFinished, maxWidth, maxHeight, opacity } = state;


  // helpers
  const { togglePalette, toggleLineSize, updateLineSize, updateColor } = paletteHelpers;
  const { onMouseOutHandler, onMouseUpHandler, onMouseDownHandler, onMouseMoveHandler, draw } = drawHelpers;

  useEffect(() => {
    socket.on('roundFinished', () => {
      console.log('Round finished!');
      const roundFinished = true;
      setState(prev => ({...prev, roundFinished}));
    })
    
    socket.on('changeView', nextView => {
      changeViewHandler(nextView);
    })

    socket.on('fadeSilhouette', opacity => {
      setState(prev => ({...prev, opacity}));
    })
  }, [])


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
      .then(res => {
        console.log(res.data);
        changeViewHandler('ResultsView');
      })
      .catch(err => console.log(err));
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
      const data = {
        x: x * maxWidth,
        y: y * maxHeight,
        color,
        lineSize
      }
      draw(ctx, data);
    });
  });


  // ** BG LOGIC AND TRANSFORMATIONS ** //
  const _silhouetteStyles = silhouetteStyles();
  const _slicerStyles = slicerStyles();
  const bg_h = (window.innerHeight * 0.9) * 2;
  const bg_w = bg_h * 0.8;
  
  
  let top;
  let right;
  if(myQuadrant === 'quadrant_1') {
    top = '50%';
    right = '50%';
  } else if(myQuadrant === 'quadrant_2') {
    top = '50%';
    right = '150%';
  } else if(myQuadrant === 'quadrant_3') {
    top = '-50%';
    right = '50%';
  } else if(myQuadrant === 'quadrant_4') {
    top = '-50%';
    right = '150%';
  }
  _silhouetteStyles['top'] = top;
  _silhouetteStyles['right'] = right;
  _silhouetteStyles['opacity'] = opacity;

  /** Set slicer height and width **/
  _slicerStyles['height'] = CANVAS_H;
  _slicerStyles['width'] = CANVAS_W;


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
    <div>
      <div className="InstructionsView__header App__colorScheme--header" >
        <CountdownTimer
        warningOn={true}
        timeInMS={ROUND_TIME}/>

        <button
        className="App__colorScheme--palette"
        onClick={e => colorClickHandler(e)}><i className="fas fa-palette"></i>
        </button>

        <button
          className="App__colorScheme--palette"
          onClick={e => lineSizeClickHandler(e)}><i className="fas fa-paint-brush"></i>
        </button>
      </div>


      {openColor && (<Palette
        setState={setState}
        state={state}
        updateColor={updateColor}/>)}
      {openLineSize && (<LineSize
        setState={setState}
        state={state}
        updateLineSize={updateLineSize}/>)}


      {/* Begin: Canvas and draw functionality */}
      <div className="DrawGameView--container">
        <div
        className="DrawGameView--slicer"
        style={_slicerStyles}>
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
        onMouseOut={e => onMouseOutHandler(setState)}
        onMouseDown={e => onMouseDownHandler(setState)}
        onMouseUp={e => onMouseUpHandler(setState)}
        onMouseMove={e => onMouseMoveHandler(e, state, setState, CANVAS_W, CANVAS_H)}></canvas>
      </div>
      {/* End: Canvas and draw functionality */}
    </div>
  )
}