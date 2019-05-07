import pathToRegexp from 'path-to-regexp'
import isEqual from 'lodash/isEqual'
import memoizeOne from 'memoize-one'
import { title } from '../defaultSettings'

export const matchParamsPath = (pathname, breadcrumbNameMap) => {
    const pathKey = Object.keys(breadcrumbNameMap).find(key => pathToRegexp(key).test(pathname))
    return breadcrumbNameMap[pathKey]
}
/* eslint-disable */
/* prettier-ignore-start */
// TODO: 这里在动态设置网页的title
const getPageTitle = (pathname, breadcrumbNameMap) => {
    const currRouterData = matchParamsPath(pathname, breadcrumbNameMap)
    if (!currRouterData) {
        return title
    }
    const pageName = currRouterData.name
    // const pageName = menu.disableLocal
    //     ? currRouterData.name
    //     : formatMessage({
    //           id: currRouterData.locale || currRouterData.name,
    //           defaultMessage: currRouterData.name,
    //       })

    return `${pageName} - ${title}`
}
/* prettier-ignore-end */
/* eslint-enable */

export default memoizeOne(getPageTitle, isEqual)
