import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import "./GuestLobbyView.css";

// Helpers
import util from '../../helpers/util';
import constants from '../../constants';


// subcomponents
import PlayerLobbyStatus from '../PlayerLobbyStatus';
import axios from 'axios';
import NavButton from '../NavButton';


const { API } = constants;


export default function GuestLobbyView(props) {
  // === big rebuild 
  const { myUsername, socket, lobbyID, myLobbyObj, setMyLobbyObjHandler, setMyPlayerIDHandler, setLobbyIDHandler, changeViewHandler, setGamePromptHandler, myPlayerID } = props;
  
  const [state, setState] = useState({
    tempInput: '',
    host: null,
  })
  const { tempInput, host } = state;
  
  /** Handle when a new user joins lobby **/
  useEffect(() => {
    if(lobbyID) {
      socket.on('newUserJoined', joiner => {
        const prompt = `${joiner} has joined the lobby.`
        setGamePromptHandler(prompt);
        
        axios.post(API + '/reqLobbyInfo', { lobbyID })
        .then(resp => {
          const { myLobbyObj } = resp.data;

          setMyLobbyObjHandler(myLobbyObj);
        })
        .catch(error => {
          setGamePromptHandler(error);
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
      setGamePromptHandler(error);
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

      socket.emit('joinLobby', { lobbyID: tempInput, myUsername });
    })
    .catch(err => {
      const error = err.response.data.err;
      setGamePromptHandler(error);
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
    <div className="scrolling-background">
      <h1 className="GuestLobbyView__container--title App__colorScheme--title">{greeting}</h1>

      {!lobbyID && (
        <form className="GuestLobbyView__container--IdField">
        <input
        className="GuestLobbyView__form--codeInput App__colorScheme--inputField"
        onChange={onChangeHandler}
        placeholder="Enter Lobby ID"/>
        <button
        className="GuestLobbyView__form--btn App__colorScheme--button"
        type="submit"
        onClick={e => joinRoomHandler(e)}>Join</button>
        <NavButton
        nextView={'LandingView'}
        buttonTitle={'Back'}
        changeViewHandler={changeViewHandler}/>
        </form>
      )}

    
      {/** Begin: Render when user has successfully joined a lobby **/}
      {host && (
        <div className="GuestLobbyView__namesList--container">
          <h2 className="App__colorScheme--message">Welcome to {host}'s lobby!</h2>}
        
          
          <ul className="GuestLobbyView__namesList App__colorScheme--namesList">
            {usernames}
          </ul>}


          <h2 className="GuestLobbyView__namesList--message App__colorScheme--message">Waiting for ${host} to start the game...</h2>}
          <button onClick={e => leaveLobbyHandler(e)}>Leave lobby</button>
        </div>)}
      {/** End: Render when user has successfully joined a lobby **/}

      
    </div>
  )
}










       {/* Begin: Jason dummy code to style with and hard code. Delete "{ false && " and corresponding closing tag at bottom. */}
       {/* { false &&
          <form className="GuestLobbyView__container--IdField">
            <input
              className="GuestLobbyView__form--codeInput App__colorScheme--formField"
              type="text"
              id="gameID"
              placeholder="Enter Game ID"
              onChange={onChangeHandler}
            />
            <button
              className="GuestLobbyView__form--btn App__colorScheme--button"
              type="submit"
              onClick={e => onSubmitHandler(e)}
              >Submit ID
            </button>
          </form>
        } */}
        {/* End: Jason dummy code to style with and hard code. Delete "{ false && " and corresponding closing tag at bottom. */}



      // for back button - TO DO LIST
      //   <button
      //   className="GuestLobbyView__btn--cancel App__colorScheme--button"
      //   onClick={e => onClickHandler(e)}
      //   >Cancel
      // </button>