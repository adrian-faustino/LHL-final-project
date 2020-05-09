import React from 'react'

// subcomponents
import NavButton from '../NavButton'

export default function ShareView(props) {
  return (
    <div>
      <h1>Find me at components/ShareView.js</h1>

      <h3>Your goal is to draw a picture as a team!</h3>

      <NavButton
      nextView={'LandingView'}
      buttonTitle={'New Game'}
      changeViewHandler={props.changeViewHandler}/>
    </div>
  )
}
