import React, { useContext } from "react"
import { Breadcrumb, BreadcrumbItem } from "reactstrap"
import { Link } from "react-router-dom"
import BreadcrumbContext from "../BreadcrumbContext"

const BreadWrapper = () => {
  const { breadcrumbItems } = useContext(BreadcrumbContext)

  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <Link to="/dashboard">首頁</Link>
      </BreadcrumbItem>
      {breadcrumbItems.map((item, key) => (
        <BreadcrumbItem key={key}>
          <Link to={item.to}>{item.name}</Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}

export default BreadWrapper
