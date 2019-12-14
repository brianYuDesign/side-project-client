import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import { Nav, Collapse } from "reactstrap"
import PerfectScrollbar from "react-perfect-scrollbar"

class Sidebar extends Component {
  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }))
  }

  /*--------------------------------------------------------------------------------*/
  /* To Expand SITE_LOGO With Sidebar-Menu on Hover                                 */
  /*--------------------------------------------------------------------------------*/
  expandLogo = () => {
    document.getElementById("logobg").classList.toggle("expand-logo")
  }

  /*--------------------------------------------------------------------------------*/
  /* Verifies if routeName is the one active (in browser input)                     */
  /*--------------------------------------------------------------------------------*/
  activeRoute = routeName => {
    return this.props.location.pathname.indexOf(routeName) > -1
      ? "selected"
      : ""
  }

  state = {
    dropdownOpen: false
  }

  render() {
    return (
      <aside
        className="left-sidebar"
        id="sidebarbg"
        data-sidebarbg={this.props.data.settings[0].sidebarbg}
        onMouseEnter={this.expandLogo}
        onMouseLeave={this.expandLogo}
      >
        <div className="scroll-sidebar">
          <PerfectScrollbar className="sidebar-nav">
            {/*--------------------------------------------------------------------------------*/}
            {/* Sidebar Menus will go here                                                     */}
            {/*--------------------------------------------------------------------------------*/}
            <Nav id="sidebarnav" className="mt-2">
              {this.props.routes.map((prop, key) => {
                if (prop.redirect) {
                  return null
                }
                if (prop.navlabel) {
                  return (
                    <li className="nav-small-cap" key={key}>
                      <i className={prop.icon} />
                      <span className="hide-menu">{prop.name}</span>
                    </li>
                  )
                }
                if (prop.collapse) {
                  const firstdd = {}
                  firstdd[prop.state] = !this.state[prop.state]
                  return (
                    /*--------------------------------------------------------------------------------*/
                    /* Menus will be goes here                                                        */
                    /*--------------------------------------------------------------------------------*/
                    <li
                      className={`${this.activeRoute(prop.path)} sidebar-item`}
                      key={key}
                    >
                      <a
                        data-toggle="collapse"
                        className="sidebar-link has-arrow"
                        aria-expanded={this.state[prop.state]}
                        onClick={() => this.setState(firstdd)}
                      >
                        <i className={prop.icon} />
                        <span className="hide-menu">{prop.name}</span>
                      </a>
                      {/*--------------------------------------------------------------------------------*/}
                      {/* Sub-Menus will be goes here                                                    */}
                      {/*--------------------------------------------------------------------------------*/}
                      <Collapse isOpen={this.state[prop.state]}>
                        <ul className="first-level">
                          {prop.child.map((prop, key) => {
                            if (prop.redirect) return null
                            if (prop.collapse) {
                              const seconddd = {}
                              seconddd[prop.state] = !this.state[prop.state]
                              return (
                                <li
                                  className={`${this.activeRoute(
                                    prop.path
                                  )} sidebar-item`}
                                  key={key}
                                >
                                  <a
                                    data-toggle="collapse"
                                    className="sidebar-link has-arrow"
                                    aria-expanded={this.state[prop.state]}
                                    onClick={() => this.setState(seconddd)}
                                  >
                                    <i className={prop.icon} />
                                    <span className="hide-menu">
                                      {prop.name}
                                    </span>
                                  </a>
                                  {/*--------------------------------------------------------------------------------*/}
                                  {/* Sub-Menus will be goes here                                                    */}
                                  {/*--------------------------------------------------------------------------------*/}
                                  <Collapse isOpen={this.state[prop.state]}>
                                    <ul className="second-level">
                                      {prop.subchild.map((prop, key) => {
                                        if (prop.redirect) return null
                                        return (
                                          <li
                                            className={`${this.activeRoute(
                                              prop.path
                                            )} sidebar-item`}
                                            key={key}
                                          >
                                            <NavLink
                                              to={prop.path}
                                              activeClassName="active"
                                              className="sidebar-link"
                                            >
                                              <i className={prop.icon} />
                                              <span className="hide-menu">
                                                {prop.name}
                                              </span>
                                            </NavLink>
                                          </li>
                                        )
                                      })}
                                    </ul>
                                  </Collapse>
                                </li>
                              )
                            }
                            return (
                              /*--------------------------------------------------------------------------------*/
                              /* Adding Sidebar Item                                                            */
                              /*--------------------------------------------------------------------------------*/
                              <li
                                className={`${this.activeRoute(prop.path) +
                                  (prop.pro
                                    ? " active active-pro"
                                    : "")} sidebar-item`}
                                key={key}
                              >
                                <NavLink
                                  to={prop.path}
                                  className="sidebar-link"
                                  activeClassName="active"
                                >
                                  <i className={prop.icon} />
                                  <span className="hide-menu">{prop.name}</span>
                                </NavLink>
                              </li>
                            )
                          })}
                        </ul>
                      </Collapse>
                    </li>
                  )
                }
                return (
                  /*--------------------------------------------------------------------------------*/
                  /* Adding Sidebar Item                                                            */
                  /*--------------------------------------------------------------------------------*/
                  <li
                    className={`${this.activeRoute(prop.path) +
                      (prop.pro ? " active active-pro" : "")} sidebar-item`}
                    key={key}
                  >
                    <NavLink
                      to={prop.path}
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <span className="hide-menu">{prop.name}</span>
                    </NavLink>
                  </li>
                )
              })}
            </Nav>
          </PerfectScrollbar>
        </div>
      </aside>
    )
  }
}
export default Sidebar
