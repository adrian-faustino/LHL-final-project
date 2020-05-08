import React, { useState, useEffect } from 'react';
import './App.css';

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

  // Socket
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on('welcome', data => {
      console.log('Server says: ' + data)
    })
  }, []);


  /* View State
  * view: this is how we will switch between modes. Conditional rendering based on what * the value of this key will be. 
  * i.e. view: "DrawGameView" -> renders DrawGameView
  * playerType: "HOST" or "GUEST"
  */
  const [state, setState] = useState({
    view: 'LandingView',
    playerType: '',
    username: ''
  });


  // <NavButton /> helper functions
  const changeViewHandler = viewStr => setState({...state, view: viewStr});

  // <LandingView /> helper functions
  const inputChangeHandler = str => {
    const username = str.target.value;
    setState({...state, username})
  };

  return (
    <div className="App">
      <NavButton
      nextView={'LandingView'}
      buttonTitle={'Main Page'}
      changeViewHandler={changeViewHandler}/>

      {state.view === 'LandingView' &&
      <LandingView
      inputChangeHandler={inputChangeHandler}
      changeViewHandler={changeViewHandler}/>}

      {state.view === 'GuestLobbyView' &&
      <GuestLobbyView />}

      {state.view === 'HostLobbyView' &&
      <HostLobbyView
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
