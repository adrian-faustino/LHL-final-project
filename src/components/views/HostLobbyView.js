import React, { useState, useEffect } from 'react'

import "./HostLobbyView.css";
import axios from 'axios';

// subcomponents
import NavButton from '../NavButton'
import PlayerLobbyStatus from '../PlayerLobbyStatus';

// Helpers
import util from '../../helpers/util'
import constants from '../../constants';

const { generateLobbyID } = util;
const { API } = constants;

export default function HostLobbyView(props) {
  // ===bigrebuild
  const { myUsername, socket, lobbyID, myLobbyObj, setMyLobbyObjHandler, setMyPlayerIDHandler, setLobbyIDHandler, changeViewHandler } = props;

  /** Handle create lobby **/
  useEffect(() => {
    const genLobbyID = generateLobbyID(6);
    const data = { genLobbyID, myUsername }
    axios.post(API + '/createLobby', data)
      .then(resp => {
        const myLobbyObj = resp.data;
        console.log('Created lobby:', myLobbyObj)
        setMyLobbyObjHandler(myLobbyObj);
        setLobbyIDHandler(genLobbyID);
      })
      .catch(err => console.log(err));
  }, []);

  /** Handle join lobby **/
  useEffect(() => {
    if(lobbyID) {
      console.log('Host joining lobby...');
      const data = { lobbyID, myUsername };
      axios.post(API + '/joinLobby', data)
      .then(resp => {
        const { myLobbyObj, myPlayerID } = resp.data;
        console.log('Successfully joined room:', resp.data);
        setMyPlayerIDHandler(myPlayerID);
        setMyLobbyObjHandler(myLobbyObj);
        
        socket.emit('joinLobby', lobbyID);
      })
      .catch(err => console.log(err));
    }
  }, [lobbyID])

  /** Handle when a new user joins lobby */
  useEffect(() => {
    if(lobbyID) {
      socket.on('newUserJoined', () => {
        console.log('A new user joined!')
        axios.post(API + '/reqLobbyInfo', { lobbyID })
        .then(resp => {
          const { myLobbyObj } = resp.data;
          console.log('Recieved updated lobbyObj:', myLobbyObj)
          setMyLobbyObjHandler(myLobbyObj);
        })
        .catch(err => console.log(err));
      });
    }
  }, [lobbyID]);

  /** General Listeners */
  useEffect(() => {
    socket.on('changeView', nextView => {
      changeViewHandler(nextView);
    })
  }, [])

  /** BACK BUTTON **/
  const backButtonHandler = e => {
    e.preventDefault();
    
    // stretch, remove from db instead of just switching view
    const data = {
      lobbyID,
      nextView: 'LandingView'
    }
    socket.emit('cancelGame', data);
    changeViewHandler(data.nextView);
  }


  /** START GAME BUTTON - add logic later for skip **/
  const startButtonHandler = e => {
    e.preventDefault();
    console.log('Starting game...')
    socket.emit('startGame', { lobbyID, nextView: 'InstructionsView' });
  }


  /** Usernames list logic **/
  const greeting = myUsername.trim().length === 0 ? 'Hello!' : `Hello, ${myUsername}!`;

  let usernames;
  if(myLobbyObj && myLobbyObj.players) {
    console.log('Updating player list...');
    const playerIDs = Object.keys(myLobbyObj.players);

    usernames = playerIDs.map(playerID => {
      const username = myLobbyObj.players[playerID].username;
      return <PlayerLobbyStatus key={util.generateLobbyID(4)} username={username}/>;
    })
  }



  return (
    <div className="main-container">
      <h1 style={{color: "red", fontSize: "14px"}}>HostLobbyView.js</h1>

      <h1 className="title">{greeting}</h1>
      
      <div className="lobby-code-container">
        <h2>Share this code with your friends:</h2>
        <p>{lobbyID}</p>
      </div>

      {usernames}

      <button onClick={e => startButtonHandler(e)}>Start game</button>
      <button onClick={e => backButtonHandler(e)}>Cancel game</button>
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