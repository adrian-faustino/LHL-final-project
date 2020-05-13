import React, { useState, useEffect } from 'react'
import uuid from 'react-uuid'
import "./HostLobbyView.css";

// subcomponents
import NavButton from '../NavButton'
import PlayerLobbyStatus from '../PlayerLobbyStatus';

// Helpers
import util from '../../helpers/util'

export default function HostLobbyView(props) {
  const { username, socket, changeViewHandler, setLobbyHandler, lobbyID, setPlayerObjHandler, setMyQuadrantHandler, setMyLobbyObjHandler, playerObj } = props;


  const [state, setState] = useState({
    players: [],
  });
  const { players } = state;

  // === rebuild
  useEffect(() => {
    socket.on('startGame', data => {
      const { myLobbyObj, nextView } = data;

      setMyLobbyObjHandler(myLobbyObj);
      changeViewHandler(nextView);
    })
  }, [])
  // === rebuild

  useEffect(() => {
    const lobbyID = util.generateLobbyID(6);
    setLobbyHandler(lobbyID);
  }, [])

  useEffect(() => {
    if(lobbyID) {
    // requests to DB
      socket.emit('createLobby', { lobbyID }); 
      socket.on('lobbyCreated', () => {
        socket.emit('createPlayer', { username, coordinates: [] });
        socket.on('playerCreated', playerObj => {
          socket.emit('addToPlayers', { lobbyID, playerObj });
          setPlayerObjHandler(playerObj);

          socket.on('playerAdded', lobbyObj => {
            const { lobbyID, players, currentView } = lobbyObj;
            
            socket.emit('joinLobby', { lobbyID });
            // === rebuild
            socket.on('joinedLobby', data => {
              const { myQuadrant } = data;
              setMyQuadrantHandler(myQuadrant);
            })
            // === rebuild
          });

        });
      });

      // listeners
      socket.on('userJoinLobby', () => {
        socket.emit('findLobby', { lobbyID });
        socket.on('lobbyFound', lobbyObj => {
          const { players, lobbyID, currentView } = lobbyObj;
          console.log('Updating players array with...', lobbyObj)
          setState(prev => ({...prev, players, lobbyObj}));
        });
      });

      socket.on('changeView', data => {
        const { nextView } = data;
        changeViewHandler(nextView);
      });
    }
  }, [lobbyID]);


  // event handlers
  const onClickHandler = e => {
    e.preventDefault();

    // START GAME
    socket.emit('startGame', { lobbyID, nextView: 'InstructionsView' });
  }


  // render logic
  const greeting = username.trim().length === 0 ? 'Hello!' : `Hello, ${username}!`;
  const playerList = players.map(player => <PlayerLobbyStatus key={util.generateLobbyID(4)} username={player}/>);


  return (
    <div className="main-container">
      <h1 style={{color: "red", fontSize: "14px"}}>HostLobbyView.js</h1>

      <h1 className="title">{greeting}</h1>
      
      <div className="lobby-code-container">
        <h2>Share this code with your friends:</h2>
        <p>{lobbyID}</p>
      </div>

      {playerList}

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