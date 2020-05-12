import React from 'react'

// Notes: We will remove the NavButton component later and replace it with a socket emit so it automatically moves to the next page for all the players

// subcomponents
import NavButton from '../NavButton'

export default function DrawGameView(props) {
  return (

    <div>
      <h1 style={{color: "red", fontSize: "14px"}}>DrawGameView.js</h1>

      <NavButton
      nextView={'ResultsView'}
      buttonTitle={'Next'}
      changeViewHandler={props.changeViewHandler}/>
    </div>
  )
}
