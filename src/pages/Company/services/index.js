import createAPI from '@/utils/createAPI'

// 获取企业台账信息
export const getCompanyTotal = async params =>
    createAPI(`/api/v1/company/getCompanyTotal/${params.companyId}`, 'get', { from: 'risk' })

// 获取现金流水记录列表
export const getCashList = async params => {
    return createAPI('/api/v1/company/selectTppFinancialAccessListPage', 'post', {
        data: params || {},
    })
}

// 获取现金流水记录详情
export const getCashDetail = async params => {
    return createAPI('/api/v1/company/getTppFinancialAccessDetail', 'post', {
        data: params || {},
    })
}
