export const pageSize = 20

export const orderStatus = {
    1: {
        text: '申请',
        status: 'processing',
    },
    2: {
        text: '复核申请',
        status: 'processing',
    },
    3: {
        text: '处理中',
        status: 'processing',
    },
    4: {
        text: '成功',
        status: 'success',
    },
    5: {
        text: '失败',
        status: 'error',
    },
    6: {
        text: '退款',
        status: 'default',
    },
    7: {
        text: '订单关闭',
        status: 'default',
    },
    8: {
        text: '付款订单不存在',
        status: 'default',
    },
}

// 审核的类型
// eslint-disable-next-line import/prefer-default-export
export const AUDIT_TYPE = {
    company: 1, // 开户审核,
    order: 2, // 采购单审核,
    discount: 3, // 融资审核,
    credit: 4, // 核心企业授信审批,
    limit: 5, // 额度生效审核,
    withdraw: 6, // 客户提现,
    cash_deposit: 7, // 保证金审批,
    profit: 8, // 分润转出审批,

    common: 9, // 提前清分,
    risk_event: 10, // 风控审批,
}
