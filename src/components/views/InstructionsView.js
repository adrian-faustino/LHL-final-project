import React from 'react'

// subcomponents
import NavButton from '../NavButton'
import MainImage from '../MainImage'

export default function InstructionsView(props) {
  return (
    <div>
      <h1>Find me at components/InstructionsView.js</h1>

      <h3>Your goal is to draw a picture as a team!</h3>

      <MainImage />

      <p>You will draw this section of the image. You will have 3 minutes to draw!</p>

      <span>Players required to skip: 4</span>
      <NavButton
      nextView={'DrawGameView'}
      buttonTitle={'Skip'}
      changeViewHandler={props.changeViewHandler}/>
    </div>
  )
}
