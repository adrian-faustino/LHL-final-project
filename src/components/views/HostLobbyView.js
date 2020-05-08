import React from 'react'

// subcomponents
import NavButton from '../NavButton'

export default function HostLobbyView(props) {

  // greeting logic
  const username = props.username.trim()
  const greeting = username.length === 0 ? 'Hello!' : `Hello, ${username}!`;

  return (
    <div>
      <h1>Find me at components/HostLobbyView.js</h1>

      <h1>{greeting}</h1>
      <h2>Share this code to your friends</h2>
      <p>123456</p>

      <NavButton
      nextView={'InstructionsView'}
      buttonTitle={'Start game'}
      changeViewHandler={props.changeViewHandler}/>
    </div>
  )
}
