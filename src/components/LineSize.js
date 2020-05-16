import React from 'react'

// styles
import './LineSize.css'

export default function LineSize(props) {

  const { updateLineSize, state, setState } = props;


  return (
    <ul className="lineSize--ul">
      <li
      style={{height: 12, width: 12}}
      className="lineSize--li"
      onClick={() => {
        updateLineSize(12, state, setState);
      }}></li>
      
      <li
      style={{height: 24, width: 24}}
      className="lineSize--li"
      onClick={() => {
        updateLineSize(24, state, setState);
      }}></li>

      <li
      style={{height: 36, width: 36}}
      className="lineSize--li"
      onClick={() => {
        updateLineSize(36, state, setState);
      }}></li>

      <li
      style={{height: 48, width: 48}}
      className="lineSize--li"
      onClick={() => {
        updateLineSize(48, state, setState);
      }}></li>
    </ul>
  )
}
