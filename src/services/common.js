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

// 通用
export const generalPost = async (params = {}, formData) =>
    createAPI('/general', 'post', {
        params,
        data: formData,
    })

// 物流
export const logisticsPost = async (params = {}, formData) =>
    createAPI('/logistics', 'post', {
        params,
        data: formData,
    })

// 物流
export const logisticsGet = async (params = {}) =>
    createAPI('/logistics', 'get', {
        params,
    })

// 采购
export const purchasePost = async (params = {}, formData) =>
    createAPI('/purchase', 'post', {
        params,
        data: formData,
    })

// 采购get请求的基础
export const purchaseGet = async (params = {}) =>
    createAPI('/purchase', 'get', {
        params,
    })

// delivers get请求的基础
export const deliversGet = async (params = {}) =>
    createAPI('/delivers', 'get', {
        params,
    })

// delivers post请求的基础
export const deliversPost = async (params = {}, formData) =>
    createAPI('/delivers', 'post', {
        params,
        data: formData,
    })

// 门店get请求的基础
export const goodsBaseGet = async (params = {}) =>
    createAPI('/goods', 'get', {
        params,
    })

// 订单get请求的基础
export const orderBaseGet = async (params = {}) =>
    createAPI('/order', 'get', {
        params,
    })

// 门店post请求的基础
export const goodsPost = async (params = {}, formData) =>
    createAPI('/goods', 'post', {
        params,
        data: formData,
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
