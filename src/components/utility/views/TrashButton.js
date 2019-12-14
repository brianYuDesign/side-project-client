import React from "react"
import { Button } from "reactstrap"

const TrashButton = props => {
  return (
    <div style={{ textAlign: "center" }}>
      <Button
        onClick={props.onClick}
        style={props.style}
        size="sm"
        round="true"
        icon="true"
        color="inverse"
      >
        <i className="fa fa-trash" />
      </Button>
    </div>
  )
}

export default TrashButton
