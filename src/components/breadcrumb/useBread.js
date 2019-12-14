import { useEffect, useContext } from "react"
import _ from "lodash"
import BreadcrumbContext from "./BreadcrumbContext"

const useBread = (item, isRootPage = false) => {
  const { breadcrumbItems, setBreadcrumbItems } = useContext(BreadcrumbContext)

  useEffect(() => {
    if (isRootPage) {
      setBreadcrumbItems([item])
      return
    }

    const index = _.findIndex(breadcrumbItems, i => i.to === item.to)

    if (index < 0) {
      setBreadcrumbItems([...breadcrumbItems, item])
    } else {
      setBreadcrumbItems(breadcrumbItems.splice(0, index + 1))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
export default useBread
