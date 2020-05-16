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
  console.log('Time left...', timeLeft)

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
    <div>

      <div style={_timerStyles} className="CountdownTimer--container">
      <span className="CountdownTimer--span minute">{formatted_M}</span>:
      <span className="CountdownTimer--span second">{formatted_S}</span>
      </div>

      {timeLeft <= 0 && (<span className="CountdownTimer--timeUp-container"><div className="CountdownTimer--timeUp-msg">Time's up!</div></span>)}

    </div>
  )
}
