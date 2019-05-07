import createAPI from '@/utils/riskCreateAPI'

// 获取规则组列表
export const getRuleGroupList = async params =>
    createAPI(`/riskRuleGroup/list`, 'post', {
        data: params || {},
    })

// 保存规则组
export const saveRuleGroup = async params => {
    return createAPI('/riskRuleGroup/save', 'post', {
        data: params || {},
    })
}
