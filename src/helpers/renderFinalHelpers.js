const renderQuad_1 = (ctx, coordinates) => {
  coordinates.forEach(coordinate => {
    const { x, y, color, lineSize } = coordinate;

    ctx.strokeStyle = color;
    ctx.lineWidth = lineSize;
    ctx.lineCap = 'round';

    const _x = 
    ctx.beginPath();
    ctx.lineTo(x, y);
    ctx.stroke();
  })
};

const renderQuad_2 = (ctx, coordinates) => {

};

const renderQuad_3 = (ctx, coordinates) => {

};

const renderQuad_4 = (ctx, coordinates) => {

};



const renderQuadrants = (ctx, finalCoordinates) => {
  // loop through each quad
  const quadrants = Object.keys(finalCoordinates);

  // console.log('THIS SHOULD ONYL 1')
  // console.log(finalCoordinates)
  // console.log(quadrants)
  quadrants.forEach(quadrant => {
    const coordinates = finalCoordinates[quadrant];

    if(quadrant === 'quadrant_1') {
      renderQuad_1(ctx, coordinates);
    } else if(quadrant === 'quadrant_2') {
      
    
    } else if(quadrant === 'quadrant_3') {

    
    } else if(quadrant === 'quadrant_4') {

    }
  })

}
const renderFinalHelpers = {
  renderQuadrants
};

export default renderFinalHelpers;