import React from 'react'

export default function PlayerLobbyStatus(props) {
  return (
    <li>
      {props.username + ' has joined the lobby.'}
    </li>
  )
}
