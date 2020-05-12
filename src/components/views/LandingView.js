import React from 'react'
import "./LandingView.css";


// subcomponents
import NavButton from '../NavButton'
import { findRenderedComponentWithType } from 'react-dom/test-utils';

export default function LandingView(props) {
  
  return (
    <div className="LandingView__container">
      <h1 style={{color: "red", fontSize: "14px"}}>LandingView.js</h1>
      <h1 className="LandingView__container--title">Draw-mageddon!</h1>
      

      <form className="LandingView__container--nameForm">
        <input
          className="LandingView__form--nameField"
          type="text"
          id="username"
          placeholder="Enter your name"
          onChange={props.inputChangeHandler}
        />
      </form>

      <div className="LandingView__btnContainer">
        <NavButton
        nextView={'HostLobbyView'}
        buttonTitle={'Create a lobby'}
        changeViewHandler={props.changeViewHandler}/>

        <NavButton
        nextView={'GuestLobbyView'}
        buttonTitle={'Join a lobby'}
        changeViewHandler={props.changeViewHandler}/>
      </div>

      <footer className="LandingView__about--container">
        <button className="LandingView__about--button">About</button>
        <button className="LandingView__about--button">?</button>
      </footer>
        
    </div>
  )
}
