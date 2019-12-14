import React from "react"
import Bread from "./BreadWrapper"

const withBreadcrumb = Component => props => {
  return (
    <div>
      <Bread />
      <Component {...props} />
    </div>
  )
}

export default withBreadcrumb
