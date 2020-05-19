import React from 'react'
import './PlayerLobbyStatus.css'

export default function PlayerLobbyStatus(props) {
  return (
    <li className="PlayerLobbyStatus__li">
      {props.username + ' is in the lobby.'}
      <i className="fas fa-user-minus HostLobbyView__namesList--deleteBtn"></i>
    </li>
  )
}
