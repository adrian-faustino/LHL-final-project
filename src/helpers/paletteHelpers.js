const togglePalette = (e, state, setState) => {
  e.preventDefault();
  const open = !state.open;

  setState(prev => ({...prev, open}));
}

const updateColor = (currentColor, state, setState) => {
  console.log('Updating color to', currentColor);

  setState(prev => ({...prev,currentColor}));
}

const updateLineSize = (currentLineSize , state, setState) => {
  console.log('Updating lineSize to', currentLineSize);

  setState(prev => ({...prev, currentLineSize}));
}

const paletteHelpers = {
  togglePalette,
  updateColor,
  updateLineSize
};

export default paletteHelpers;