import React, { useState, useEffect } from 'react'
import "./InstructionsView.css";


// subcomponents
import MainImage from '../MainImage'
import CountdownTimer from '../CountdownTimer';

// helpers
import constants from '../../constants';
const { VIEW_TIME } = constants;

export default function InstructionsView(props) {
  const { socket, changeViewHandler, myQuadrant } = props;

  const [state, setState] = useState({
    time: 10000 // This is the time for the instruction view cownt down but it doesn't transition the page. That code is in constants.js.
  })
  const { time } = state;

  useEffect(() => {
    socket.on('changeView', nextView => {
      changeViewHandler(nextView);
    });

    setInterval(() => {
      console.log('Ticking...');
      setState(prev => ({...prev, time: time - 1000}));
    }, 500);
  }, []);

  return (
    <div>
      <div className="InstructionsView__header App__colorScheme--header" >
        <CountdownTimer timeInMS={time}/>
        <button className="App__colorScheme--palette"><i className="fas fa-palette"></i></button>
        <button className="App__colorScheme--palette"><i className="fas fa-paint-brush"></i></button>
      </div>
      
      <MainImage myQuadrant={myQuadrant}/>
    </div>
  )
}


// {timeLeft <= 0 && (<span className="CountdownTimer__timeUp--container"><div className="CountdownTimer__timeUp--msg">Time's up!</div></span>)}


// <div className="InstructionsView__image--toDraw">
//   <img className="InstructionsView__image--reference App__colorScheme--referenceBorder" src={MLReference} alt="Portion of image to draw."></img>
// </div> 