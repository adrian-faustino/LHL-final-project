import React, { useState } from 'react';
import './App.css';

// View Components
import DrawGameView from './components/DrawGameView';
import GuestLobbyView from './components/GuestLobbyView';
import HostLobbyView from './components/HostLobbyView';
import InstructionsView from './components/InstructionsView';
import LandingView from './components/LandingView';
import ResultsView from './components/ResultsView';
import ShareView from './components/ShareView';

function App() {
  const API = "http://localhost:5555/test"


  return (
    <div className="App">
      Put modules below
      <DrawGameView />
      <GuestLobbyView />
      <HostLobbyView />
      <InstructionsView />
      <LandingView />
      <ResultsView />
      <ShareView />
    </div>
  );
}

export default App;
