import React from 'react'

export default function GuestLobbyView(props) {

  const onClickHandler = e => {
    e.preventDefault();
    props.readyStatusHandler();
  }

  // greeting logic
  const username = props.username.trim()
  const greeting = username.length === 0 ? 'Hello!' : `Hello, ${username}!`;

  return (
    <div>
      <h1>Find me at components/GuestLobbyView.js</h1>

      <h1>{greeting}</h1>
      <h2>Welcome to #host's lobby!</h2>
      <h3>Waiting for players to join...</h3>

      <button onClick={e => onClickHandler(e)}>{props.readyStatus ? 'Not ready' : 'Ready'}</button>
    </div>
  )
}
