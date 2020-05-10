import React, { useState, useEffect } from 'react'
import uuid from 'react-uuid'



// subcomponents
import PlayerLobbyStatus from '../PlayerLobbyStatus';

export default function GuestLobbyView(props) {
  const { socket, username, changeViewHandler } = props;

  const [state, setState] = useState({
    playerObj: null,
    lobbyObj: null,
    tempInput: '',
    lobbyID: '',
    host: '',
    players: [],
    error: ''
  })
  const { tempInput, lobbyID, host, players, error, playerObj } = state;


  useEffect(() => {
    // when user joins,, created
    socket.emit('createPlayer', { username, coordinate: [] });
    socket.on('playerCreated', playerObj => {
      setState({...state, playerObj});
    });

    // listeners
    socket.on('err', error => setState({...state, error}));
    socket.on('playerAdded', lobbyObj => {
      const { lobbyID, players, currentView} = lobbyObj;
      const host = players[0];
      setState({...state, lobbyID, players, host});
    });
    socket.on('userJoinLobby', () => {
      socket.emit('findLobby', { lobbyID });
      socket.on('lobbyFound', lobbyObj => {
        const { players, lobbyID, currentView } = lobbyObj;

        console.log('Updating players array with...', lobbyObj);
        setState({...state, players});
      })
    });
  }, []);


  useEffect(() => {
    if(lobbyID) {
      console.log('lobbyID was updated.');
      socket.emit('addToPlayers', { lobbyID, playerObj });
      socket.on('playerAdded', lobbyObj => {
        const { lobbyID, lobbyobj, players } = lobbyObj;

        socket.emit('joinLobby', { lobbyID });
      });
    }
  }, [lobbyID]);


  // event handlers
  const onChangeHandler = e => setState({...state, tempInput: e.target.value});

  // join room logic
  const onSubmitHandler = e => {
    e.preventDefault()
    console.log('Joining room...')
    setState({...state, lobbyID: tempInput});
  }

  const onClickHandler = e => {
    e.preventDefault();
    
  }

  // render logic
  const greeting = username.trim().length === 0 ? 'Hello!' : `Hello, ${username}!`;
  const playerList = players.map(player => <PlayerLobbyStatus key={uuid} username={player}/>);

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
      {host && 
      <h2>Welcome to {host}'s lobby!</h2> &&
      <h3>Waiting for players to join...</h3> &&
      {playerList} &&
      <button
      onClick={e => onClickHandler(e)}>{props.readyStatus ? 'Not ready' : 'Ready'}</button>}
    </div>
  )
}
