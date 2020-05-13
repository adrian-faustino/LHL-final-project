import React, { useState, useEffect } from 'react'
import uuid from 'react-uuid';

// Helpers
import util from '../../helpers/util';


// subcomponents
import PlayerLobbyStatus from '../PlayerLobbyStatus';

export default function GuestLobbyView(props) {
  const { socket, username, changeViewHandler, setLobbyHandler, lobbyID, setPlayerObjHandler, playerObj } = props;

  const [state, setState] = useState({
    lobbyObj: null,
    tempInput: '',
    host: '',
    players: [],
    error: ''
  })
  const { tempInput, host, players, error } = state;

  useEffect(() => {
    socket.on('err', error => {
      setState(prev => ({...prev, error}));
    });

    console.log('GuestLobbyView mounted with lobbyID', lobbyID);

    if (lobbyID) {
      console.log('GuestLobbyView mounted with lobbyID', lobbyID);
      setLobbyHandler(lobbyID);

      socket.emit('createPlayer', { username, coordinate: [] });
      socket.on('playerCreated', playerObj => {
        setPlayerObjHandler(playerObj);

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
          setState(prev => ({...prev, players, host}));
        })
      });

      socket.on('changeView', data => {
        const { nextView } = data;
        changeViewHandler(nextView);
      });
    }
  }, [lobbyID]);


  // event handlers
  const onChangeHandler = e => {
    const tempInput = e.target.value;
    setState(prev => ({...prev, tempInput}));
  };

  // join room logic
  const onSubmitHandler = e => {
    e.preventDefault()
    console.log(`Joining room: ${tempInput}`)
    setLobbyHandler(tempInput);
  };

 
  // render logic
  const greeting = username.trim().length === 0 ? 'Hello!' : `Hello, ${username}!`;
  const playerList = players.map(player => <PlayerLobbyStatus key={util.generateLobbyID(4)} username={player}/>);

  return (
    <div>
      <h1>Find me at components/GuestLobbyView.js!</h1>

      {!lobbyID && (
      <form>
        <input
        onChange={onChangeHandler}
        placeholder="Enter Lobby ID"/>
        <button
        type="submit"
        onClick={e => onSubmitHandler(e)}>Join</button>
      </form>
      )}

      {error && <div>{error}</div>}

      <h1>{greeting}</h1>
      {host && <h2>Welcome to {host}'s lobby!</h2>}
      {playerList}
    
      
      {host && <h3>Waiting host to start the game...</h3>}
    </div>
  )
}
