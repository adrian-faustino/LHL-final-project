import React from 'react'
import './RoundFinishedBlocker.css';


export default function RoundFinishedBlocker(props) {
  
  const { roundFinished } = props;
  
  let className_ = 'RoundFinishedBlocker__container';
  if(roundFinished) {
    className_ += ' reveal';
  }

  return (
    <div
    className={className_}>
      {roundFinished && <span className="RoundFinishedBlocker__bounce-span">TIME'S UP!</span>}
    </div>
  )
}
