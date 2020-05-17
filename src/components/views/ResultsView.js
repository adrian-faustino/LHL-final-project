import React, { useEffect, useRef, useState } from 'react'
import './ResultsView.css'

// Begin: Dummy code to have static reference image. Take out when real image is available.
// import MLReference from '../../assets/MLReference.jpg';
// End: Dummy code to have static reference image. Take out when real image is available.



// Notes: We will remove the NavButton component later and replace it with a socket emit so it automatically moves to the next page for all the players

// subcomponents
import NavButton from '../NavButton'

// helpers
import renderFinalHelpers from '../../helpers/renderFinalHelpers';
import constants from '../../constants';

// styles
import './ResultsView.css';
import IMG_SRC from '../../assets/mona-lisa.jpg';

const { CANVAS_W, CANVAS_H } = constants;

export default function ResultsView(props) {

  const { socket, changeViewHandler } = props;

  const [state, setState] = useState({
    finalCoordinates: null,
    toggleReplay: false
  })
  
  const { finalCoordinates, toggleReplay } = state;

  // helpers
  const { renderQuadrants } = renderFinalHelpers;

  // receive coords when backend is finished compiling coordinates
  useEffect(() => {
    socket.on('finalCoords', finalCoordinates => {
      console.log('Rendering final picture...');
      setState(prev => ({...prev, finalCoordinates}));
      
      /** Save to DB - STRETCH **/
    });
  }, []);

  // canvas
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, window.innerHeight, window.innerWidth);
    if(finalCoordinates) {
      console.log('Rendering...');
      renderQuadrants(ctx, finalCoordinates);
    }
  });

  const replayHandler = e => {
    e.preventDefault();
    setState(prev => ({...prev, toggleReplay: !toggleReplay}));
  }

  return (
    <div className="scrolling-background">

      <h1 className="ResultsView__container--title App__colorScheme--title">Ta-Daaa!</h1>

      <h2 className="ResultsView__message App__colorScheme--message">Such a work of art!</h2> 


      <div className="ResultsView--container">
        <canvas
        className="ResultsView--canvas"
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}>
        </canvas>

        <img
        width={CANVAS_W}
        height={CANVAS_H}
        className="ResultsView--origImg"
        src={IMG_SRC}/>
      </div>

      <div className="ResultsView--doneBtn-container">
        <button onClick={e => replayHandler(e)}>Replay</button>
        <NavButton
        nextView={'LandingView'}
        buttonTitle={'Done'}
        changeViewHandler={changeViewHandler}/>
      </div>
    </div>
  )
}
