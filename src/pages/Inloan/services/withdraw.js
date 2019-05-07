import createAPI from '@/utils/createAPI'

const baseUrl = '/api/v1/withdraw'

// 提现记录审核
export const withdrawAudit = async params => {
    return createAPI(`${baseUrl}/audit`, 'post', {
        data: params || {},
    })
}

// 提现记录审核详情
export const selectWithdrawCashDetails = async params => {
    return createAPI(`${baseUrl}/selectWithdrawCashDetails`, 'get', {
        params: params || {},
    })
}

// 查询提现记录列表
export const selectWithdrawCashListPage = async params => {
    return createAPI(`${baseUrl}/selectWithdrawCashListPage`, 'get', {
        params: params || {},
    })
}
