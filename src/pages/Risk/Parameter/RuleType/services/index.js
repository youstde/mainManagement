import createAPI from '@/utils/riskCreateAPI'

// 获取业务节点列表
export const getRuleTypeList = async params =>
    createAPI(`/riskRuleType/list`, 'post', {
        data: params || {},
    })

// 保存业务节点
export const saveRuleType = async params => {
    return createAPI('/riskRuleType/save', 'post', {
        data: params || {},
    })
}

// 获取规则分类下拉数据
export const getTypeList = async () => createAPI(`/riskRuleType/pullDownList`, 'get')
