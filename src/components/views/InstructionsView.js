import React, { useState, useEffect } from 'react'
import "./InstructionsView.css";
// import MLReference from '../../assets/MLReference.jpg';


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

    setInterval(() => {
      console.log('Ticking...');
      setState(prev => ({...prev, time: time - 1000}));
    }, 500);
  }, []);

  return (
    <div>
      <div className="InstructionsView__header App__colorScheme--header" >
        <p className="App__colorScheme--message">0:24</p>
        <button className="App__colorScheme--palette"><i className="fas fa-palette"></i></button>
      </div>
      
      {/* <div className="InstructionsView__image--toDraw">
        <img className="InstructionsView__image--reference App__colorScheme--referenceBorder" src={MLReference} alt="Portion of image to draw."></img>
      </div> */}

      <MainImage
      myQuadrant={myQuadrant}/>
      
      {/* <div style={{position:'absolute', top: '50%'}}>
      <CountdownTimer timeInMS={time}/>
      </div> */}
    </div>
  )
}