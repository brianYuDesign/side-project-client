import React from "react"
import { Card, CardBody, Button } from "reactstrap"
import PropTypes from "prop-types"

const DashbaordItem = props => {
  return (
    <Card>
      <CardBody className="p-3">
        <div className="d-flex align-items-center content">
          <Button className={`btn-circle text-white ${props.buttonColor}`}>
            <i className={`text-white ${props.iconClass}`} />
          </Button>
          <div className="ml-2">
            <div className="content-text">{props.title}</div>
            <div className="text-muted font-12 ml-auto">{props.content}</div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

DashbaordItem.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  buttonColor: PropTypes.string.isRequired
}

export default DashbaordItem
