import createAPI from '@/utils/riskCreateAPI'

// 获取业务节点列表
export const getBusinessNodeList = async params =>
    createAPI(`/riskRuleBusinessType/list`, 'post', {
        data: params || {},
    })

// 保存业务节点
export const saveBusinessNode = async params => {
    return createAPI('/riskRuleBusinessType/save', 'post', {
        data: params || {},
    })
}

// 获取业务节点下拉数据
export const getNodeList = async () => createAPI(`/riskRuleBusinessType/pullDownlist`, 'get')
