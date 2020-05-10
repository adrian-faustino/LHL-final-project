import React, { useState, useEffect } from 'react'

// subcomponents
import NavButton from '../NavButton'
import MainImage from '../MainImage'

export default function InstructionsView(props) {

  const [state, setState] = useState({
    playerAmt: null,
    skipOK: false,
    lobbyID: ''
  });

  useEffect(() => {
    // on mount, get lobbyID
    props.socket.on('receiveView', data => {
      const { lobbyID } = data;
      console.log('me?')
      setState({...state, lobbyID});
    });

    // ...then req for number of players
    props.socket.emit('checkPlayerAmt', {lobbyID: state.lobbyID});


    props.socket.on('receivePlayerAmt', data => {
      console.log('receive')
      const { playerAmt, lobbyID } = data
      setState({...state, playerAmt, lobbyID});
    });
  });

  // helpers
  const onClickHandler = e => {
    e.preventDefault()

    // emit ready state to everyone
    const data = {
      username: props.username,
      lobbyID: state.lobbyID
    }
    props.socket.emit('skipOK', data)
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
