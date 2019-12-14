import React, { useState } from "react"
import BreadcrumbContext from "../BreadcrumbContext"

const BreadcrumbProvider = ({ children }) => {
  const [breadcrumbItems, setBreadcrumbItems] = useState([])

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbItems, setBreadcrumbItems }}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

export default BreadcrumbProvider
