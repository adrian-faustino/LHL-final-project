const togglePalette = (e, state, setState) => {
  e.preventDefault();
  const open = !state.open;
  
  setState({...state, open});
}

const updatePen = (str, state, setState) => {
  console.log('Updating pen...');

}

const paletteHelpers = {
  togglePalette,
  updatePen
};

export default paletteHelpers;