import React, { useState, useEffect } from 'react'

export default function GuestLobbyView(props) {

  const [state, setState] = useState({
    tempInput: '',
    lobbyID: '',
    host: ''
  });

  // when this component mounts join a room and when user submits a room ID refire?
  useEffect(() => {
    // wait for user to update lobbyID then attempt to join that lobby
    if(state.lobbyID) {
      props.socket.emit('joinRoom', state.lobbyID);
    }


    //====
  }, [state.lobbyID]);

  // event handlers
  const onChangeHandler = e => setState({...state, tempInput: e.target.value});

  const onSubmitHandler = e => {
    e.preventDefault()
    setState({...state, lobbyID: state.tempInput});
  }

  const onClickHandler = e => {
    e.preventDefault();
    
  }

  // greeting logic
  const username = props.username.trim()
  const greeting = username.length === 0 ? 'Hello!' : `Hello, ${username}!`;

  return (
    <div>
      <h1>Find me at components/GuestLobbyView.js</h1>

      <form>
        <input
        onChange={onChangeHandler}
        placeholder="Enter Lobby ID"/>
        <button
        type="submit"
        onClick={e => onSubmitHandler(e)}>Join</button>
      </form>

      <h1>{greeting}</h1>
      <h2>Welcome to #host's lobby!</h2>
      <h3>Waiting for players to join...</h3>

      <button
      onClick={e => onClickHandler(e)}>{props.readyStatus ? 'Not ready' : 'Ready'}</button>
    </div>
  )
}
