import React, { useEffect } from 'react'
import "./InstructionsView.css";
import MLReference from '../../assets/MLReference.jpg';

// subcomponents
import NavButton from '../NavButton'
import MainImage from '../MainImage'

export default function InstructionsView(props) {
  const { username, socket, changeViewHandler, lobbyID } = props;

  useEffect(() => {
    if(lobbyID) {
      console.log('Mounted lobby ', lobbyID);
      socket.emit('viewTimeout', { lobbyID });
  
      socket.on('changeView', data => {
        const { nextView } = data;
        changeViewHandler(nextView);
      });
    }
  }, [lobbyID]);


  // helpers
  const onClickHandler = e => {
    e.preventDefault()

    console.log('Ready button clicked.');
    socket.emit('readyOK', { username }); // lobbyID here
  }

  return (
    <div>

      {/* <h1 style={{color: "red", fontSize: "14px"}}>InstructionsView.js</h1> */}
      <div className="InstructionsView__header App__colorScheme--header" >
        <p className="App__colorScheme--message">0:24</p>
        <button className="App__colorScheme--palette"><i className="fas fa-palette"></i></button>
      </div>
      
      <div className="InstructionsView__image--toDraw">
        <img className="InstructionsView__image--reference App__colorScheme--referenceBorder" src={MLReference} alt="Portion of image to draw."></img>
      </div>


      {/* <MainImage /> */}

      {/* {state.playerAmt && <span>Players required to skip: {state.playerAmt}</span>}
      <button onClick={e => onClickHandler(e)}>Ready!</button> */}
      {/* <NavButton
      nextView={'DrawGameView'}
      buttonTitle={'Skip'}
      changeViewHandler={props.changeViewHandler}/> */}

    </div>
  )
}