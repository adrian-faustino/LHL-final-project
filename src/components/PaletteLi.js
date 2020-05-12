import React from 'react'

export default function PaletteLi(props) {
  const { updateLineSize, updateColor } = props;

  const onClickHandler = () => {
    console.log('li clicked!')
  }
  
  return (
    <li
    onClick={onClickHandler}
    className="palette--li">
    </li>
  )
}
