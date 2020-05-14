import React from 'react'

// assets
import IMG_SRC from '../assets/mona-lisa.jpg'

// styles
import './MainImage.css'

export default function MainImage(props) {
  const { myQuadrant } = props;

  // constants
  const IMG_CONTAINER_WIDTH = window.innerWidth * 0.7;
  const IMG_CONTAINER_HEIGHT = window.innerHeight * 0.8;
  const IMG_WIDTH = IMG_CONTAINER_HEIGHT * 2;
  const IMG_HEIGHT = IMG_CONTAINER_HEIGHT * 2;

  //

  return (
    <div className="MainImage__container-wrapper">
      <div className="MainImage__image-container"width={IMG_CONTAINER_WIDTH}
      height={IMG_CONTAINER_HEIGHT}>
        <img
        className="MainImage__image"
        width={IMG_WIDTH}
        height={IMG_HEIGHT}
        src={IMG_SRC}/>
      </div>
    </div>
  )
}
