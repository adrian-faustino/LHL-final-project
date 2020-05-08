import React from 'react'

// subcomponents
import NavButton from '../NavButton'

export default function LandingView(props) {
  return (
    <div>
      <h1>Find me at components/LandingView.js</h1>

      <NavButton
      nextView={'HostLobbyView'}
      buttonTitle={'Create a lobby'}
      changeViewHandler={props.changeViewHandler}/>

      <NavButton
      nextView={'GuestLobbyView'}
      buttonTitle={'Join a lobby'}
      changeViewHandler={props.changeViewHandler}/>
    </div>
  )
}
