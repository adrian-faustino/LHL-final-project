import React from 'react'

// styles
import './LineSize.css'

export default function LineSize(props) {

  const { updateLineSize, state, setState } = props;


  return (
    <ul className="LineSize__container">
      
    
      <li onClick={() => {
        updateLineSize(80, state, setState);
        }}>
        <i id="sizeXL" className="fas fa-paint-brush"></i>
      </li>

      <li onClick={() => {
        updateLineSize(45, state, setState);
        }}>
        <i id="sizeL" className="fas fa-paint-brush"></i>
      </li>

      <li onClick={() => {
        updateLineSize(20, state, setState);
        }}>
        <i id="sizeM" className="fas fa-paint-brush"></i>
      </li>

      <li onClick={() => {
        updateLineSize(6, state, setState);
        }}>
        <i id="sizeS" className="fas fa-paint-brush"></i>
      </li>
    </ul>
  )
}
