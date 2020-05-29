import constants from '../constants';
const { MIN_RENDER_TIME, CANVAS_W, CANVAS_H, HEIGHT_OFFSET } = constants;


const draw = (ctx, strokeData) => {
  const { _x, _y, color, lineSize } = strokeData;
  
  let globalAlpha = lineSize < 20 ? 0.8 : 0.2; 

  ctx.globalAlpha = globalAlpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = lineSize;
  ctx.lineCap = 'round';
  ctx.strokeStyle = color;
  ctx.lineWidth = lineSize;
  ctx.moveTo(_x, _y - HEIGHT_OFFSET);
  ctx.lineTo(_x, _y - HEIGHT_OFFSET);
  ctx.stroke();
  ctx.closePath();
}

const renderQuad_1 = (ctx, coordinates) => {
  let delay = 0; // for replay feature

  coordinates.forEach(coordinate => {
    const { x, y, color, lineSize } = coordinate;

    // CHANGE SCREEN RATIO HERE
    const _x = (x * 0.5) * CANVAS_W;
    const _y = (y * 0.5) * CANVAS_H;

    const strokeData = {
      _x, _y, color, lineSize
    };
    
    delay += (MIN_RENDER_TIME / coordinates.length) + 3;
    setTimeout(() => {
      ctx.beginPath();
      draw(ctx, strokeData);
    }, delay);
  })
};


const renderQuad_2 = (ctx, coordinates) => {
  let delay = 0; // for replay feature

  coordinates.forEach(coordinate => {
    const { x, y, color, lineSize } = coordinate;

    // CHANGE SCREEN RATIO HERE
    const _x = ( (x * 0.5) + 0.5 ) * CANVAS_W;
    const _y = (y * 0.5) * CANVAS_H;

    const strokeData = {
      _x, _y, color, lineSize
    };
    
    delay += (MIN_RENDER_TIME / coordinates.length) + 3;
    setTimeout(() => {
      ctx.beginPath();
      draw(ctx, strokeData);
    }, delay);
  })
};


const renderQuad_3 = (ctx, coordinates) => {
  let delay = 0; // for replay feature

  coordinates.forEach(coordinate => {
    const { x, y, color, lineSize } = coordinate;

    // CHANGE SCREEN RATIO HERE
    const _x = (x * 0.5) * CANVAS_W;
    const _y = ( (y * 0.5) + 0.5 ) * CANVAS_H;

    const strokeData = {
      _x, _y, color, lineSize
    };
    
    delay += (MIN_RENDER_TIME / coordinates.length) + 3;
    setTimeout(() => {
      ctx.beginPath();
      draw(ctx, strokeData);
    }, delay);
  })
};


const renderQuad_4 = (ctx, coordinates) => {
  let delay = 0; // for replay feature

  coordinates.forEach(coordinate => {
    const { x, y, color, lineSize } = coordinate;

    // CHANGE SCREEN RATIO HERE
    const _x = ( (x * 0.5) + 0.5 ) * CANVAS_W;
    const _y = ( (y * 0.5) + 0.5 ) * CANVAS_H;

    const strokeData = {
      _x, _y, color, lineSize
    };
    
    delay += (MIN_RENDER_TIME / coordinates.length) + 3;
    setTimeout(() => {
      ctx.beginPath();
      draw(ctx, strokeData);
    }, delay);
  })
};


const renderDisconnected = (ctx, quadrant) => {
  let rectX = CANVAS_W;
  let rectY = CANVAS_H;
  let textX = CANVAS_W;
  let textY = CANVAS_H;
  const rectWidth = CANVAS_W / 2;
  const rectHeight = CANVAS_H / 2;

  switch (quadrant) {
    case "quadrant_1":
      rectX *= 0;
      rectY *= 0;
      textX *= 0.25;
      textY *= 0.25;
      break;
    case "quadrant_2":
      rectX *= 0.5;
      rectY *= 0;
      textX *= 0.75;
      textY *= 0.25;
      break;
    case "quadrant_3":
      rectX *= 0;
      rectY *= 0.5;
      textX *= 0.25;
      textY *= 0.75;
      break;
    case "quadrant_4":
      rectX *= 0.5;
      rectY *= 0.5;
      textX *= 0.75;
      textY *= 0.75;
      break;
  }

  ctx.fillStyle = '#363535cb';
  ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
  ctx.fillStyle = '#9a777';
  ctx.font = 'italic bold 20px Fredoka One';
  ctx.textAlign="center"; 
  ctx.textBaseline = "middle";
  ctx.fillText("DISCONNECTED", textX, textY);
}


const renderQuadrants = (ctx, finalCoordinates) => {
  // loop through each quad
  const quadrants = Object.keys(finalCoordinates);

  // console.log('THIS SHOULD ONYL 1')
  // console.log(finalCoordinates)
  // console.log(quadrants)
  quadrants.forEach(quadrant => {
    const coordinates = finalCoordinates[quadrant];

    /** Handle users that DC'ed **/
    if(coordinates.length === 0) {
      
      return renderDisconnected(ctx, quadrant);
    }

    if(quadrant === 'quadrant_1') {
      renderQuad_1(ctx, coordinates);
    } else if(quadrant === 'quadrant_2') {
      renderQuad_2(ctx, coordinates)
    } else if(quadrant === 'quadrant_3') {
      renderQuad_3(ctx, coordinates);
    } else if(quadrant === 'quadrant_4') {
      renderQuad_4(ctx, coordinates);
    }
  })

}
const renderFinalHelpers = {
  renderQuadrants
};

export default renderFinalHelpers;