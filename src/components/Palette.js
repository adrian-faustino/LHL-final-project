import React from 'react'
import './Palette.css';


export default function Palette(props) {
  const { updateColor, state, setState } = props;



  return (
    <ul className="palette--ul">

      {/* === LINE SIZE === */}

      {/* 1st row */}
      {/* <li onClick={() => {
        updateLineSize(40, state, setState);
      }}
      className="palette--li forty"></li>
      
      <li onClick={() => {
        updateLineSize(30, state, setState);
      }}
      className="palette--li thirty"></li>
      
      <li onClick={() => {
        updateLineSize(20, state, setState);
      }}
      className="palette--li twenty"></li>
      
      <li onClick={() => {
        updateLineSize(10, state, setState);
      }}
      className="palette--li ten"></li> */}
      

      {/* === COLORS === */}

      {/* 2nd row */}
      <li onClick={() => {
        updateColor('red', state, setState);
      }}
      className="palette--li red"></li>
      
      <li onClick={() => {
        updateColor('orange', state, setState);
      }}
      className="palette--li orange"></li>
      
      <li onClick={() => {
        updateColor('yellow', state, setState);
      }}
      className="palette--li yellow"></li>
      
      <li onClick={() => {
        updateColor('green', state, setState);
      }}
      className="palette--li green"></li>
      
      {/* 3rd row */}
      <li onClick={() => {
        updateColor('blue', state, setState);
      }}
      className="palette--li blue"></li>
      
      <li onClick={() => {
        updateColor('violet', state, setState);
      }}
      className="palette--li violet"></li>
      
      <li onClick={() => {
        updateColor('black', state, setState);
      }}
      className="palette--li black"></li>
      
      <li onClick={() => {
        updateColor('white', state, setState);
      }}
      className="palette--li white"></li>
      
      
      
    </ul>
  )
}
