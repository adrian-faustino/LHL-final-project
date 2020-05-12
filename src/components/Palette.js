import React, { useState, useEffect } from 'react'
import './Palette.css';

// subcomponents
import PaletteLi from './PaletteLi';

export default function Palette() {

  const [state, setState] = useState({
    open: false
  });
  const { open } = state;

  useEffect(() => {
    console.log('mounted')

  }, [open]);

  const onClickHandler = () => {
    console.log('clicked')
    const open = !state.open;
    setState({...state, open});
  }

  return (
    <ul 
    onClick={onClickHandler}
    className="palette--main">

    {open && (
      <PaletteLi />
    )}
  
    </ul>
  )
}
