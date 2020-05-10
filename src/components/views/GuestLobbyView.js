import React, { useState, useEffect } from 'react'
import uuid from 'react-uuid'



// subcomponents
import PlayerLobbyStatus from '../PlayerLobbyStatus';

export default function GuestLobbyView(props) {
  const { socket, username, changeViewHandler } = props;

  const [state, setState] = useState({
    tempInput: '',
    lobbyID: '',
    host: '',
    players: [],
    error: ''
  })
  const { tempInput, lobbyID, host, players, error } = state;


  useEffect(() => {
    if(lobbyID) {
      // once there is lobby, lets check db if this loby exist, get that obj and set all the things
    }
    
  }, [lobbyID]);
  // ==== rebuild

  useEffect(() => {
    // recieve list of players for rendering
    props.socket.on('playersInLobby', data => {
      const host = data[0].username;
      
      setState({...state, host, playerList: data});
    })

    // listen to host unmount (change view)
    props.socket.on('receiveView', data => {
      props.changeViewHandler(data.nextView)
    })

    // listen for errors
    props.socket.on('err', error => setState({...state, error}))
  }, [])

  // when this component mounts join a room and when user submits a room ID refire?
  useEffect(() => {
    // wait for user to update lobbyID then attempt to join that lobby
    if(state.lobbyID) {
      const data = {lobbyID: state.lobbyID, username: props.username}
      props.socket.emit('joinRoom', data);
    }
  }, [state.lobbyID]);


  // event handlers
  const onChangeHandler = e => setState({...state, tempInput: e.target.value});

  const onSubmitHandler = e => {
    e.preventDefault()
    setState({...state, lobbyID: tempInput});
  }

  const onClickHandler = e => {
    e.preventDefault();
    
  }

  // render logic
  const greeting = username.trim().length === 0 ? 'Hello!' : `Hello, ${username}!`;
  const playerList = players.map(player => <PlayerLobbyStatus key={uuid} username={player.username}/>);

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

      {error && <div>{error}</div>}

      <h1>{greeting}</h1>
      {state.host && 
      <h2>Welcome to {state.host}'s lobby!</h2> &&
      <h3>Waiting for players to join...</h3> &&
      {playerList} &&
      <button
      onClick={e => onClickHandler(e)}>{props.readyStatus ? 'Not ready' : 'Ready'}</button>}
    </div>
  )
}
