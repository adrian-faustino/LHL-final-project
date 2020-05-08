import React from 'react'

// subcomponents
import NavButton from '../NavButton'

export default function DrawGameView(props) {
  return (
    <div>
      <h1>Find me at components/DrawGameView.js</h1>
      <NavButton
      nextView={"test!!!"}
      changeViewHandler={props.changeViewHandler}/>
    </div>
  )
}
