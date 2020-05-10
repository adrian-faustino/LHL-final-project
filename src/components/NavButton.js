import React from 'react'
// import classNames from "classnames";
import "./NavButton.css";

// Notes: COMPLETE for now. Desired functionality tested.

export default function NavButton(props) {
  const onClickHandler = e => {
    e.preventDefault()

    // props.nextView is passed down from the parent component. Change the string that is passed down to this button component to dictate which view to go into next.
    props.changeViewHandler(props.nextView)
  }

  // const buttonClass = classNames({
  //   "btn": true,
  //   "btn-success": true
  // })

  return (
    <div className="lobby-button">
      <button
      className="button"
      onClick={e => onClickHandler(e)}
      >{props.buttonTitle}</button>
    </div>
  )
}




//   let buttonClass = classNames({
//      "button": true,
//      "button--confirm": props.confirm,
//      "button--danger": props.danger
//   });


// copy pasted code:
  // <div className="lobby-button"></div>
  // </div>