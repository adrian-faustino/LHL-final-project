import React from 'react'

// assets
import IMG_SRC from '../assets/mona-lisa.jpg'

// styles
import './MainImage.css';
import MainImageStyles from './MainImageStyles';

const { imgStyles,
  imgContainerStyles,
  containerWrapperStyles } = MainImageStyles;
  

export default function MainImage(props) {
  const { myQuadrant, draggable } = props;

  /*** make shallow copies and modify - fix for strict mode? ***/
  const _imgStyles = imgStyles();
  const _imgContainerStyles = imgContainerStyles();
  const _containerWrapperStyles = containerWrapperStyles();
  

  if(myQuadrant === 'quadrant_1') {
    _imgStyles['transform'] = 'translate(0, 0)';
  } else if(myQuadrant === 'quadrant_2') {
    _imgStyles['transform'] = 'translate(-50%, 0)';
  } else if(myQuadrant === 'quadrant_3') {
    _imgStyles['transform'] = 'translate(0, -50%)';
  } else if(myQuadrant === 'quadrant_4') {
    _imgStyles['transform'] = 'translate(-50%, -50%)';
  }


  return (
    <div style={_containerWrapperStyles}>
      <div className="MainImage__reference" style={_imgContainerStyles}>
        <img
        className={"MainImage__IMG"}
        draggable={draggable}
        style={_imgStyles}
        src={IMG_SRC}/>
      </div>
    </div>
  )
}
