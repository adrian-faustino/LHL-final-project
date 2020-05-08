import React from 'react'

// Notes: We will remove the NavButton component later and replace it with a socket emit so it automatically moves to the next page for all the players

// subcomponents
import NavButton from '../NavButton'

export default function ResultsView(props) {
  return (
    <div>
      <h1>Find me at components/ResultsView.js</h1>

      <NavButton
      nextView={'ShareView'}
      buttonTitle={'Done'}
      changeViewHandler={props.changeViewHandler}/>
    </div>
  )
}
