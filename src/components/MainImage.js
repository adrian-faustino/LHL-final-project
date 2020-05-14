import React, { useState } from 'react'

// assets
import IMG_SRC from '../assets/mona-lisa.jpg'

// styles
import './MainImage.css';
import MainImageStyles from './MainImageStyles';

const { imgStyles,
  imgContainerStyles,
  containerWrapperStyles } = MainImageStyles;
  

export default function MainImage(props) {
  const { myQuadrant } = props;

  const [state, setState] = useState({
    isClicked: false
  });
  const { isClicked } = state;

  // constants
  const IMG_CONTAINER_WIDTH = window.innerWidth * 0.7;
  const IMG_CONTAINER_HEIGHT = window.innerHeight * 0.8;
  const IMG_WIDTH = IMG_CONTAINER_HEIGHT * 2;
  const IMG_HEIGHT = IMG_CONTAINER_HEIGHT * 2;

  /*** make shallow copies and modify - fix for strict mode? ***/
  const _imgStyles = imgStyles();
  const _imgContainerStyles = imgContainerStyles();
  const _containerWrapperStyles = containerWrapperStyles();

  const onClickHandler = () => {
    setState(prev => ({...prev, isClicked: !isClicked}));
  }

  if(isClicked) {
    _imgStyles['height'] = '300px';
  }

  return (
    <div style={_containerWrapperStyles}>
      <div style={_imgContainerStyles}>
        <img
        onClick={onClickHandler}
        style={_imgStyles}
        src={IMG_SRC}/>
      </div>
    </div>
  )
}
