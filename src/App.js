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

  /* View State
  * view: this is how we will switch between modes. Conditional rendering based on what 
  * the value of this key will be. 
  * i.e. view: "DrawGameView" -> renders DrawGameView
  * playerType: "HOST" or "GUEST"
  */
  const [state, setState] = useState({
    view: 'LandingView',
    playerType: '',
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
    })
    //====

   // as client joins, receive name request
   socket.on('nameReq', () => {
     console.log('Server is asking for name!')
     socket.emit('nameRes', state.username)
   })

    // to join a specific lobby...
    // param1 is the name of the event, param2 is the lobby name
    socket.emit('joinRoom', state.lobbyID)

    socket.on('lobby_join_success', data => {
      console.log('Lobby joined?' + data)
    })
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
