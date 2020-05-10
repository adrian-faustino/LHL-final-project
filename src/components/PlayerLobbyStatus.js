import React from 'react'

export default function PlayerLobbyStatus(props) {
  return (
    <div>
      {props.username + ' has joined the lobby.'}
    </div>
  )
}


// copy pasted code: 
{/* <ul className="lobby-name-list">
{playersInLobby}
<li>player 2 <img
  className=""
  src="trash.png"
  alt=""
  onClick={""}
  />
</li>
<li>player 3 <img src="trash.jpg"/></li>
<li>player 4 <img src="trash.jpg"/></li>
</ul> */}