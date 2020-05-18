import React, { useEffect, useRef, useState } from 'react'
import './ResultsView.css'

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

  const { socket, changeViewHandler, finalCoordinates } = props;

  const [state, setState] = useState({
    toggleReplay: false
  })
  
  const { toggleReplay } = state;

  // helpers
  const { renderQuadrants } = renderFinalHelpers;


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
      <div className="ResultsView--container">

        <canvas
        className="ResultsView--canvas"
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}>
        </canvas>

        <img
        draggable={false}
        width={CANVAS_W}
        height={CANVAS_H}
        className="ResultsView--origImg"
        src={IMG_SRC}/>
      </div>

      <div className="ResultsView__container--button">
        <button
          className="ResultsView__btn App__colorScheme--button"
          onClick={e => replayHandler(e)}>Replay
        </button>
        <button
          className="ResultsView__btn App__colorScheme--button"
          onClick={e => {
          e.preventDefault();
          changeViewHandler('LandingView')
        }}>Done
        </button>
        {/* <NavButton
        nextView={'LandingView'}
        buttonTitle={'Done'}
        changeViewHandler={changeViewHandler}/> */}
      </div>
    </div>
  )
}


// <h1 className="ResultsView__container--title App__colorScheme--title">Ta-Daaa!</h1>

// <h2 className="ResultsView__message App__colorScheme--message">Such a work of art!</h2> 
