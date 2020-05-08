import React from 'react'

// subcomponents
import NavButton from '../NavButton'

export default function LandingView(props) {
  return (
    <div>
      <h1>Find me at components/LandingView.js</h1>

      <form>
        <label htmlFor="username">Play as:</label>
        <input type="text" id="username" placeholder="Your name"
        onChange={props.inputChangeHandler}/>
      </form>

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
