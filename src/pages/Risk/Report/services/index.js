import createAPI from '@/utils/createAPI'

// 获取决策大盘数据
export const getDecisionGrail = async params => {
    return createAPI('/bigdata/bossDpviewReport/list', 'post', {
        data: params || {},
    })
}

// 企业下拉列表
export const getCompanyList = async params => {
    return createAPI(
        `/company/baseInfo/getCompanyCatalogByCoreLogo?coreCompanyLog=${params.type}`,
        'get'
    )
}

// 企业下拉列表
export const getAllCompany = async () => {
    return createAPI('bigdata/odsInvoice/catalogList', 'get')
}

// 获取核心企业决策大盘数据
export const getDecisionCore = async params => {
    return createAPI('/bigdata/bossCoreReport/list', 'post', {
        data: params || {},
    })
}

// 获取供应商决策大盘数据
export const getDecisionSupplier = async params => {
    return createAPI('/bigdata/bossSupplierReport/list', 'post', {
        data: params || {},
    })
}

// 获取开票销售监控表格数据
export const getBillSell = async params => {
    return createAPI('/bigdata/appCoreCompanyMonitor/list', 'post', {
        data: params || {},
    })
}

// 获取开票汇总表格数据
export const getBillCollect = async params => {
    return createAPI('/bigdata/appKpInvoiceStats/list', 'post', {
        data: params || {},
    })
}

// 获取开票数据top5表格数据
export const getDataTop = async params => {
    return createAPI('/bigdata/appDownCustomerTop5/list', 'post', {
        data: params || {},
    })
}

// 获取开票数据top5表格数据
export const getAreaTop = async params => {
    return createAPI('/bigdata/appDownCityTop5/list', 'post', {
        data: params || {},
    })
}

// 获取开票商品top5表格数据
export const getProductTop = async params => {
    return createAPI('/bigdata/appKpCargoTop5/list', 'post', {
        data: params || {},
    })
}

// 获取开票商品top5表格数据
export const getInvoiceOwner = async params => {
    return createAPI('/bigdata/odsInvoice/list', 'post', {
        data: params || {},
    })
}

// 获取发票详情表格数据
export const getInvoiceDetail = async params => {
    return createAPI('/bigdata/dwInvoiceDetail/list', 'post', {
        data: params || {},
    })
}
