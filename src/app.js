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
    oldRender()
}
