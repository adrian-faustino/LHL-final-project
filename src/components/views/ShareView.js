import React from 'react'

// subcomponents
import NavButton from '../NavButton'

export default function ShareView(props) {
  return (
    <div className="scrolling-background">

      <NavButton
      nextView={'LandingView'}
      buttonTitle={'New Game'}
      changeViewHandler={props.changeViewHandler}/>
    </div>
  )
}
