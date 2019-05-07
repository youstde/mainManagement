import createAPI from '@/utils/createAPI'

// 获取该用户拥有的所有权限
export const getAllAuthorities = async (params = {}) =>
    createAPI('/api/v1/auth/getAllMenus', 'get', {
        params,
    })

// 获取所有企业列表
export const companyList = async () => {
    return createAPI('/api/v1/account/query/all/companyName', 'post')
}

// 获取所有变动类型
export const getPaymentTypeList = async () => createAPI(`/api/v1/company/getPaymentTypeList`, 'get')

// 根据审批的类型，获取转签 的 审批用户
export const getAuditUsers = async taskType =>
    createAPI('/api/v1/auth/getAuditUsers', 'get', {
        params: {
            taskType,
        },
    })