import React, { useState } from 'react';
import './App.css';

// View Components
import DrawGameView from './components/views/DrawGameView';
import GuestLobbyView from './components/views/GuestLobbyView';
import HostLobbyView from './components/views/HostLobbyView';
import InstructionsView from './components/views/InstructionsView';
import LandingView from './components/views/LandingView';
import ResultsView from './components/views/ResultsView';
import ShareView from './components/views/ShareView';

function App() {
  const API = "http://localhost:5555/test"
  const [view, setView] = setSate('');


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
