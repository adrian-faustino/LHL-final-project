import React, { useState, useEffect } from 'react'

export default function CountdownTimer() {

  const [state, setState] = useState({
    ROUND_TIME: 10000,
    startTime: Date.now(),
  })
  const { ROUND_TIME, startTime } = state;


  const timeNow = new Date();
  const elapsed = timeNow - startTime;
  let timeLeft = ROUND_TIME - elapsed;
  if(timeLeft <= 0) {
    timeLeft = 0;
  }

  console.log('Start time', startTime);

  return (
    <div style={{position: 'absolute', top: 0}}>
      <span>{timeLeft}</span>
      {timeLeft <= 0 ? <span>Time's up!</span> : ''}
    </div>
  )
}
