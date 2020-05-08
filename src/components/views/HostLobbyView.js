import React from 'react'

// subcomponents
import NavButton from '../NavButton'

export default function HostLobbyView(props) {
  return (
    <div>
      <h1>Find me at components/HostLobbyView.js</h1>

      <NavButton
      nextView={'InstructionsView'}
      buttonTitle={'Start game'}
      changeViewHandler={props.changeViewHandler}/>
    </div>
  )
}
