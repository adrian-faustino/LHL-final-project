import React from 'react'
import "./LandingView.css";


// subcomponents
import NavButton from '../NavButton'
import { findRenderedComponentWithType } from 'react-dom/test-utils';

export default function LandingView(props) {
  
  return (
    <div className="main-container">
      <h1 style={{color: "red", fontSize: "14px"}}>LandingView.js</h1>
      <h1 className="title">Draw-mageddon!</h1>
      

      <form className="name-form">
        <input className="name-field" type="text" id="username" placeholder="Enter your name"
        onChange={props.inputChangeHandler}/>
      </form>

      <div className="button-container">
        <NavButton
        nextView={'HostLobbyView'}
        buttonTitle={'Create a lobby'}
        changeViewHandler={props.changeViewHandler}/>

        <NavButton
        nextView={'GuestLobbyView'}
        buttonTitle={'Join a lobby'}
        changeViewHandler={props.changeViewHandler}/>
      </div>

      <footer className="about-container">
        <button className="about-instruct-buttons">About</button>
        <button className="about-instruct-buttons">?</button>
      </footer>
        
    </div>
  )
}
