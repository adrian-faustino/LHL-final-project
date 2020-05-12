const togglePalette = (e, state, setState) => {
  e.preventDefault();
  const open = !state.open;

  setState({...state, open});
}

const updateColor = (currentColor, state, setState) => {
  console.log('Updating color to', currentColor);

  setState({...state, currentColor})
}

const updateLineSize = (currentLineSize , state, setState) => {
  console.log('Updating lineSize to', currentLineSize);

  setState({...state, currentLineSize})
}

const paletteHelpers = {
  togglePalette,
  updateColor,
  updateLineSize
};

export default paletteHelpers;