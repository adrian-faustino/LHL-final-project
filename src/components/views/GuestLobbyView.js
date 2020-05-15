import React, { useState, useEffect } from 'react'
import uuid from 'react-uuid';

// Helpers
import util from '../../helpers/util';



// subcomponents
import PlayerLobbyStatus from '../PlayerLobbyStatus';
import axios from 'axios';

// constants
const API = 'http://localhost:5555';


export default function GuestLobbyView(props) {
  // === big rebuild 
  const { myUsername, socket, lobbyID, myLobbyObj, setMyLobbyObjHandler, setMyPlayerIDHandler, setLobbyIDHandler, changeViewHandler } = props;
  
  const [state, setState] = useState({
    tempInput: '',
    host: '',
    error: ''
  })
  const { tempInput, host, error } = state;
  
  /** Handle when a new user joins lobby **/
  useEffect(() => {
    if(lobbyID) {
      socket.on('/newUserJoined', () => {
        axios.post(API + '/reqLobbyInfo', { lobbyID })
        .then(resp => {
          const { myLobbyObj } = resp.data;
          setMyLobbyObjHandler(myLobbyObj);
        })
        .catch(err => console.log(err));
      })
    }
  }, [lobbyID]);

  /** General Listeners **/
  useEffect(() => {
    socket.on('changeView', nextView => {
      changeViewHandler(nextView);
    })
  }, [])

 
  /** Handle user typing lobbyID to join **/
  const onChangeHandler = e => {
    const tempInput = e.target.value;
    setState(prev => ({...prev, tempInput}));
  };

  /** Handle join lobby **/
  const joinRoomHandler = e => {
    e.preventDefault()
    console.log(`Joining room: ${tempInput}`)
    
    const data = {
      lobbyID: tempInput,
      myUsername
    };
    axios.post(API + '/joinLobby', data)
    .then(resp => {
      const { myLobbyObj, myPlayerID } = resp.data;
      console.log('Guest joined room, ', resp.data);
      setMyPlayerIDHandler(myPlayerID);
      setMyLobbyObjHandler(myLobbyObj);
      setLobbyIDHandler(tempInput);
    })
    .catch(err => {
      console.log('Guest failed to join:', err);
    });
  };
  // === big rebuild

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
        onClick={e => joinRoomHandler(e)}>Join</button>
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
