const onMouseOutHandler = (setState) => {
  const drawing = false;

  setState(prev => ({...prev, drawing}));
}

const onMouseDownHandler = (setState) => {
  const drawing = true;
  
  setState(prev => ({...prev, drawing}));
};


const onMouseUpHandler = (setState) => {
  const drawing = false;

  setState(prev => ({...prev, drawing}));
};


const onMouseMoveHandler = (e, state, setState, maxWidth, maxHeight) => {
  const { coordinates, drawing, currentColor, currentLineSize } = state;

  if(drawing) {
    const x_offset = window.innerWidth / 2 - (maxWidth / 2);
    const y_offset = window.innerHeight / 2 - (maxHeight / 2);

    let x = e.clientX - x_offset;
    let y = e.clientY - y_offset;

    // percentage relative to screen
    y = y / maxHeight;
    x = x / maxWidth;
    const color = currentColor;
    const lineSize = currentLineSize;

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

  let globalAlpha = lineSize < 20 ? 0.8 : 0.2; 

  ctx.globalAlpha = globalAlpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = lineSize;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.lineTo(x, y);
  ctx.stroke();
};

const drawHelpers = {
  onMouseOutHandler,
  onMouseDownHandler,
  onMouseUpHandler,
  onMouseMoveHandler,
  draw
}

export default drawHelpers;