import createAPI, { baseUrl as base } from '@/utils/createAPI'

const baseUrl = '/api/v1/discount'

// 获取融资审批列表
export const selectDiscountListPage = async params => {
    return createAPI(`${baseUrl}/selectDiscountListPage`, 'get', {
        params: params || {},
    })
}

// 获取融资审批详情
export const selectDiscountDetails = async params => {
    return createAPI(`${baseUrl}/selectDiscountDetails`, 'get', {
        params: params || {},
    })
}

// 查看中登网资料
export const getZhongdengDetail = async params => {
    return createAPI(`${baseUrl}/auditDetail`, 'get', {
        params: params || {},
    })
}

// 所有流转凭证下载
// export const allContractDownload = async params => {
//     return createAPI(`${baseUrl}/allContractDownload`, 'get', {
//         params: params || {},
//     })
// }
// 所有流转凭证下载的路径
export const allContractDownloadPath = `${base}${baseUrl}/allContractDownload?contractId=`

// 审核
export const tardeAudit = async params => {
    return createAPI(`${baseUrl}/audit`, 'post', {
        data: params || {},
    })
}

// 附件处理
export const changeAttachment = async params => {
    return createAPI(`${baseUrl}/saveAttachment`, 'post', {
        data: params || {},
    })
}
