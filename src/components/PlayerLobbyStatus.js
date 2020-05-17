import React from 'react'

export default function PlayerLobbyStatus(props) {
  return (
    <li>
      {props.username + ' has joined the lobby.'}
      <i className="fas fa-user-minus HostLobbyView__namesList--deleteBtn"></i>
    </li>
  )
}
