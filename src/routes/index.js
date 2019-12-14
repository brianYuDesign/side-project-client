import { view as Fulllayout } from "../components/layouts"
import themeRoutes from "./routing"
import SwitchRouting from "./SwitchRouting"

const indexRoutes = [{ path: "/", name: "首頁", component: Fulllayout }]

export { indexRoutes, themeRoutes, SwitchRouting }
