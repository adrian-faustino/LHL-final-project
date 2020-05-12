import React, { useState, useEffect } from 'react'
import uuid from 'react-uuid';
import "./GuestLobbyView.css";

// Helpers
import util from '../../helpers/util';


// subcomponents
import PlayerLobbyStatus from '../PlayerLobbyStatus';

export default function GuestLobbyView(props) {
  const { socket, username, changeViewHandler } = props;

  const [state, setState] = useState({
    playerObj: null,
    lobbyObj: null,
    tempInput: '',
    lobbyID: '',
    host: '',
    players: [],
    error: ''
  })
  const { tempInput, lobbyID, host, players, error, playerObj } = state;

  useEffect(() => {
    socket.on('err', error => setState({...state, error}));

    if (lobbyID) {
      socket.emit('createPlayer', { username, coordinate: [] });
      socket.on('playerCreated', playerObj => {
        setState({...state, playerObj});

        socket.emit('addToPlayers', { lobbyID, playerObj });
        socket.on('playerAdded', lobbyObj => {
          const { lobbyID, lobbyobj, players } = lobbyObj;

          socket.emit('joinLobby', { lobbyID });
        });
      });

      socket.on('userJoinLobby', () => {
        console.log(`A user has joined the lobby: ${lobbyID}`);
        socket.emit('findLobby', { lobbyID });
        socket.on('lobbyFound', lobbyObj => {
          const { players, lobbyID, currentView } = lobbyObj;
  
          console.log('Updating players array with...', lobbyObj);
          const host = players[0];
          
          console.log('Setting host...', host);
          setState({...state, players, host});
        })
      });

      socket.on('changeView', data => {
        const { nextView } = data;
        changeViewHandler(nextView);
      });
    }
  }, [lobbyID]);


  // event handlers
  const onChangeHandler = e => setState({...state, tempInput: e.target.value});

  // join room logic
  const onSubmitHandler = e => {
    e.preventDefault()
    console.log(`Joining room: ${tempInput}`)
    setState({...state, lobbyID: tempInput});
  }

  const onClickHandler = e => {
    e.preventDefault();
    
  }

  // render logic
  const greeting = username.trim().length === 0 ? 'Hello!' : `Hello, ${username}!`;
  const playerList = players.map(player => <PlayerLobbyStatus key={util.generateLobbyID(4)} username={player}/>);

  return (
    <div className="scrolling-background">
      <h1 style={{color: "red", fontSize: "14px"}}>GuestLobbyView.js</h1>
      <h1 className="GuestLobbyView__container--title">{greeting}</h1>

      <div className="GuestLobbyView__container--IdField">
        {/* Begin: Jason dummy code to style with and hard code. Delete "{ false && " and corresponding closing tag at bottom. */}
        { false &&
          <form>
            <input
              className="GuestLobbyView__form--codeInput"
              type="text"
              id="gameID"
              placeholder="Enter Game ID"
              onChange={onChangeHandler}
            />
            <button
              className="GuestLobbyView__form--btn"
              type="submit"
              onClick={e => onSubmitHandler(e)}
              >Submit ID
            </button>
          </form>
        }
        {/* End: Jason dummy code to style with and hard code. Delete "{ false && " and corresponding closing tag at bottom. */}
      </div>

      <div className="GuestLobbyView__namesList--container">
        {/* Begin: Jason dummy code to style with. Delete when done. */}
        {true && <h2>Welcome to "host's" lobby!</h2>}
        {/* End: Jason dummy code to style with. Delete when done. */}
        {/* Begin: Original hard code. Use this but replace "false" with "host". */}
        {false && <h2>Welcome to {host}'s lobby!</h2>}
        {/* End: Original hard code. Use this. */}
      
        {/* Begin: Jason dummy code to style with. Delete when done. */}
        {true && <h3 className="GuestLobbyView__namesList--message">Please wait for other players to join...</h3>}
        {/* End: Jason dummy code to style with. Delete when done. */}
        
        {/* Begin: Original hard code. Use this but replace "false" with "host". */}
        {false && <h3>Please wait for other players to join...</h3> && <button
          onClick={e => onClickHandler(e)}
          >{props.readyStatus ? 'Not ready' : 'Ready'}
          </button>
        }
        {/* End: Original hard code. Use this. */}

        {/* Begin: Jason dummy code to style with. Delete when done. */}
        { true &&
          <ul className="GuestLobbyView__namesList">
            <li>player 2</li>
            <li>player 3</li>
            <li>player 4</li>
          </ul>}
        {/* End: Jason dummy code to style with. Delete when done. */}


        {/* -------NOTE!!!--------- */}
        {/* In HostLobbyView there is the variable "playersList" */}
        {/* and in GuestLobbyView there is the variable "playerList". */}
        {/* It this correct? */}


        {/* Begin: Jason dummy code to style with. Delete "{ false && " and corresponding closing tag. */}
        {false && {playerList}}
        {/* End: Jason dummy code to style with. Delete "{ false && " and corresponding closing tag. */}
      </div>
      
      <button
        className="GuestLobbyView__btn--cancel"
        onClick={e => onClickHandler(e)}
        >Cancel
      </button>



      {/* For error messaging - not sure if we need to worry about this. */}
      {/* Begin: Jason dummy code to style with */}
        {true && <div style={{color: "black", fontSize: "14px"}}>error message - not styled</div>}
      {/* End: Jason dummy code to style with */}
        {error && <div>{error}</div>}

    </div>
  )
}
