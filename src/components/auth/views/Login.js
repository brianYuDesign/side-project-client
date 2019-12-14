import React, { useEffect, useState } from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Form,
  Row,
  Col,
  Button
} from "reactstrap"
import { isMobile } from "react-device-detect"
import { toast } from "react-toastify"

import Auth from "@aws-amplify/auth"

import img1 from "../../../assets/images/logo-icon.png"
import img2 from "../../../assets/images/background/login-register.jpg"

const Login = props => {
  const token = localStorage.getItem("access-token")

  const sidebarBackground = {
    // backgroundImage: `url(${img2})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom center"
  }
  const isOnSideBar = isMobile ? "auth-box" : "auth-box on-sidebar"
  useRedirectToIndex(token, props)

  const onLoginButtonClick = async () => {
    try {
      localStorage.setItem("exp", Date.now() + 1000 * 60 * 60 * 24 * 30)
      localStorage.setItem("access-token", "////gettoken")

      props.history.push("/")
    } catch (error) {
      toast.error(`😣 ${error.message}`)
    }
  }

  return (
    <div className="">
      {/*--------------------------------------------------------------------------------*/}
      {/* Login Cards */}
      {/*--------------------------------------------------------------------------------*/}
      <div
        className="auth-wrapper d-flex no-block justify-content-center align-items-center"
        style={sidebarBackground}
      >
        <div className={isOnSideBar}>
          <div id="loginform">
            <div className="logo move-in-right">
              <span className="db">
                {/* <img src={img1} alt="logo" className="mb-3" /> */}
              </span>
              <h5 className="font-medium mb-3"></h5>
            </div>
            <Row>
              <Col xs="12">
                <Form
                  className="mt-3"
                  id="loginform"
                  onSubmit={e => e.preventDefault()}
                >
                  <InputGroup className="mb-3 move-in-left"></InputGroup>
                  <InputGroup className="mb-3 move-in-left"></InputGroup>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}

const useRedirectToIndex = (token, props) => {
  useEffect(() => {
    if (token !== "" && props?.location.pathname === "/login") {
      props?.history.push("/")
    }
  }, [props, token])
}

export default Login
