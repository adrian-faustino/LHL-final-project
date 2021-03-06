import React from 'react'
import './Palette.css';


export default function Palette(props) {
  const { updateColor, state, setState } = props;

  return (
    <ul className="Palette__container">

      {/* 1st row */}
      <li onClick={() => {
        updateColor('brown', state, setState);
        }}
        >
        <i id="brownColor" className="fas fa-tint"></i>
      </li>
      
      <li onClick={() => {
        updateColor('silver', state, setState);
        }}
        >
        <i id="silverColor" className="fas fa-tint"></i>
      </li>
      
      <li onClick={() => {
        updateColor('pink', state, setState);
        }}
        >
        <i id="pinkColor" className="fas fa-tint"></i>
      </li>
      
      <li onClick={() => {
        updateColor('green', state, setState);
        }}
        >
        <i id="greenColor" className="fas fa-tint"></i>
      </li>

      {/* 2nd row */}
      <li onClick={() => {
        updateColor('red', state, setState);
        }}
        >
        <i id="redColor" className="fas fa-tint"></i>
      </li>
      
      <li onClick={() => {
        updateColor('orange', state, setState);
        }}
        >
        <i id="orangeColor" className="fas fa-tint"></i>
      </li>
      
      <li onClick={() => {
        updateColor('yellow', state, setState);
        }}
        >
        <i id="yellowColor" className="fas fa-tint"></i>
      </li>
      
      <li onClick={() => {
        updateColor('khaki', state, setState);
        }}
        >
        <i id="khakiColor" className="fas fa-tint"></i>
      </li>
      
      {/* 3rd row */}
      <li onClick={() => {
        updateColor('blue', state, setState);
        }}
        >
        <i id="blueColor" className="fas fa-tint"></i>
      </li>
      
      <li onClick={() => {
        updateColor('violet', state, setState);
        }}
        >
        <i id="violetColor" className="fas fa-tint"></i>
      </li>
      
      <li onClick={() => {
        updateColor('black', state, setState);
        }}
        >
        <i id="blackColor" className="fas fa-tint"></i>
      </li>
      
      <li onClick={() => {
        updateColor('white', state, setState);
        }}
        >
        <i id="whiteColor" className="fas fa-tint"></i>
      </li>

      {/* 4th row */}
      <li onClick={() => {
        updateColor('lightskyblue', state, setState);
        }}
        >
        <i id="lightskyblueColor" className="fas fa-tint"></i>
      </li>
      
      <li onClick={() => {
        updateColor('lightgreen', state, setState);
        }}
        >
        <i id="lightgreenColor" className="fas fa-tint"></i>
      </li>
      
      <li onClick={() => {
        updateColor('purple', state, setState);
        }}
        >
        <i id="purpleColor" className="fas fa-tint"></i>
      </li>
      
      <li onClick={() => {
        updateColor('coral', state, setState);
        }}
        >
        <i id="coralColor" className="fas fa-tint"></i>
      </li>
    </ul>
  )
}

{/* === LINE SIZE === */}
{/* 1st row */}
// <li onClick={() => {
//   updateLineSize(40, state, setState);
//   }}
//   >
//   <i id="sizeXL" className="fas fa-paint-brush"></i>
// </li>

// <li onClick={() => {
//   updateLineSize(30, state, setState);
//   }}
//   >
//   <i id="sizeL" className="fas fa-paint-brush"></i>
// </li>

// <li onClick={() => {
//   updateLineSize(20, state, setState);
//   }}
//   >
//   <i id="sizeM" className="fas fa-paint-brush"></i>
// </li>

// <li onClick={() => {
//   updateLineSize(10, state, setState);
//   }}
//   >
//   <i id="sizeS" className="fas fa-paint-brush"></i>
// </li>