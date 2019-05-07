import createAPI from '@/utils/createAPI'

// 获取下载列表
export const getList = async params => {
    return createAPI('/api/v1/receipt/cpcn/history/download/list', 'post', {
        data: params || {},
    })
}

export const xxx = async () => {
    return createAPI('/api/v1/receipt/cpcn/query/list', 'post', {
        data: {},
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
