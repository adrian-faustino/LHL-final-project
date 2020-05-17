import React, { useState, useEffect } from 'react';

// Helpers
import util from '../../helpers/util';
import constants from '../../constants';


// subcomponents
import PlayerLobbyStatus from '../PlayerLobbyStatus';
import axios from 'axios';


const { API } = constants;


export default function GuestLobbyView(props) {
  // === big rebuild 
  const { myUsername, socket, lobbyID, myLobbyObj, setMyLobbyObjHandler, setMyPlayerIDHandler, setLobbyIDHandler, changeViewHandler, setGamePromptHandler, myPlayerID } = props;
  
  const [state, setState] = useState({
    tempInput: '',
    error: '',
    host: null,
  })
  const { tempInput, error, host } = state;
  
  /** Handle when a new user joins lobby **/
  useEffect(() => {
    if(lobbyID) {
      socket.on('newUserJoined', () => {
        console.log('A player joined the lobby!');
        axios.post(API + '/reqLobbyInfo', { lobbyID })
        .then(resp => {
          const { myLobbyObj } = resp.data;
          console.log('Lobby obj====>', myLobbyObj)
          setMyLobbyObjHandler(myLobbyObj);
        })
        .catch(error => {
          setState(prev => ({...prev, error}));
        });
      })
    }
  }, [lobbyID]);

  /** General Listeners **/
  useEffect(() => {
    socket.on('changeView', nextView => {
      changeViewHandler(nextView);
    })

    socket.on('userLeft', data => {
      const { myLobbyObj, leaver } = data;
      const error = `${leaver} has left the lobby.`;
      setState(prev => ({...prev, error}));
      setMyLobbyObjHandler(myLobbyObj);
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
      console.log('Successfully joined room:', resp.data);
      setMyPlayerIDHandler(myPlayerID);
      setMyLobbyObjHandler(myLobbyObj);
      setLobbyIDHandler(tempInput);

      socket.emit('joinLobby', tempInput);
    })
    .catch(err => {
      const error = err.response.data.err;
      setState(prev => ({...prev, error}));
    });
  };

  /** Handle leave lobby **/
  const leaveLobbyHandler = e => {
    e.preventDefault();
    const data = {
      lobbyID,
      myUsername,
      myPlayerID
    }

    // socket.emit('leaveLobby', data)
    axios.post(API + '/leaveLobby', data)
      .then(resp => {
        const { nextView } = resp.data;
        setGamePromptHandler(`You left the lobby.`);
        changeViewHandler(nextView);
      })
      .catch();
  }

  /** Usernames list logic **/
  const greeting = myUsername.trim().length === 0 ? 'Hello!' : `Hello, ${myUsername}!`;


  /** Set host **/
  useEffect(() => {
    if(myLobbyObj) {
      const host = myLobbyObj.host;
      setState(prev => ({...prev, host}));

      socket.on('cancelGame', nextView => {
        setGamePromptHandler(`${host} cancelled the game.`);
        changeViewHandler(nextView);
      })
    }
  }, [myLobbyObj]);

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

      {usernames}
    
      
      {host && <h3>Waiting host to start the game...</h3>}

      {host && <button onClick={e => leaveLobbyHandler(e)}>Leave lobby</button>}
    </div>
  )
}
