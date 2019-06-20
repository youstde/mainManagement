import createAPI from '@/utils/createAPI'

// get请求的基础
export const baseGet = async (params = {}) =>
    createAPI('/admin', 'get', {
        params,
    })

// 门店get请求的基础
export const storeBaseGet = async (params = {}) =>
    createAPI('/merchant', 'get', {
        params,
    })

// 配置
export const configurationGet = async (params = {}) =>
    createAPI('/configuration', 'get', {
        params,
    })

// 通用
export const generalGet = async (params = {}) =>
    createAPI('/general', 'get', {
        params,
    })

// 门店get请求的基础
export const goodsBaseGet = async (params = {}) =>
    createAPI('/goods', 'get', {
        params,
    })

// 获取该用户拥有的所有权限
export const getAllAuthorities = async () =>
    createAPI('/admin', 'get', {
        params: {
            t: 'menus',
        },
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
