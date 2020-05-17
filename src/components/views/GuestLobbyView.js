import React, { useState, useEffect } from 'react'
import uuid from 'react-uuid';
import "./GuestLobbyView.css";

// Helpers
import util from '../../helpers/util';
import constants from '../../constants';


// subcomponents
import PlayerLobbyStatus from '../PlayerLobbyStatus';
import axios from 'axios';


const { API } = constants;


export default function GuestLobbyView(props) {
  // === big rebuild 
  const { myUsername, socket, lobbyID, myLobbyObj, setMyLobbyObjHandler, setMyPlayerIDHandler, setLobbyIDHandler, changeViewHandler } = props;
  
  const [state, setState] = useState({
    tempInput: '',
    error: ''
  })
  const { tempInput, error } = state;
  
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
      console.log('Successfully joined room:', resp.data);
      setMyPlayerIDHandler(myPlayerID);
      setMyLobbyObjHandler(myLobbyObj);
      setLobbyIDHandler(tempInput);

      socket.emit('joinLobby', tempInput);
    })
    .catch(err => {
      console.log('Guest failed to join:', err);
    });
  };


  /** Usernames list logic **/
  const greeting = myUsername.trim().length === 0 ? 'Hello!' : `Hello, ${myUsername}!`;

  let usernames;
  let host;
  if(myLobbyObj && myLobbyObj.players) {
    console.log('Updating player list...');
    const playerIDs = Object.keys(myLobbyObj.players);

    usernames = playerIDs.map(playerID => {
      const username = myLobbyObj.players[playerID].username;
      return <PlayerLobbyStatus key={util.generateLobbyID(4)} username={username}/>;
    })

    /** Set host **/
    console.log('Setting host...');
    host = myLobbyObj.host;
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
      </form>
      )}

      <div className="GuestLobbyView__namesList--container">
        {host && <h2 className="App__colorScheme--message">Welcome to {host}'s lobby!</h2>}
        
        {host && <h2 className="GuestLobbyView__namesList--message App__colorScheme--message">Please wait for {host} to start the game...</h2>}
        
        {true &&
          <ul className="GuestLobbyView__namesList App__colorScheme--namesList">
          {usernames}
          </ul>
        }
      </div>
      
      {error && <div style={{color: "red"}}>{error}</div>}
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