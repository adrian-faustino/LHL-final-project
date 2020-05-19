// import IMG_SRC from '../../assets/mona-lisa.jpg';
import IMG_SRC from '../../assets/alternate2.jpg'

const silhouetteStyles = (key, val) => {
  const style = {
    transform: 'translate(25%, -25%)'
  };

  if(key) {
    style[key] = val;
  }

  return style;
};

const slicerStyles = (key, val) => {
  const style = {
    height: null,
    width: null
  }

  if(key) {
    style[key] = val;
  }

  return style;
}



const DrawGameViewStyles = {
  silhouetteStyles,
  slicerStyles
}

export default DrawGameViewStyles;