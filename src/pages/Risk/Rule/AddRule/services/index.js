import createAPI1 from '@/utils/decisionCreateApi'
import createAPI from '@/utils/riskCreateApi'

// 获取策略下拉菜单列表
export const getStrategyList = async () => createAPI1('/riskStrategyConfig/pullDownlist', 'get')

// 获取规则组下拉菜单列表
export const getRuleGroupList = async () => createAPI('/riskRuleGroup/pullDownlist', 'get')

// 获取规则分类下拉菜单列表
export const getTypeList = async params =>
    createAPI(`/riskRuleType/pullDownList?id=${params.id}`, 'get')

// 获取规则参数所属策略下拉菜单列表
export const getRiskList = async params =>
    createAPI(`/riskParamType/pullDownlist?id=${params.id}`, 'get')

// 获取风控参数下拉菜单列表
export const getParamList = async params =>
    createAPI(`/riskParam/pullDownlist?id=${params.id}`, 'get')

// 获取业务节点下拉菜单列表
export const getNodeList = async params =>
    createAPI(`/riskRuleBusinessType/pullDownlist?id=${params.id}`, 'get')

// 获取可编辑的风控规则详情
export const getRuleDetail = async params => createAPI(`/riskRule/get?id=${params.id}`, 'get')

// 新增保存风控配置
export const saveConfig = async params =>
    createAPI(`/riskRule/save`, 'post', {
        data: params || {},
    })

// 编辑保存风控配置
export const updateConfig = async params =>
    createAPI(`/riskRule/update`, 'post', {
        data: params || {},
    })
