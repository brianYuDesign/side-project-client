import { DashboardContainer } from "../modules/dashboard"

const themeRoutes = () => [
  {
    path: "/dashboard",
    name: "首頁",
    icon: "ti-dashboard",
    component: DashboardContainer
  },
  // {
  //   path: "/banner",
  //   name: "Banner管理",
  //   icon: "mdi mdi-shape-plus",
  //   component: BannerList,
  //   subRoutes: [
  //     {
  //       path: "/banner/detail",
  //       component: BannerDetail
  //     },
  //     {
  //       path: "/banner/detail/:id",
  //       component: BannerDetail
  //     }
  //   ]
  // },
  {
    path: "/",
    pathTo: "/dashboard",
    name: "首頁",
    redirect: true
  }
]

export default themeRoutes
