import React, { useState, useEffect } from 'react';
import './App.css';

// Socket
import socketIOClient from 'socket.io-client';


// View Components
import DrawGameView from './views/DrawGameView';
import GuestLobbyView from './views/GuestLobbyView';
import HostLobbyView from './views/HostLobbyView';
import InstructionsView from './views/InstructionsView';
import LandingView from './views/LandingView';
import ResultsView from './views/ResultsView';
import ShareView from './views/ShareView';
import NavButton from './NavButton';

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
    readyStatus: false,
    lobbyID: '',
    socket: null
  });

  // Socket
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    // as client joins, set the socket
    setState({...state, socket});

    // receive success messages from socket
    socket.on('success', message => {
      console.log(`Success! ${message}`)
    });

    // receive error messages from socket
    socket.on('err', message => {
      console.log(`Error! ${message}`)
    });
  }, [state.lobbyID]);


  // <NavButton /> helper functions
  const changeViewHandler = viewStr => setState({...state, view: viewStr});

  // <LandingView /> helper functions
  const inputChangeHandler = str => {
    const username = str.target.value;
    setState({...state, username})
  };

  // <GuestLobbyView /> helper functions
  const readyStatusHandler = () => {
    console.log(state.readyStatus + ' ready status')
    setState({...state, readyStatus: !state.readyStatus});
  }

  return (
    <div className="App">
      <NavButton
      nextView={'LandingView'}
      buttonTitle={'Main Page - Delete this button later'}
      changeViewHandler={changeViewHandler}/>

      {state.view === 'LandingView' &&
      <LandingView
      inputChangeHandler={inputChangeHandler}
      changeViewHandler={changeViewHandler}/>}

      {state.view === 'GuestLobbyView' &&
      <GuestLobbyView
      socket={state.socket}
      username={state.username}
      changeViewHandler={changeViewHandler}
      readyStatus={state.readyStatus}
      readyStatusHandler={readyStatusHandler}/>}

      {state.view === 'HostLobbyView' &&
      <HostLobbyView
      socket={state.socket}
      username={state.username}
      changeViewHandler={changeViewHandler}/>}

      {state.view === 'InstructionsView' &&
      <InstructionsView
      changeViewHandler={changeViewHandler}/>}

      {state.view === 'DrawGameView' &&
      <DrawGameView
      changeViewHandler={changeViewHandler}/>}

      {state.view === 'ResultsView' &&
      <ResultsView
      changeViewHandler={changeViewHandler}/>}

      {state.view === 'ShareView' &&
      <ShareView
      changeViewHandler={changeViewHandler}/>}

    </div>
  );
}

export default App;
