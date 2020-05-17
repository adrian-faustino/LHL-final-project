import React, { useState, useEffect } from 'react';
import util from './helpers/util';
import "./App.css";

// Socket
import socketIOClient from 'socket.io-client';

// Helpers
import constants from './constants';

// View Components
import DrawGameView from './components/views/DrawGameView';
import GuestLobbyView from './components/views/GuestLobbyView';
import HostLobbyView from './components/views/HostLobbyView';
import InstructionsView from './components/views/InstructionsView';
import LandingView from './components/views/LandingView';
import ResultsView from './components/views/ResultsView';
import ShareView from './components/views/ShareView';
import NavButton from './components/NavButton';


const { API } = constants;


function App() {
  /* View State
  * view: this is how we will switch between modes. Conditional rendering based on what 
  * the value of this key will be. 
  * i.e. view: "DrawGameView" -> renders DrawGameView
  * playerType: "HOST" or "GUEST"
  */
  const [state, setState] = useState({
    view: 'LandingView',
    myUsername: '',
    socket: null,
    lobbyID: null,
    myPlayerID: null,
    myLobbyObj: null,
    myQuadrant: null,
    error: null
  });

  const { view, myUsername, socket, lobbyID, myPlayerID, myLobbyObj, myQuadrant, error } = state;

  /** Set up socket and listeners **/
  useEffect(() => {
    const socket = socketIOClient(API);
    setState(prev => ({...prev, socket}));
    
    util.errorListener(socket);
  }, []);

  /** Reset data when players go back to LandingView **/
  useEffect(() => {
    if(view === 'LandingView') {
      console.log('Back to App ====>')
      setState(prev => {
        return ({...prev,
          lobbyID: null,
          myPlayerID: null,
          myLobbyObj: null,
          myQuadrant: null
        });
      });
    };
  }, [view]);

  const setErrorHandler = error => {
    setState(prev => ({...prev, error}));
  }

  const setMyLobbyObjHandler = myLobbyObj => {
    console.log('Setting App component myLobbyObj to', myLobbyObj);
    setState(prev => ({...prev, myLobbyObj}));
  }

  const setMyPlayerIDHandler = myPlayerID => {
    console.log('Setting App component myPlayerID to', myPlayerID);
    setState(prev => ({...prev, myPlayerID}));
  }

  const setLobbyIDHandler = lobbyID => {
    console.log('Setting App component lobbyID to', lobbyID);
    setState(prev => ({...prev, lobbyID}));
  }
  
  // <NavButton /> helper functions
  const changeViewHandler = view => {
    console.log('Updating view to:', view)
    setState(prev => ({...prev, view}));
  }

  // <LandingView /> helper functions
  const inputChangeHandler = str => {
    const myUsername = str.target.value;
    setState(prev => ({...prev, myUsername}));
  };


  /** Set quadrant for slicing img **/
  useEffect(() => {
    if(myLobbyObj && myPlayerID && myLobbyObj.players) {
      const myQuadrant = myLobbyObj.players[myPlayerID].myQuadrant;

      console.log('UPDATING QUADRANT!');
      setState(prev => ({...prev, myQuadrant}));
    }
  }, [myPlayerID]);
  // === bigrebuild
  

  return (
    <div className="app">
      
      <h2>{error}</h2>

      {state.view === 'LandingView' &&
      <LandingView
      inputChangeHandler={inputChangeHandler}
      changeViewHandler={changeViewHandler}/>}

      {state.view === 'GuestLobbyView' &&
      <GuestLobbyView
      setErrorHandler={setErrorHandler}
      myUsername={state.myUsername}
      socket={socket}
      lobbyID = {lobbyID}
      myLobbyObj={myLobbyObj}
      setMyLobbyObjHandler={setMyLobbyObjHandler}
      setMyPlayerIDHandler={setMyPlayerIDHandler}
      setLobbyIDHandler={setLobbyIDHandler}
      changeViewHandler={changeViewHandler}/>}

      {state.view === 'HostLobbyView' &&
      <HostLobbyView
      myUsername={myUsername}
      socket={socket}
      lobbyID = {lobbyID}
      myLobbyObj={myLobbyObj}
      setMyLobbyObjHandler={setMyLobbyObjHandler}
      setMyPlayerIDHandler={setMyPlayerIDHandler}
      setLobbyIDHandler={setLobbyIDHandler}
      changeViewHandler={changeViewHandler}/>}

      {state.view === 'InstructionsView' &&
      <InstructionsView
      myQuadrant={myQuadrant}
      socket={state.socket}
      changeViewHandler={changeViewHandler}/>}

      {state.view === 'DrawGameView' &&
      <DrawGameView
      myLobbyObj={state.myLobbyObj}
      myQuadrant={myQuadrant}
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
