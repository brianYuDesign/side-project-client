import React from "react"
import { Button } from "reactstrap"
import PropTypes from "prop-types"

const SettingButton = props => {
  return (
    <Button
      id={props.id}
      onClick={e => {
        e.preventDefault()
      }}
      style={props.style || { marginTop: "10px" }}
      className={props.className || "float-right"}
      size="sm"
      round="true"
      icon="true"
    >
      <i className="fa fa-cog" />
    </Button>
  )
}

SettingButton.propTypes = {
  id: PropTypes.string.isRequired,
  style: PropTypes.object,
  className: PropTypes.string
}

export default SettingButton
