const imgStyles = (key, val) => {
  const style = {
    position: 'relative',
    bottom: '400px',
    right: '300px',
    height: '800px',
    width: '600px'
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
    'justify-content': 'center',
    'align-items': 'center',
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