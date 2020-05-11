import React, { useState, useEffect } from 'react'

// subcomponents
import NavButton from '../NavButton'
import MainImage from '../MainImage'

export default function InstructionsView(props) {
  const { username, socket, changeViewHandler, lobbyID } = props;

  const [state, setState] = useState({
    playerAmt: null,
    skipOK: false,
    lobbyID: ''
  });
 

  useEffect(() => {
    console.log('Mounted lobby ', lobbyID);
  });

  // helpers
  const onClickHandler = e => {
    e.preventDefault()

    console.log('Ready button clicked.');
    socket.emit('readyOK', { username }); // lobbyID here
  }

  return (
    <div>
      <h1>Find me at components/InstructionsView.js</h1>

      <h3>Your goal is to draw a picture as a team!</h3>

      <MainImage />

      <p>You will draw this section of the image. You will have 3 minutes to draw!</p>

      {state.playerAmt && <span>Players required to skip: {state.playerAmt}</span>}
      <button onClick={e => onClickHandler(e)}>Ready!</button>
      {/* <NavButton
      nextView={'DrawGameView'}
      buttonTitle={'Skip'}
      changeViewHandler={props.changeViewHandler}/> */}
    </div>
  )
}
