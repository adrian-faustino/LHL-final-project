import IMG_SRC from '../../assets/mona-lisa.jpg';

const silhouetteStyles = (key, val) => {
  const style = {
    transform: 'translate(25%, -25%)'
  };

  if(key) {
    style[key] = val;
  }

  return style;
};

const DrawGameViewStyles = {
  silhouetteStyles
}

export default DrawGameViewStyles;