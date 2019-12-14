import "@babel/polyfill"
import "filepond-polyfill"
import React from "react"
import ReactDOM from "react-dom"
import { Route, Switch, HashRouter } from "react-router-dom"
import { indexRoutes } from "./routes"
import App from "./App"
import { Login } from "./components/auth"

import "moment/locale/zh-tw"
import "./assets/scss/style.scss"

import "react-table/react-table.css"
import "react-toastify/dist/ReactToastify.css"
import "react-datetime/css/react-datetime.css"

ReactDOM.render(
  <App>
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} key={key} component={prop.component} />
        })}
      </Switch>
    </HashRouter>
  </App>,
  document.getElementById("root")
)
