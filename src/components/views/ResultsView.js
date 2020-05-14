import React, { useEffect, useRef, useState } from 'react'

// Notes: We will remove the NavButton component later and replace it with a socket emit so it automatically moves to the next page for all the players

// subcomponents
import NavButton from '../NavButton'

// helpers
import renderFinalHelpers from '../../helpers/renderFinalHelpers';

export default function ResultsView(props) {

  const { socket } = props;

  const [state, setState] = useState({
    finalCoordinates: null
  })
  
  const { finalCoordinates } = state;

  // helpers
  const { renderQuadrants } = renderFinalHelpers;

  // receive coords when backend is finished compiling coordinates
  useEffect(() => {
    socket.on('finalCoords', finalCoordinates => {
      setState(prev => ({...prev, finalCoordinates}));
      console.log('Received final coordinates:', finalCoordinates);
    });
  }, [])

  // canvas
  const canvasRef = useRef(null);
  useEffect(() => {
    console.log('useEffect because of canvas...')
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, window.innerHeight, window.innerWidth);
    if(finalCoordinates) {
      console.log('Setting min drawtime...');

      renderQuadrants(ctx, finalCoordinates);
    }
  });

  return (
    <div>
      <h1>Find me at components/ResultsView.js</h1>

      <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}>
      </canvas>

      <NavButton
      nextView={'ShareView'}
      buttonTitle={'Done'}
      changeViewHandler={props.changeViewHandler}/>
    </div>
  )
}
