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
  const { setGamePromptHandler, myUsername, socket, lobbyID, myLobbyObj, setMyLobbyObjHandler, setMyPlayerIDHandler, setLobbyIDHandler, changeViewHandler } = props;

  const [state, setState] = useState({
    usernames: []
  })

  const { usernames } = state;

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
      .catch(err => {
        console.log(err)
        // const error = err.response.data.err
        // changeViewHandler('LandingView');
        // setGamePromptHandler(error);
      });
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
        
        socket.emit('joinLobby', { lobbyID, myUsername });
      })
      .catch(err => console.log(err));
    }
  }, [lobbyID])

  /** Handle when a new user joins lobby */
  useEffect(() => {
    if(lobbyID) {
      socket.on('newUserJoined', joiner => {
        const prompt = `${joiner} has joined the lobby.`;
        setGamePromptHandler(prompt);
        
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

    socket.on('userLeft', data => {
      const { myLobbyObj, leaver } = data;
      const prompt = `${leaver} has left the lobby.`
      setGamePromptHandler(prompt);
      setMyLobbyObjHandler(myLobbyObj);
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
    // socket.emit('cancelGame', data);
    // socket.emit('disconnectClient', lobbyID)
    // changeViewHandler(data.nextView);


    axios.post(API + '/cancelLobby', data)
    .then(() => {
      socket.emit('disconnectClient', lobbyID);
      changeViewHandler('LandingView');
    })
    .catch(err => console.log(err))
  }


  /** START GAME BUTTON - add logic later for skip **/
  const startButtonHandler = e => {
    e.preventDefault();
    console.log('Starting game...')
    socket.emit('startGame', { lobbyID, nextView: 'InstructionsView' });
  }

  /** COPY lobbyID TO CLIPBOARD **/
  const copyToClipboard = e => {
    const toCopyStr = e.target.innerHTML;
    const tempElement = document.createElement('textarea');

    tempElement.value = toCopyStr;
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand('copy');
    document.body.removeChild(tempElement);

    setGamePromptHandler('Copied to clipboard!');
  }


  /** Usernames list logic **/
  const greeting = myUsername.trim().length === 0 ? 'Hello!' : `Hello, ${myUsername}!`;

  /** Handle usernames list **/
  useEffect(() => {
    if(myLobbyObj && myLobbyObj.players) {
      console.log('Updating player list...');
      const playerIDs = Object.keys(myLobbyObj.players);
  
      const usernames = playerIDs.map(playerID => {
        const username = myLobbyObj.players[playerID].username;
        return <PlayerLobbyStatus key={util.generateLobbyID(4)} username={username}/>;
      });

      setState(prev => ({...prev, usernames}))
    }
  }, [myLobbyObj]);

  return (
    <div className="scrolling-background">
      <h1 className="HostLobbyView__container--title App__colorScheme--title">{greeting}</h1>
      
      <div className="HostLobbyView__container--IdField">
        <h2 className="App__colorScheme--message">Share this code with your friends:</h2>
        <p onMouseDown={e => copyToClipboard(e)} className="App__colorScheme--code">{lobbyID}</p>
      </div>

      <ul className="HostLobbyView__container--namesList App__colorScheme--namesList">
        {usernames}    
      </ul>

 
      <div className="HostLobbyView__container--button">
        <button className="HostLobbyView__btn App__colorScheme--button" onClick={e => startButtonHandler(e)}>Start game</button>
        <button className="HostLobbyView__btn App__colorScheme--button" onClick={e => backButtonHandler(e)}>Cancel game</button>
      </div>
    </div>
  )
}


