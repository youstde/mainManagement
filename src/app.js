import { setSession } from '@/utils/session'
import qs from 'qs'

export const dva = {
    config: {
        onError(err) {
            err.preventDefault()
        },
    },
}

export function patchRoutes(routes) {
    window.g_routes = routes
}

export function onRouteChange({ location: { query } }) {
    // 储存sessionId
    if (query && query.sessionId) {
        setSession(query.sessionId)
    }
}

export function render(oldRender) {
    const { search } = window.location

    if (search) {
        // 老后台跳转新后台时，设置sessionId的方式
        const searchRe = search.replace(/\?/, '')
        const { sessionId } = qs.parse(searchRe)

        if (sessionId) {
            setSession(sessionId)
        }
    }
    oldRender()
}
