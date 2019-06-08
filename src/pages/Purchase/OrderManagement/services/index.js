import createAPI from '@/utils/createAPI'

// 获取电子回单列表
// eslint-disable-next-line import/prefer-default-export
export const uploadImg = async params => {
    return createAPI('https://www.mocky.io/v2/5cc8019d300000980a055e76', 'post', {
        data: params || {},
    })
}

export const login = async params => {
    return createAPI('/admin', 'get', {
        params: params || {},
    })
}
