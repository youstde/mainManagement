import memoizeOne from 'memoize-one'
import isEqual from 'lodash/isEqual'
import Authorized from '@/utils/Authorized'

const { check } = Authorized

// 根据权限处理所有的路由
function ergodicRoutesByAuths(routes, authorities) {
    for (let i = 0; i < routes.length; i += 1) {
        const element = routes[i]
        if (element.name && !element.hideInMenu) {
            // 通过path 生成权限代码， '/a/b/c' --> 'a:b:c'
            const pathArr = element.path.split('/')
            if (pathArr[0] === '') {
                pathArr.shift()
            }
            const code = pathArr.join(':')
            element.code = code
            // 对临时要显示，又没有权限的处理
            if (!element.temp) {
                // 处理路由，没有权限的直接移出
                if (!authorities.includes(`${code}:view`)) {
                    routes.splice(i, 1)
                    i -= 1
                }
            }
        }
        if (element.routes) {
            element.routes = ergodicRoutesByAuths(element.routes, authorities)
        }
    }
    return routes
}

// Conversion router to menu.
function formatter(data /* , parentAuthority */, parentName) {
    return data
        .map(item => {
            if (!item.name || !item.path) {
                return null
            }

            // TODO: 注意这个locale的使用，它使用了name
            let locale = 'menu'
            if (parentName) {
                locale = `${parentName}.${item.name}`
            } else {
                locale = `menu.${item.name}`
            }
            // if enableMenuLocale use item.name,
            // close menu international
            const result = {
                ...item,
                name: item.name,
                locale,
                // authority: item.authority || parentAuthority,
            }
            if (item.routes) {
                const children = formatter(item.routes /* , item.authority */, locale)
                // Reduce memory usage
                result.children = children
            }
            delete result.routes
            return result
        })
        .filter(item => item)
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual)

/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
    // doc: add hideChildrenInMenu
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
        return {
            ...item,
            children: filterMenuData(item.children), // eslint-disable-line
        }
    }
    return item
}

/**
 * filter menuData
 */
const filterMenuData = menuData => {
    if (!menuData) {
        return []
    }
    return menuData
        .filter(item => item.name && !item.hideInMenu)
        .map(item => check(item.authority, getSubMenu(item)))
        .filter(item => item)
}
/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = menuData => {
    const routerMap = {}

    const flattenMenuData = data => {
        data.forEach(menuItem => {
            if (menuItem.children) {
                flattenMenuData(menuItem.children)
            }
            // Reduce memory usage
            routerMap[menuItem.path] = menuItem
        })
    }
    flattenMenuData(menuData)
    return routerMap
}

const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual)

export default {
    namespace: 'menu',

    state: {
        menuData: [],
        routerData: [],
        breadcrumbNameMap: {},
    },

    effects: {
        *getMenuData({ payload }, { put, select }) {
            const { routes } = payload
            const authorities = yield select(state => {
                console.log('state:', state)
                return state.global.authorities
            })
            // 根据获取到的权限处理路由
            const routerData = ergodicRoutesByAuths(routes, authorities)
            // console.log(routes)
            // 将路由处理成菜单，，并缓存
            const originalMenuData = memoizeOneFormatter(routerData)
            // 过滤菜单
            const menuData = filterMenuData(originalMenuData)
            // 过滤面包屑
            const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(originalMenuData)
            yield put({
                type: 'save',
                payload: { menuData, breadcrumbNameMap, routerData },
            })
        },
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                ...action.payload,
            }
        },
    },
}
