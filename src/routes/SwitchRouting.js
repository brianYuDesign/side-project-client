import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { themeRoutes } from "."

const SwitchRouting = ({ role }) => {
  const renderSwitch = (route, key) => {
    return (
      <Switch key={key}>
        <Route path={route.path} component={route.component} key={key} exact />
        {route.subRoutes.map((subRoute, subKey) => (
          <Route
            key={subKey}
            path={subRoute.path}
            component={subRoute.component}
            exact
          />
        ))}
      </Switch>
    )
  }

  return (
    <div>
      {themeRoutes().map((route, key) => {
        if (route.navlabel) {
          return null
        }

        if (route.collapse) {
          return route.child.map((childRoute, childKey) => {
            if (childRoute.collapse) {
              return childRoute.subchild.map((subchildRoute, subchildKey) => (
                <Route
                  path={subchildRoute.path}
                  component={subchildRoute.component}
                  key={subchildKey}
                />
              ))
            }

            return renderSwitch(childRoute, childKey)
          })
        }

        if (route.redirect) {
          return <Redirect from={route.path} to={route.pathTo} key={key} />
        }

        if (!route.subRoutes) {
          return (
            <Route path={route.path} component={route.component} key={key} />
          )
        }

        return renderSwitch(route, key)
      })}
    </div>
  )
}

export default SwitchRouting
