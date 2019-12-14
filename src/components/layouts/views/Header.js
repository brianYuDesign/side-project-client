import React, { useState } from "react"
import {
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  Collapse
} from "reactstrap"
import ProfileDropdown from "./dropdowns/ProfileDropdown"

/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import logodarkicon from "../../../assets/images/logo-icon.png"
import logolighticon from "../../../assets/images/logo-light-icon.png"
import logodarktext from "../../../assets/images/logo-text.png"
import logolighttext from "../../../assets/images/logo-light-text.png"

const Header = props => {
  const [isOpen, setIsOpen] = useState(false)

  /*--------------------------------------------------------------------------------*/
  /* To open NAVBAR in MOBILE VIEW                                                  */
  /*--------------------------------------------------------------------------------*/
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  /*--------------------------------------------------------------------------------*/
  /* To open SIDEBAR-MENU in MOBILE VIEW                                            */
  /*--------------------------------------------------------------------------------*/
  const showMobilemenu = () => {
    document.getElementById("main-wrapper").classList.toggle("show-sidebar")
  }

  const sidebarHandler = () => {
    const element = document.getElementById("main-wrapper")

    if (element.getAttribute("data-sidebartype") === "full") {
      document.getElementById("logo-text").style.display = "none"
    } else {
      document.getElementById("logo-text").style.display = "inline-block"
    }

    switch (props.data.settings[0].sidebartype) {
      case "full":
      case "iconbar":
        element.classList.toggle("mini-sidebar")
        if (element.classList.contains("mini-sidebar")) {
          element.setAttribute("data-sidebartype", "mini-sidebar")
        } else {
          element.setAttribute(
            "data-sidebartype",
            props.data.settings[0].sidebartype
          )
        }
        break

      case "overlay":
      case "mini-sidebar":
        element.classList.toggle("full")
        if (element.classList.contains("full")) {
          element.setAttribute("data-sidebartype", "full")
        } else {
          element.setAttribute(
            "data-sidebartype",
            props.data.settings[0].sidebartype
          )
        }
        break

      default:
    }
  }

  const detectIE = () => {
    const ua = window.navigator.userAgent

    // Test values; Uncomment to check result …

    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

    // Edge 12 (Spartan)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

    // Edge 13
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

    const msie = ua.indexOf("MSIE ")
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10)
    }

    const trident = ua.indexOf("Trident/")
    if (trident > 0) {
      // IE 11 => return version number
      const rv = ua.indexOf("rv:")
      return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10)
    }

    const edge = ua.indexOf("Edge/")
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10)
    }

    // other browser
    return false
  }

  const isIE = detectIE()

  return (
    <header
      className="topbar navbarbg"
      data-navbarbg={props.data.settings[0].navbarbg}
    >
      <Navbar
        className={
          isIE
            ? "top-navbar-ie "
            : `top-navbar
              ${
                props.data.settings[0].navbarbg === "skin6"
                  ? "navbar-light"
                  : "navbar-dark"
              }`
        }
        expand="md"
      >
        <div
          className="navbar-header"
          id="logobg"
          data-logobg={props.data.settings[0].logobg}
        >
          {/*--------------------------------------------------------------------------------*/}
          {/* Mobile View Toggler  [visible only after 768px screen]                         */}
          {/*--------------------------------------------------------------------------------*/}
          <a
            onClick={showMobilemenu}
            className="nav-toggler text-white d-md-none d-flex justify-content-center align-items-center"
          >
            <i className="ti-menu ti-close" />
          </a>
          {/*--------------------------------------------------------------------------------*/}
          {/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
          {/*--------------------------------------------------------------------------------*/}
          <NavbarBrand href="/">
            <b className="logo-icon">
              <img src={logodarkicon} alt="homepage" className="dark-logo" />
              {/* <img src={logolighticon} alt="homepage" className="light-logo" /> */}
            </b>
            <span id="logo-text" className="logo-text">
              <img src={logodarktext} alt="homepage" className="dark-logo" />
              {/* <img src={logolighttext} className="light-logo" alt="homepage" /> */}
            </span>
          </NavbarBrand>
          {/*--------------------------------------------------------------------------------*/}
          {/* Mobile View Toggler  [visible only after 768px screen]                         */}
          {/*--------------------------------------------------------------------------------*/}
          <a
            className="topbartoggler d-md-none text-white d-flex justify-content-center align-items-center"
            onClick={toggle}
          >
            <i className="ti-more-alt" />
          </a>
        </div>
        <Collapse
          className="navbarbg"
          isOpen={isOpen}
          navbar
          data-navbarbg={props.data.settings[0].navbarbg}
        >
          <Nav className="float-left" navbar>
            <NavItem>
              <NavLink
                href="#"
                className="d-none d-md-block"
                onClick={sidebarHandler}
              >
                <i className="ti-menu" />
              </NavLink>
            </NavItem>
          </Nav>
          <Nav navbar className="ml-auto float-right align-items-center">
            {/*--------------------------------------------------------------------------------*/}
            {/* End Notifications Dropdown                                                     */}
            {/*--------------------------------------------------------------------------------*/}

            <ProfileDropdown history={props.history} />
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  )
}

export default Header
