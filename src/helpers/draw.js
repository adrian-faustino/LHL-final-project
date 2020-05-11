const onMouseDownHandler = (e, state, setState) => {
  const maxWidth = e.target.offsetWidth;
  const maxHeight = e.target.offsetHeight;
  const x = e.clientX;
  const y = e.clientY;

  // percentage relative to screen
  const x_percent = x / maxWidth;
  const y_percent = y / maxHeight;

  // console.log('Mouse down:', e.clientX, e.clientY);
  // console.log('Offset size:', e.target.offsetWidth, e.target.offsetHeight);
  console.log('Percent', x_percent, y_percent);
};


const onMouseUpHandler = (e, state, setState) => {
  // console.log('Mouse up:', e.clientX, e.clientY);
};


const onChangeHandler = (e, state, setState) => {
  console.log('Mouse drag:', e.clientX, e.clientY);
};


const draw = {
  onMouseDownHandler,
  onMouseUpHandler,
  onChangeHandler
}

export default draw;