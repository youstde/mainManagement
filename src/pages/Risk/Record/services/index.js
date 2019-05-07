import createAPI from '@/utils/decisionCreateAPI'

// 获取风控记录列表
export const getRecordList = async params =>
    createAPI(`/riskStrategyWarnReport/list`, 'post', {
        data: params || {},
    })

// 解除处置
export const removeDisposal = async params =>
    createAPI(`/riskStrategyWarnReport/operate/${params}`, 'get')
