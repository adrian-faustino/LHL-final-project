import React from 'react'

// styles
import './LineSize.css'

export default function LineSize(props) {

  const { updateLineSize, state, setState } = props;


  return (
    <ul className="LineSize__container">
      
    
      <li onClick={() => {
        updateLineSize(48, state, setState);
        }}>
        <i id="sizeXL" className="fas fa-paint-brush"></i>
      </li>

      <li onClick={() => {
        updateLineSize(36, state, setState);
        }}>
        <i id="sizeL" className="fas fa-paint-brush"></i>
      </li>

      <li onClick={() => {
        updateLineSize(24, state, setState);
        }}>
        <i id="sizeM" className="fas fa-paint-brush"></i>
      </li>

      <li onClick={() => {
        updateLineSize(12, state, setState);
        }}>
        <i id="sizeS" className="fas fa-paint-brush"></i>
      </li>
    </ul>
  )
}
