import React, { useState, useEffect } from 'react'

// styles
import './CountdownTimer.css';
import CountdownTimerStyles from './CountdownTimerStyles';

// helpers
import countdownHelpers from '../helpers/countdownHelpers';

const { timerStyles } = CountdownTimerStyles;
const { formatZero, formatMS } = countdownHelpers;


export default function CountdownTimer(props) {
  const { timeInMS, warningOn } = props;

  const [state, setState] = useState({
    ROUND_TIME: timeInMS,
    startTime: Date.now(),
  })
  const { ROUND_TIME, startTime } = state;

  // styles
  const _timerStyles = timerStyles();

  /** Timer logic **/
  const timeNow = new Date();
  const elapsed = timeNow - startTime;
  let timeLeft = ROUND_TIME - elapsed;

  /** Trigger 'Time up' screen */
  if(timeLeft <= 0) {
    timeLeft = 0;
  }

  if(timeLeft <= 30000 && warningOn) {
    _timerStyles['animation'] = 'flash--warning 0.4s infinite';
    _timerStyles['animationDirection'] = 'alternate-reverse';
  } 

  const { h, m, s, ms } = formatMS(timeLeft);
  const formatted_M = formatZero(m, 2);
  const formatted_S = formatZero(s, 2);


  return (
    <div className="InstructionsView__header--timer">
      <span 
      style={_timerStyles}
      className="">{formatted_M}:{formatted_S}</span>


      
    </div>
  )
}
    
// {timeLeft <= 0 && (<span className="CountdownTimer__timeUp--container"><div className="CountdownTimer__timeUp--msg">Time's up!</div></span>)}

// <div style={_timerStyles} className="CountdownTimer__container">
//   <span className="">{formatted_M}</span>:<span className="">{formatted_S}</span>
// </div>