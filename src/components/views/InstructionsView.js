import React, { useState, useEffect } from 'react'

// subcomponents
import NavButton from '../NavButton'
import MainImage from '../MainImage'
import { CountdownCircleTimer } from 'react-countdown-circle-timer';


// helpers
import constants from '../../constants';
const { VIEW_TIME, ROUND_TIME } = constants;

export default function InstructionsView(props) {
  const { socket, changeViewHandler, myQuadrant } = props;

  const [state, setState] = useState({
    tick: true,
    interval: null
  })

  const { tick, interval } = state;

  useEffect(() => {
    socket.on('changeView', nextView => {
      changeViewHandler(nextView);
    });
  
  }, []);

  return (
    <div>
      <h5>Find me at components/InstructionsView.js</h5>

      <h1>Your goal is to draw a picture as a team!</h1>

      <h2>This is your section of the final image. As time goes, the image will slowly fade. You will have {ROUND_TIME / 60000} {ROUND_TIME / 60000 > 1 ? 'minutes' : 'minute'} to draw it from memory!</h2>

      <div style={{position: 'fixed', top: '5vh', left: '50vw'}}>
      <CountdownCircleTimer
      isPlaying
      duration={VIEW_TIME / 1000}
      initialRemainingTime={100}
      colors={[['#A30000']]}/>
      </div>
      
      <MainImage
      myQuadrant={myQuadrant}/>


    </div>
  )
}
