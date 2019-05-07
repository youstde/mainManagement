export function getSession() {
    return localStorage.getItem('admin-session-id')
}

export function setSession(sessionId) {
    localStorage.setItem('admin-session-id', sessionId)
}
