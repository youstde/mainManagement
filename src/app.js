import { getAllAuthorities } from '@/services/common'
import { setSession } from '@/utils/session'
import qs from 'qs'

export const dva = {
    config: {
        onError(err) {
            err.preventDefault()
        },
    },
}

let allAuthorities = []

function ergodicRoutes(routes) {
    for (let i = 0; i < routes.length; i += 1) {
        const element = routes[i]

        if (element.routes) {
            ergodicRoutes(element.routes)

            // TODO: hideInMenu的判断是否合适？
        } else if (element.name && !element.hideInMenu) {
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
                if (!allAuthorities.includes(`${code}:view`)) {
                    routes.splice(i, 1)
                    i -= 1
                }
            }
        }
    }
}

export function patchRoutes(routes) {
    ergodicRoutes(routes)
    window.g_routes = routes
}

// 储存sessionId
export function onRouteChange({ location: { query } }) {
    if (query && query.sessionId) {
        setSession(query.sessionId)
    }
}

export function render(oldRender) {
    let { search } = window.location
    if (search) {
        search = search.replace(/\?/, '')
        const { sessionId } = qs.parse(search)

        if (sessionId) {
            setSession(sessionId)
        }
    }

    // 获取权限
    getAllAuthorities().then(res => {
        if (res && res.success) {
            allAuthorities = res.data
            oldRender()
        }
    })

    // 测试用
    // oldRender()
}
