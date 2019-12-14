import React from "react"
import { Button } from "reactstrap"
import { withRouter } from "react-router"
import PropTypes from "prop-types"

const BackButton = ({ left, history }) => {
  return (
    <Button
      className={left ? "float-left" : "float-right"}
      color="link"
      onClick={() => {
        history.goBack()
      }}
    >
      <div>
        <i className="mdi mdi-keyboard-backspace">回上頁</i>
      </div>
    </Button>
  )
}

BackButton.propTypes = {
  history: PropTypes.object.isRequired,
  left: PropTypes.bool
}

export default withRouter(BackButton)
