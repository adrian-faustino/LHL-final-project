import React, { useState, useEffect } from 'react'
import uuid from 'react-uuid'
import "./HostLobbyView.css";
import axios from 'axios';

// subcomponents
import NavButton from '../NavButton'
import PlayerLobbyStatus from '../PlayerLobbyStatus';

// Helpers
import util from '../../helpers/util'

const { generateLobbyID } = util;

// constants
const API = 'http://localhost:5555';

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
        console.log('Host: joined room:', resp.data);
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
        axios.post(API + '/reqLobbyInfo', { lobbyID })
        .then(resp => {
          const { myLobbyObj } = resp.data;
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


  /** START GAME BUTTON - add logic later for skip **/
  const onClickHandler = e => {
    e.preventDefault();
    socket.emit('startGame', { lobbyID, nextView: 'InstructionsView' });
  }


  /** Usernames list logic **/
  const usernameList = [];
  if(myLobbyObj) {
    const players = myLobbyObj.players;
    for(let player in players) {
      usernameList.push(player.username);
    }
  }


  // render logic
  const greeting = myUsername.trim().length === 0 ? 'Hello!' : `Hello, ${myUsername}!`;
  const playerList = usernameList.map(username => <PlayerLobbyStatus key={util.generateLobbyID(4)} username={username}/>);

  // === big rebuild
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