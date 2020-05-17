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

  return (
    <div className="scrolling-background">
      <h1 className="ResultsView__container--title App__colorScheme--title">Ta-Daaa!</h1>

      <h2 className="ResultsView__message App__colorScheme--message">Such a work of art!</h2>
        
      {/* <img className="ResultsView__image App__colorScheme--referenceBorder" src={MLReference} alt="Portion of image to draw."></img> */}

      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}>
      </canvas>


      {/* I had to create a div to contain this to be able to control it. */}
      <div className="button">
        <NavButton
        nextView={'ShareView'}
        buttonTitle={'Done'}
        changeViewHandler={props.changeViewHandler}
        />
      </div>
    </div>
  )
}
