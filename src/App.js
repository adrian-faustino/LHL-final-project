import React, { useState, useEffect } from 'react';
import util from './helpers/util';
import "./App.css";

// Socket
import socketIOClient from 'socket.io-client';

// View Components
import DrawGameView from './components/views/DrawGameView';
import GuestLobbyView from './components/views/GuestLobbyView';
import HostLobbyView from './components/views/HostLobbyView';
import InstructionsView from './components/views/InstructionsView';
import LandingView from './components/views/LandingView';
import ResultsView from './components/views/ResultsView';
import ShareView from './components/views/ShareView';
import NavButton from './components/NavButton';

function App() {

  // constants
  const ENDPOINT = "http://localhost:5555"

  /* View State
  * view: this is how we will switch between modes. Conditional rendering based on what 
  * the value of this key will be. 
  * i.e. view: "DrawGameView" -> renders DrawGameView
  * playerType: "HOST" or "GUEST"
  */
  const [state, setState] = useState({
    view: 'LandingView',
    username: '',
    socket: null,
    lobbyID: null,
    playerObj: null,
    myQuadrant: null,
    myLobbyObj: null
  });

  // Socket
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    // as client joins, set the socket
    setState(prev => ({...prev, socket}));

    // listeners
    util.errorListener(socket);
    socket.on('lobbyID', data => {
      const { lobbyID } = data;
      console.log(`Setting lobbyID to ${lobbyID} in App.js`)
      setState(prev => ({...prev, lobbyID}));
    })
  }, []);


  // <NavButton /> helper functions
  const changeViewHandler = view => {
    setState(prev => ({...prev, view}));
  }

  // <LandingView /> helper functions
  const inputChangeHandler = str => {
    const username = str.target.value;
    setState(prev => ({...prev, username}));
  };

  const setLobbyHandler = lobbyID => {
    console.log('Setting App component lobbyID to', lobbyID);
    setState(prev => ({...prev, lobbyID}));
  }

  const setPlayerObjHandler = playerObj => {
    console.log('Setting App component playerObj to',playerObj)
    setState(prev => ({...prev, playerObj}));
  }
  
  const setMyLobbyObjHandler = myLobbyObj => {
    console.log('Setting App component myLobbyObj to', myLobbyObj);
    setState(prev => ({...prev, myLobbyObj}));
  }

  const setMyQuadrantHandler = myQuadrant => {
    console.log('Setting App component myQuadrant to', myQuadrant);
    setState(prev => ({...prev, myQuadrant}));
  }

  // <NavButton
  // nextView={'LandingView'}
  // buttonTitle={'Main Page - Delete this button later'}
  // changeViewHandler={changeViewHandler}/>
  return (
    <div className="app">

      {state.view === 'LandingView' &&
      <LandingView
      inputChangeHandler={inputChangeHandler}
      changeViewHandler={changeViewHandler}/>}

      {state.view === 'GuestLobbyView' &&
      <GuestLobbyView
      lobbyID = {state.lobbyID}
      playerObj={state.playerObj}
      setMyLobbyObjHandler={setMyLobbyObjHandler}
      setMyQuadrantHandler={setMyQuadrantHandler}
      setPlayerObjHandler={setPlayerObjHandler}
      setLobbyHandler={setLobbyHandler}
      socket={state.socket}
      username={state.username}
      changeViewHandler={changeViewHandler}/>}

      {state.view === 'HostLobbyView' &&
      <HostLobbyView
      lobbyID = {state.lobbyID}
      setMyLobbyObjHandler={setMyLobbyObjHandler}
      setMyQuadrantHandler={setMyQuadrantHandler}
      setPlayerObjHandler={setPlayerObjHandler}
      setLobbyHandler={setLobbyHandler}
      socket={state.socket}
      username={state.username}
      changeViewHandler={changeViewHandler}/>}

      {state.view === 'InstructionsView' &&
      <InstructionsView
      myQuadrant={state.myQuadrant}
      lobbyID={state.lobbyID}
      username={state.username}
      socket={state.socket}
      changeViewHandler={changeViewHandler}/>}

      {state.view === 'DrawGameView' &&
      <DrawGameView
      view={state.view}
      myLobbyObj={state.myLobbyObj}
      myQuadrant={state.myQuadrant}
      playerObj={state.playerObj}
      socket={state.socket}
      lobbyID={state.lobbyID}
      changeViewHandler={changeViewHandler}/>}

      {state.view === 'ResultsView' &&
      <ResultsView
      socket={state.socket}
      changeViewHandler={changeViewHandler}/>}

      {state.view === 'ShareView' &&
      <ShareView
      changeViewHandler={changeViewHandler}/>}

    </div>
  );
}

export default App;
