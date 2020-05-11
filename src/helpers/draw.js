const onMouseDownHandler = (e, state, setState) => {
  const drawing = true;

  setState({...state,
    drawing
  });
};


const onMouseUpHandler = (e, state, setState) => {
  const drawing = false;

  setState({...state,
    drawing
  });
};


const onMouseMoveHandler = (e, state, setState) => {
  const { drawing, coordinates } = state;

  if(drawing) {
    console.log('drawing...')
    
    const maxWidth = e.target.offsetWidth;
    const maxHeight = e.target.offsetHeight;
    let x = e.clientX;
    let y = e.clientY;
  
    // percentage relative to screen
    x = x / maxWidth;
    y = y / maxHeight;
    const coordinates = {
      x,
      y
    }
  
    console.log('Mouse drag:', e.clientX, e.clientY);
    console.log('Percent', x, y);
    setState({...state, coordinates}); 
  }

};


const draw = {
  onMouseDownHandler,
  onMouseUpHandler,
  onMouseMoveHandler
}

export default draw;