import React, { useState, useEffect } from 'react'

// subcomponents
import NavButton from '../NavButton'

// Helpers
import util from '../../helpers/util'

export default function HostLobbyView(props) {

  const [lobbyID, setLobbyID] = useState('');

  // when this component mounts, we will generate a lobby ID
  useEffect(() => {
    const lobbyID = util.generateLobbyID(6);
    setLobbyID(lobbyID);


    // ask server to add this lobby to list of lobbies
    props.socket.emit('createLobby', lobbyID)

    // ...then join that lobby
    props.socket.emit('joinRoom', lobbyID);
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
