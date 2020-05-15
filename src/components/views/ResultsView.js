import React from 'react'
import './ResultsView.css'

// Begin: Dummy code to have static reference image. Take out when real image is available.
import MLReference from '../../assets/MLReference.jpg';
// End: Dummy code to have static reference image. Take out when real image is available.


// Notes: We will remove the NavButton component later and replace it with a socket emit so it automatically moves to the next page for all the players

// subcomponents
import NavButton from '../NavButton'

export default function ResultsView(props) {
  return (
    <div className="scrolling-background">
      <h1 className="ResultsView__container--title App__colorScheme--title">Ta-Daaa!</h1>

      <h2 className="ResultsView__message App__colorScheme--message">Such a work of art!</h2>
        
      <img className="ResultsView__image App__colorScheme--referenceBorder" src={MLReference} alt="Portion of image to draw."></img>

      {/* I had to create a div to contain this to be able to control it. */}
      <div className="button">
        <NavButton
        nextView={'ShareView'}
        buttonTitle={'Done'}
        changeViewHandler={props.changeViewHandler}
        />
      </div>
    </div>
  )
}
