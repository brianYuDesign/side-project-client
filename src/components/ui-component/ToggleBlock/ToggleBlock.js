// import packages
import React from "react"

// import styles
import "./ToggleBlock.scss"

// main components
const ToggleBlock = props => {
  return (
    <>
      <div className={`toggle-block ${props.isOpen ? "show " : "hidden "}`}>
        {props.children}
      </div>
    </>
  )
}

export default ToggleBlock
