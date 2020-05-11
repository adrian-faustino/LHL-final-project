import React, { useState, useEffect } from 'react'
import uuid from 'react-uuid';
import "./GuestLobbyView.css";


// Helpers
import util from '../../helpers/util';


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
    socket.on('err', error => setState({...state, error}));

    if (lobbyID) {
      socket.emit('createPlayer', { username, coordinate: [] });
      socket.on('playerCreated', playerObj => {
        setState({...state, playerObj});

        socket.emit('addToPlayers', { lobbyID, playerObj });
        socket.on('playerAdded', lobbyObj => {
          const { lobbyID, lobbyobj, players } = lobbyObj;

          socket.emit('joinLobby', { lobbyID });
        });
      });

      socket.on('userJoinLobby', () => {
        console.log(`A user has joined the lobby: ${lobbyID}`);
        socket.emit('findLobby', { lobbyID });
        socket.on('lobbyFound', lobbyObj => {
          const { players, lobbyID, currentView } = lobbyObj;
  
          console.log('Updating players array with...', lobbyObj);
          const host = players[0];
          
          console.log('Setting host...', host);
          setState({...state, players, host});
        })
      });

      socket.on('changeView', data => {
        const { nextView } = data;
        changeViewHandler(nextView);
      });
    }
  }, [lobbyID]);


  // event handlers
  const onChangeHandler = e => setState({...state, tempInput: e.target.value});

  // join room logic
  const onSubmitHandler = e => {
    e.preventDefault()
    console.log(`Joining room: ${tempInput}`)
    setState({...state, lobbyID: tempInput});
  }

  const onClickHandler = e => {
    e.preventDefault();
    
  }

  // render logic
  const greeting = username.trim().length === 0 ? 'Hello!' : `Hello, ${username}!`;
  const playerList = players.map(player => <PlayerLobbyStatus key={util.generateLobbyID(4)} username={player}/>);

  return (
    <div className="main-container">
      <h1 style={{color: "red", fontSize: "14px"}}>GuestLobbyView.js</h1>
      <h1 className="title">{greeting}</h1>

      <form className="id-form">
        <input
        className="id-field"
        onChange={onChangeHandler}
        placeholder="Enter Lobby ID"/>
        <button
        type="submit"
        onClick={e => onSubmitHandler(e)}>Join</button>
      </form>

      {error && <div>{error}</div>}

      
      {host && <h2>Welcome to {host}'s lobby!</h2>}
      {playerList}
    
      
      {host && <h3>Waiting for players to join...</h3> &&
      <button
      onClick={e => onClickHandler(e)}>{props.readyStatus ? 'Not ready' : 'Ready'}</button>}
    </div>
  )
}


// <div className="lobby-code-container">
//       {state.host && <h2 style={{color: "red"}}>Welcome to {state.host}'s lobby!</h2>}
//       <h2>Waiting for players to join...</h2>
//       </div>

//       <ul className="lobby-name-list">
//       {playersInLobby}
//       <li>player 2</li>
//       <li>player 3</li>
//       <li>player 4</li>
//       </ul>
      
//       <div className="lobby-button">
//         <NavButton
//           nextView={'HostLobbyView'}
//           buttonTitle={'Join'}
//           changeViewHandler={props.changeViewHandler}
//         />
//       </div>