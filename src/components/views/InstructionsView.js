import React from 'react'

// subcomponents
import NavButton from '../NavButton'

export default function InstructionsView(props) {
  return (
    <div>
      <h1>Find me at components/InstructionsView.js</h1>

      <NavButton
      nextView={'DrawGameView'}
      buttonTitle={'Skip'}
      changeViewHandler={props.changeViewHandler}/>
    </div>
  )
}
