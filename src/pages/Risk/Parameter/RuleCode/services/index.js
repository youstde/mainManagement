import createAPI from '@/utils/riskCreateAPI'

// 获取规则code节点列表
export const getRuleCodeList = async params =>
    createAPI(`/riskParam/list`, 'post', {
        data: params || {},
    })

// 保存业务节点
export const saveRuleCode = async params => {
    return createAPI('/riskParam/save', 'post', {
        data: params || {},
    })
}

// 获取规则分类下拉数据
export const getTypeList = async params =>
    createAPI(`/riskParamType/pullDownlist?id=${params.id}`, 'get')
