import createAPI from '@/utils/createAPI'

const baseUrl = '/api/v1/order'

// 获取采购单审核列表
export const selectOrderListPage = async params => {
    return createAPI(`${baseUrl}/selectOrderListPage`, 'get', {
        params: params || {},
    })
}

// 获取采购单审批详情
export const selectOrderDetails = async params => {
    return createAPI(`${baseUrl}/selectOrderDetails`, 'get', {
        params: params || {},
    })
}

// 手动发票录入
export const manualInvoiceEntry = async params => {
    return createAPI(`${baseUrl}/save`, 'post', {
        data: params || {},
    })
}

// 更改审批状态
export const auditOrder = async params => {
    return createAPI(`${baseUrl}/audit`, 'post', {
        data: params || {},
    })
}
