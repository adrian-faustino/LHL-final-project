import React from 'react'

// assets
import IMG_SRC from '../assets/mona-lisa.jpg'

export default function MainImage() {

  return (
    <div style={{color: "red", fontSize: "14px"}}>MainImage.js
      <img
      className={''}
      src={IMG_SRC}
      alt={""}/>
    </div>
  )
}
