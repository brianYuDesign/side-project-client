import React from "react"
import Login from "./Login"

const requiredAuth = Component => props => {
  const token = localStorage.getItem("access-token")
  const exp = localStorage.getItem("exp")

  if (!token || !exp || Date.now() > exp) {
    return <Login {...props} />
  }

  return (
    <>
      <Component {...props} />
    </>
  )
}

export default requiredAuth
