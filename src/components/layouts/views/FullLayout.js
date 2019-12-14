import React, { useState, useEffect, useRef } from "react"
import { flowRight as compose } from "lodash"
import { useQuery } from "react-apollo"
import Header from "./Header"
import Sidebar from "./Sidebar"
import Footer from "./Footer"
import { requireAuth } from "../../auth"
import { themeRoutes, SwitchRouting } from "../../../routes"
import { ME } from "../gql"

const FullLayout = props => {
  const mainWrapper = useRef()
  const [width, setWidth] = useState(window.innerWidth)
  const [settings] = useState([
    {
      theme: "light",
      layout: "vertical",
      dir: "ltr",
      sidebartype: "full",
      sidebarpos: "fixed",
      headerpos: "fixed",
      boxed: "full",
      navbarbg: "skin6",
      sidebarbg: "skin6",
      logobg: "skin6"
    }
  ])

  /*--------------------------------------------------------------------------------*/
  /* Function that handles sidebar, changes when resizing App                       */
  /*--------------------------------------------------------------------------------*/
  const updateDimensions = () => {
    const element = mainWrapper.current
    setWidth(window.innerWidth)

    switch (settings[0].sidebartype) {
      case "full":
      case "iconbar":
        if (width < 1170) {
          element.setAttribute("data-sidebartype", "mini-sidebar")
          element.classList.add("mini-sidebar")
        } else {
          element.setAttribute("data-sidebartype", settings[0].sidebartype)
          element.classList.remove("mini-sidebar")
        }
        break

      case "overlay":
        if (width < 767) {
          element.setAttribute("data-sidebartype", "mini-sidebar")
        } else {
          element.setAttribute("data-sidebartype", settings[0].sidebartype)
        }
        break

      default:
    }
  }

  /*--------------------------------------------------------------------------------*/
  /* Life Cycle Hook, Applies when loading or resizing App                          */
  /*--------------------------------------------------------------------------------*/
  useResize(props.history, updateDimensions, mainWrapper)
  useDimensions(updateDimensions)

  /*--------------------------------------------------------------------------------*/
  /* Theme Setting && Layout Options wiil be Change From Here                       */
  /*--------------------------------------------------------------------------------*/

  const { data } = useQuery(ME)

  // TODO: remove after real auth

  return (
    <div
      ref={mainWrapper}
      id="main-wrapper"
      dir={settings[0].dir}
      data-theme={settings[0].theme}
      data-layout={settings[0].layout}
      data-sidebartype={settings[0].sidebartype}
      data-sidebar-position={settings[0].sidebarpos}
      data-header-position={settings[0].headerpos}
      data-boxed-layout={settings[0].boxed}
    >
      {/*--------------------------------------------------------------------------------*/}
      {/* Header                                                                         */}
      {/*--------------------------------------------------------------------------------*/}
      <Header data={{ settings }} {...props} />
      {/*--------------------------------------------------------------------------------*/}
      {/* Sidebar                                                                        */}
      {/*--------------------------------------------------------------------------------*/}
      <Sidebar
        data={{ settings }}
        {...props}
        routes={themeRoutes(data?.me?.roleFeature?.name)}
      />
      {/*--------------------------------------------------------------------------------*/}
      {/* Page Main-Content                                                              */}
      {/*--------------------------------------------------------------------------------*/}
      <div className="page-wrapper d-block">
        <div className="page-content container-fluid">
          <SwitchRouting role={data?.me?.roleFeature?.name} />
        </div>
        <Footer />
      </div>
    </div>
  )
}

const useResize = (history, updateDimensions, mainWrapper) => {
  useEffect(() => {
    history.listen(() => {
      if (
        window.innerWidth < 767 &&
        mainWrapper.current?.className.indexOf("show-sidebar") !== -1
      ) {
        mainWrapper.current?.classList.toggle("show-sidebar")
      }
    })

    window.addEventListener("load", updateDimensions)
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("load", updateDimensions)
      window.removeEventListener("resize", updateDimensions)
    }
  }, [history, updateDimensions, mainWrapper])
}

const useDimensions = updateDimensions => {
  useEffect(() => {
    updateDimensions()
  }, [updateDimensions])
}

export default compose(requireAuth)(FullLayout)
