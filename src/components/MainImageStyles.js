// constants
const window_h = window.innerHeight;
const window_w = window.innerWidth;

const imgStyles = (key, val) => {
  const style = {
    height: '800px',
    width: '600px',
    transform: 'translate(0, -50%)'
  }
  
  if(key) {
    style[key] = val;
  }
  return style;
}

const imgContainerStyles = (key, val) => {
  const style = {
    height: '400px',
    width: '300px',
    overflow: 'hidden'
  }
  
  if(key) {
    style[key] = val;
  }

  return style;
}

const containerWrapperStyles = (key, val) => {
  const style = {
    height: '100vh',
    width: '100vw',
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
  }
  
  if(key) {
    style[key] = val;
  }

  return style;
}

const MainImageStyles = {
  imgStyles,
  imgContainerStyles,
  containerWrapperStyles
}

export default MainImageStyles;