import React, { useState, useEffect } from 'react'

// subcomponents
import NavButton from '../NavButton'
import MainImage from '../MainImage'
import CountdownTimer from '../CountdownTimer';

// helpers
import constants from '../../constants';
const { VIEW_TIME } = constants;

export default function InstructionsView(props) {
  const { socket, changeViewHandler, myQuadrant } = props;

  const [state, setState] = useState({
    time: 30000
  })
  const { time } = state;

  useEffect(() => {
    socket.on('changeView', nextView => {
      changeViewHandler(nextView);
    });
  }, []);

  return (
    <div>
      <h5>Find me at components/InstructionsView.js</h5>

      <h1>Your goal is to draw a picture as a team!</h1>

      <h2>This is your section of the final image. You will have 3 minutes to draw it!</h2>
      
      <MainImage
      myQuadrant={myQuadrant}/>
      
      {/* <div style={{position:'absolute', top: '50%'}}>
      <CountdownTimer timeInMS={time}/>
      </div> */}
    </div>
  )
}
