import createAPI from '@/utils/decisionCreateAPI'

// 获取风控记录列表
export const getRecordList = async params =>
    createAPI(`/riskStrategyWarnReport/list`, 'post', {
        data: params || {},
    })

// 获取预警报告操作记录列表
export const getList = async params => createAPI(`/riskStrategyProcessLog/list/${params}`, 'get')
