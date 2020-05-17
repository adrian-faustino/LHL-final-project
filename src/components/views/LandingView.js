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
      <h1 className="LandingView__container--title App__colorScheme--title">Draw-mageddon!</h1>

      {myUsername ? <h2>{`You will play as ${myUsername}`}</h2> : ''}
      
      <form className="LandingView__container--nameForm">
        <input className="LandingView__form--nameField App__colorScheme--formField" type="text" id="username" placeholder={placeholder}
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

// <footer className="LandingView__about--container">
//         <button className="LandingView__about--button App__colorScheme--button">About</button>
//         <button className="LandingView__about--button App__colorScheme--button">?</button>
//       </footer>