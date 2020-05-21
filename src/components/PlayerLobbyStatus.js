import React from 'react'
import './PlayerLobbyStatus.css'

export default function PlayerLobbyStatus(props) {
  const { isHost } = props;

  return (
    <li className="PlayerLobbyStatus__li">
      {props.username + ' is waiting the lobby.'}
      {isHost && (
        <i className="fas fa-user-minus HostLobbyView__namesList--deleteBtn"></i>)}
    </li>
  )
}
