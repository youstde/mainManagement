import createAPI from '@/utils/createAPI'

// 获取电子回单列表
export const getReceiptList = async params => {
    return createAPI('/api/v1/receipt/cpcn/query/list', 'post', {
        data: params || {},
    })
}

// 预下载电子回单
export const downloadList = async params => {
    return createAPI('/api/v1/receipt/cpcn/download/list', 'post', {
        data: params || {},
    })
}
