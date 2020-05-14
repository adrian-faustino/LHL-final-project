const onMouseDownHandler = (e, state, setState) => {
  const drawing = true;
  
  setState(prev => ({...prev, drawing}));
};


const onMouseUpHandler = (e, state, setState) => {
  const drawing = false;

  setState(prev => ({...prev, drawing}));
};


const onMouseMoveHandler = (e, state, setState, maxWidth, maxHeight) => {
  const { coordinates, drawing, currentColor, currentLineSize } = state;

  if(drawing) {

    // console.log('x, y:', testx, texty);
    // const maxWidth = e.target.offsetWidth;
    // const maxHeight = e.target.offsetHeight;

    // rebuild
    const x_offset = window.innerWidth / 2 - (maxWidth / 2);


    let x = e.clientX - x_offset;
    let y = e.clientY;

    console.log('X ==>', x)
    console.log('Y ==>', y)
  
    // percentage relative to screen
    y = y / maxHeight;
    x = x / maxWidth; //rebuild
    const color = currentColor;
    const lineSize = currentLineSize;
    console.log('ratio:', x, y);

    const coordinate = {
      x,
      y,
      color,
      lineSize
    }
    setState(prev => ({...prev, coordinates: [...coordinates, coordinate], maxWidth, maxHeight}));
  }

};


const draw = (ctx, coordinate) => {
  const { x, y, color, lineSize } = coordinate;

  ctx.strokeStyle = color;
  ctx.lineWidth = lineSize;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.lineTo(x, y);
  ctx.stroke();
};

const drawHelpers = {
  onMouseDownHandler,
  onMouseUpHandler,
  onMouseMoveHandler,
  draw
}

export default drawHelpers;