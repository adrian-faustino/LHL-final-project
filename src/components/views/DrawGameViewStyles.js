import IMG_SRC from '../../assets/mona-lisa.jpg';

const canvasStyles = (key, val) => {
  const style = {
    background: `url(${IMG_SRC})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'fill'
  };

  if(key) {
    style[key] = val;
  }

  return style;
};

const DrawGameViewStyles = {
  canvasStyles
}

export default DrawGameViewStyles;