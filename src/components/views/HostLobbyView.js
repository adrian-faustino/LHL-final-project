import React, { useState, useEffect } from 'react'
import uuid from 'react-uuid'
import "./HostLobbyView.css";

// subcomponents
import NavButton from '../NavButton'
import PlayerLobbyStatus from '../PlayerLobbyStatus';

// Helpers
import util from '../../helpers/util'

export default function HostLobbyView(props) {
  const { username, socket, changeViewHandler } = props;


  const [state, setState] = useState({
    lobbyID: '',
    players: [],
    playerObj: null
  });
  const { lobbyID, players, playerObj } = state;


  useEffect(() => {
    // establish lobbyID
    const lobbyID = util.generateLobbyID(6);
    setState({...state, lobbyID});

    // requests to DB
    socket.emit('createLobby', { lobbyID }); 
    socket.on('lobbyCreated', () => {
      socket.emit('createPlayer', { username, coordinates: [] });
      socket.on('playerCreated', playerObj => {
        socket.emit('addToPlayers', { lobbyID, playerObj });
        setState({...state, playerObj});

        socket.on('playerAdded', lobbyObj => {
          const { lobbyID, players, currentView } = lobbyObj;
          
          socket.emit('joinLobby', { lobbyID });
        });

      });
    });

    // listeners
    socket.on('userJoinLobby', () => {
      socket.emit('findLobby', { lobbyID });
      socket.on('lobbyFound', lobbyObj => {
        const { players, lobbyID, currentView } = lobbyObj;
        console.log('Updating players array with...', lobbyObj)
        setState({...state, lobbyID, players});
      });
    });

    // socket.on('gameState', data => {
    //   console.log('Received game state:', data)
    //   const { lobbyID, players } = data;
    //   setState({...state, players, lobbyID});
    // });

    socket.on('changeView', data => {
      const { nextView } = data;
      changeViewHandler(nextView);
    });

    // socket.on('playerObj', playerObj => {
    //   setState({...state, playerObj});
    //   socket.emit('addToPlayers', { lobbyID, playerObj });
    //  });

  }, []);


  // event handlers
  const onClickHandler = e => {
    e.preventDefault();

    socket.emit('changeView', { lobbyID, nextView: 'InstructionsView' });
  }


  // render logic
  const greeting = username.trim().length === 0 ? 'Hello!' : `Hello, ${username}!`;
  const playersList = players.map(player => <PlayerLobbyStatus key={util.generateLobbyID(4)} username={player}/>);

  return (
    <div className="main-container">
      <h1 style={{color: "red", fontSize: "14px"}}>HostLobbyView.js</h1>

      <h1 className="title">{greeting}</h1>
      
      <div className="lobby-code-container">
        <h2>Share this code with your friends:</h2>
        <p>{lobbyID}</p>
      </div>

      {playersList}

      <button onClick={e => onClickHandler(e)}>Start game</button>
    </div>
  )
}




// Jason code
{/* <ul className="lobby-name-list">
  {playersList}
  <li>player 2 <img
    className=""
    src="trash.png"
    alt=""
    onClick={""}
    />
  </li>
  <li>player 3 <img src="trash.jpg"/></li>
  <li>player 4 <img src="trash.jpg"/></li>
</ul>

<div className="lobby-button">
  <NavButton
  nextView={'InstructionsView'}
  buttonTitle={'Start game'}
  changeViewHandler={props.changeViewHandler}/>
</div> */}