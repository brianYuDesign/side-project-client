import React from "react"
import { Button } from "reactstrap"
import PropTypes from "prop-types"

const CreateButton = props => {
  return (
    <Button
      className={props.className}
      style={props.style}
      color={props.color || "primary"}
      onClick={props.onClick}
    >
      <div>{props.children}</div>
    </Button>
  )
}

CreateButton.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
}

export default CreateButton
