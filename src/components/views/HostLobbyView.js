import React, { useState, useEffect } from 'react'

// subcomponents
import NavButton from '../NavButton'

// Helpers
import util from '../../helpers/util'

export default function HostLobbyView(props) {

  const [lobbyID, setLobbyID] = useState('')

  // when this component mounts, we will generate a lobby ID
  useEffect(() => {
    const roomID = util.generateRoomID(6);
    setLobbyID(roomID);
  }, []);

  // greeting logic
  const username = props.username.trim()
  const greeting = username.length === 0 ? 'Hello!' : `Hello, ${username}!`;

  return (
    <div>
      <h1>Find me at components/HostLobbyView.js</h1>

      <h1>{greeting}</h1>
      <h2>Share this code to your friends</h2>
      <p>{lobbyID}</p>

      <NavButton
      nextView={'InstructionsView'}
      buttonTitle={'Start game'}
      changeViewHandler={props.changeViewHandler}/>
    </div>
  )
}
