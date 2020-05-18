import React, { useState, useEffect } from 'react'
import "./InstructionsView.css";


// subcomponents
import MainImage from '../MainImage'
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import CountdownTimer from '../CountdownTimer';


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
    const interval = setInterval(() => {
      setState(prev => ({...prev, tick: !tick}));
      console.log('RERENDERING!?');
    }, 900);

    socket.on('changeView', nextView => {
      changeViewHandler(nextView);
    });

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <div className="InstructionsView__canvasBackground">
      <div className="InstructionsView__header App__colorScheme--header" >
        <CountdownTimer timeInMS={VIEW_TIME}/>
        <button className="App__colorScheme--palette"><i className="fas fa-palette"></i></button>
        <button className="App__colorScheme--palette"><i className="fas fa-paint-brush"></i></button>
        </div>
        <p className="InstructionsView__message App__colorScheme--title">Your goal is to draw a picture as a team! This is your section of the final image. You can choose you colors and brsh size above. Good Luck!</p>
      
      
      <MainImage
      draggable={false}
      myQuadrant={myQuadrant}/>
      
    </div>
  )
}



// <p className="InstructionsView__message">Your goal is to draw a picture as a team! This is your section of the final image. As time goes, the image will slowly fade. You will have {ROUND_TIME / 60000} {ROUND_TIME / 60000 > 1 ? 'minutes' : 'minute'} to draw it from memory!</p>



// {timeLeft <= 0 && (<span className="CountdownTimer__timeUp--container"><div className="CountdownTimer__timeUp--msg">Time's up!</div></span>)}