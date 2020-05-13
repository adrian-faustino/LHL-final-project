import React, { useEffect } from 'react'

// Notes: We will remove the NavButton component later and replace it with a socket emit so it automatically moves to the next page for all the players

// subcomponents
import NavButton from '../NavButton'

// helpers
import renderFinalHelpers from '../../helpers/renderFinalHelpers';

export default function ResultsView(props) {

  const { socket } = props;

  // helpers
  const { testing } = renderFinalHelpers;

  useEffect(() => {
    testing();

    socket.on('finalCoords', data => {
      const { finalCoordinates } = data;
      console.log('Received final coordinates:', data);
    });

  }, [])

  return (
    <div>
      <h1>Find me at components/ResultsView.js</h1>

      <canvas></canvas>

      <NavButton
      nextView={'ShareView'}
      buttonTitle={'Done'}
      changeViewHandler={props.changeViewHandler}/>
    </div>
  )
}
