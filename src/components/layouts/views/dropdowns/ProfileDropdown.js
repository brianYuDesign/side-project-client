import React, { useState } from "react"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap"
import { useQuery } from "react-apollo"
import customerImage from "../../../../assets/images/avatar/avatar-customer.png"
import { ME } from "../../gql"

const ProfileDropdown = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { data } = useQuery(ME, {
    fetchPolicy: "cache-and-network"
  })

  const performLogout = () => {
    localStorage.setItem("access-token", "")
    localStorage.setItem("exp", "")
    history.push("/login")
  }

  return (
    <Dropdown nav inNavbar isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
      <DropdownToggle nav caret className="pro-pic">
        <img
          src={customerImage}
          alt="user"
          className="rounded-circle"
          width="31"
        />
      </DropdownToggle>
      <DropdownMenu right className="user-dd">
        <div className="d-flex no-block align-items-center p-3 mb-2 border-bottom">
          <div className="">
            <img
              src={customerImage}
              alt="user"
              className="rounded"
              width="80"
            />
          </div>
          <div className="ml-3">
            <h4 className="mb-0">{data?.me?.name}</h4>
            <p className="text-muted mb-0">{data?.me?.email}</p>
            <p className="text-muted mb-0">{data?.me?.roleFeature?.name}</p>
          </div>
        </div>
        <DropdownItem
          onClick={async () => {
            setIsOpen(!isOpen)
            performLogout()
          }}
        >
          <i className="fa fa-power-off mr-1 ml-1" /> 登出
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default ProfileDropdown
