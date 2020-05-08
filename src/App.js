import React from 'react';
import './App.css';

const API = "http://localhost:5555/test"

function App() {

  fetch(API)
    .then(data => data.json())
    .then(result => console.log(result))

  return (
    <div className="App">
      hey it works again
    </div>
  );
}

export default App;
