import React from 'react'
import NavButton from '../NavButton'
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import "./LandingView.css";;


// subcomponents

export default function LandingView(props) {
  
  const { myUsername, inputChangeHandler, changeViewHandler } = props;

  const placeholder = myUsername ? 'Change your username!' : 'Enter your name!'

  return (
    <div className="scrolling-background">

      <h1 className="LandingView__titleAnimation">Draw-mageddon!</h1>

      <form className="LandingView__container--nameForm">
        <input className="LandingView__form--inputField App__colorScheme--inputField" type="text" id="username" placeholder={placeholder}
        onChange={inputChangeHandler}/>
      </form>

      <div className="LandingView__btnContainer">
        <NavButton
        nextView={'HostLobbyView'}
        buttonTitle={'Create a lobby'}
        changeViewHandler={changeViewHandler}/>

        <NavButton
        nextView={'GuestLobbyView'}
        buttonTitle={'Join a lobby'}
        changeViewHandler={changeViewHandler}/>
      </div>
    </div>
  )
}

// {myUsername ? <h2 style={{color: "red"}}>{`You will play as ${myUsername}`}</h2> : ''}
