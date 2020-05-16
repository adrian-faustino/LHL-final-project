const togglePalette = (e, state, setState) => {
  e.preventDefault();
  const openColor = !state.openColor;

  setState(prev => ({...prev, openColor}));
}

const toggleLineSize = (e, state, setState) => {
  e.preventDefault();
  const openLineSize = !state.openLineSize;

  setState(prev => ({...prev, openLineSize}));
}

const updateColor = (currentColor, state, setState) => {
  console.log('Updating color to', currentColor);

  setState(prev => ({...prev, currentColor, openColor: false}));
}

const updateLineSize = (currentLineSize , state, setState) => {
  console.log('Updating lineSize to', currentLineSize);

  setState(prev => ({...prev, currentLineSize, openLineSize: false}));
}

const paletteHelpers = {
  togglePalette,
  toggleLineSize,
  updateColor,
  updateLineSize
};

export default paletteHelpers;