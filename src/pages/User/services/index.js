import createAPI from '@/utils/createAPI'

// eslint-disable-next-line import/prefer-default-export
export const login = async params => {
    return createAPI('/admin', 'get', {
        params: params || {},
    })
}

export const logout = async params => {
    return createAPI('/admin', 'get', {
        params: params || {},
    })
}
