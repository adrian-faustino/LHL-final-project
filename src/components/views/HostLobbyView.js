import React from 'react'

// subcomponents
import NavButton from '../NavButton'

export default function HostLobbyView(props) {
  return (
    <div>
      <h1>Find me at components/HostLobbyView.js</h1>

      <h1>Hello, {props.username}!</h1>
      <h2>Share this code to your friends</h2>
      <p>123456</p>

      <NavButton
      nextView={'InstructionsView'}
      buttonTitle={'Start game'}
      changeViewHandler={props.changeViewHandler}/>
    </div>
  )
}
