import React, { useState, useEffect } from 'react'
import './Palette.css';

// subcomponents
import PaletteLi from './PaletteLi';

export default function Palette() {


  return (
    <ul className="palette--ul">
      <PaletteLi />
      <PaletteLi />
      <PaletteLi />
      <PaletteLi />
      <PaletteLi />
      <PaletteLi />
      <PaletteLi />
      <PaletteLi />
      <PaletteLi />
      <PaletteLi />
      <PaletteLi />
      <PaletteLi />
    </ul>
  )
}
