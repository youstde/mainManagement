import createAPI from '@/utils/riskCreateAPI'

// 获取风控规则列表
export const getRuleList = async params =>
    createAPI(`/riskRule/list`, 'post', {
        data: params || {},
    })

// 保存业务节点
export const saveBusinessNode = async params => {
    return createAPI('/riskRuleBusinessType/save', 'post', {
        data: params || {},
    })
}

// 获取规则分类下拉数据
export const getTypeList = async params =>
    createAPI(`/riskRuleType/pullDownList?id=${params.id}`, 'get')
