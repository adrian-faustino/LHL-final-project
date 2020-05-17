import React from 'react'
import "./LandingView.css";


// subcomponents
import NavButton from '../NavButton'
import { findRenderedComponentWithType } from 'react-dom/test-utils';

export default function LandingView(props) {
  
  const { myUsername, inputChangeHandler, changeViewHandler } = props;

  const placeholder = myUsername ? 'Change your username!' : 'Enter your name!'

  return (
    <div className="main-container">
      <h1 style={{color: "red", fontSize: "14px"}}>LandingView.js</h1>
      <h1 className="title">Draw-mageddon!</h1>

      {myUsername ? <h2>{`You will play as ${myUsername}`}</h2> : ''}
      
      <form className="name-form">
        <input className="name-field" type="text" id="username" placeholder={placeholder}
        onChange={inputChangeHandler}/>
      </form>

      <div className="button-container">
        <NavButton
        nextView={'HostLobbyView'}
        buttonTitle={'Create a lobby'}
        changeViewHandler={changeViewHandler}/>

        <NavButton
        nextView={'GuestLobbyView'}
        buttonTitle={'Join a lobby'}
        changeViewHandler={changeViewHandler}/>
      </div>

      <footer>
        <NavButton
          nextView={''}
          buttonTitle={'About'}
          changeViewHandler={changeViewHandler}/>
        
        <NavButton
        nextView={''}
        buttonTitle={'?'}
        changeViewHandler={changeViewHandler}/>
      </footer>
        
    </div>
  )
}
