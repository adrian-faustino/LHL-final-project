const togglePalette = (e, state, setState) => {
  e.preventDefault();
  const open = !state.open;

  setState({...state, open});
}

const updateColor = (color, state, setState) => {
  console.log('Updating color to', color);

}

const updateLineSize = (lineSize , state, setState) => {
  console.log('Updating lineSize to', lineSize);
}

const paletteHelpers = {
  togglePalette,
  updateColor,
  updateLineSize
};

export default paletteHelpers;