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
    playerObj: null,
    lobbyObj: null
  });
  const { lobbyID, players, playerObj, lobbyObj } = state;


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
          socket.on('playerAdd')
        });

      });
    });

    // listeners
    socket.on('userJoinLobby', () => {
      socket.emit('findLobby', { lobbyID });
      socket.on('lobbyFound', lobbyObj => {
        const { players, lobbyID, currentView } = lobbyObj;
        console.log('Updating players array with...', lobbyObj)
        setState(prev => ({...prev, lobbyID, players, lobbyObj}));
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

    return () => {
      console.log('Host unmounted');
      console.log('lobbyID =>', lobbyID)
      socket.emit('lobbyID', { lobbyID });
    }
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
    <div className="scrolling-background">
      <h1 style={{color: "red", fontSize: "14px"}}>HostLobbyView.js</h1>

      <h1 className="HostLobbyView__container--title App__colorScheme--title">{greeting}</h1>
      
      <div className="HostLobbyView__container--IdField">
        <h2 className="App__colorScheme--message">Share this code with your friends:</h2>
        <p className="App__colorScheme--formField">{lobbyID}</p>
      </div>

      {/* Begin: Jason dummy code to style with. Delete when done. */}
      { true &&
        <ul className="HostLobbyView__namesList App__colorScheme--namesList">
          <li>player 2 <i className="fas fa-user-minus HostLobbyView__namesList--deleteBtn"></i></li>
          <li>player 3 <i className="fas fa-user-minus HostLobbyView__namesList--deleteBtn"></i></li>
          <li>player 4 <i className="fas fa-user-minus HostLobbyView__namesList--deleteBtn"></i></li>
        </ul>}
      {/* End: Jason dummy code to style with. Delete when done. */}


      {/* -------NOTE!!!--------- */}
      {/* In HostLobbyView there is the variable "playersList" */}
      {/* and in GuestLobbyView there is the variable "playerList". */}
      {/* It this correct? */}


      {/* Begin: Jason dummy code to style with. Delete "{ false && " and corresponding closing tag. */}
      {false && {playersList}}
      {/* End: Jason dummy code to style with. Delete "{ false && " and corresponding closing tag. */}

      <button
        className="HostLobbyView__btn--start App__colorScheme--button"
        onClick={e => onClickHandler(e)}
        >Start game
      </button>
    </div>
  )
}