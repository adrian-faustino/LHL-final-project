import React, { useEffect } from 'react'

// subcomponents
import NavButton from '../NavButton'
import MainImage from '../MainImage'

export default function InstructionsView(props) {
  const { socket, changeViewHandler, myQuadrant } = props;


  useEffect(() => {
    socket.on('changeView', nextView => {
      changeViewHandler(nextView);
    });
  }, []);

  return (
    <div>
      <h5>Find me at components/InstructionsView.js</h5>

      <h1>Your goal is to draw a picture as a team!</h1>

      <h2>This is your section of the final image. You will have 3 minutes to draw it!</h2>
      
      <MainImage
      myQuadrant={myQuadrant}/>
    </div>
  )
}
