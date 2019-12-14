import React from "react"
import moment from "moment"
import { Query } from "react-apollo"
import { Link } from "react-router-dom"
import { Row, Col, Card, Badge, Alert, CardBody, CardHeader } from "reactstrap"
import { Spinner } from "components/spinner"

// import { GET_ANNOUNCEMENT_LIST, GET_MAINTAINSERVICES } from "../gql"

const DashboardContainer = () => {
  return (
    <>
      <Row>
        <Col xs={12} sm={6}>
          {/* <Card>
            <CardHeader style={{ background: "#00ACC1", color: "#FFF" }}>

            </CardHeader>
            <CardBody style={{ maxHeight: "60vh", overflowY: "scroll" }}>

            </CardBody>
          </Card> */}
        </Col>
        <Col xs={12} sm={6} md={6}>
          {/* <Card>
              <CardHeader style={{ background: "#00ACC1", color: "#FFF" }}>

              </CardHeader>
              <CardBody style={{ maxHeight: "60vh", overflowY: "scroll" }}>

              </CardBody>
            </Card> */}
        </Col>
      </Row>
    </>
  )
}

export default DashboardContainer
