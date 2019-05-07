import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Input, message, Modal } from 'antd'

import DetailList from '@/components/DetailList'
import ButtonGroup from '@/components/ButtonGroup'
import ChangeSignModal from '@/components/ChangeSignModal'
import ApproveChain from '@/components/ApproveChain'

import { selectWithdrawCashDetails, withdrawAudit } from '../services/withdraw'

@connect(() => ({}))
class InIoanWithdrawDetail extends PureComponent {
    state = {
        detail: {},
        taskSignList: [],
        auditReason: '',
        signVisible: false,
    }

    componentDidMount() {
        this.fetchOrderDetail()
    }

    // 获取详情
    fetchOrderDetail = () => {
        const { withdrawCashRecordId } = this.props

        selectWithdrawCashDetails({ withdrawCashRecordId }).then(res => {
            if (res && res.success) {
                const { data: detail, taskSignVOList } = res.data
                this.setState({
                    detail,
                    taskSignList: taskSignVOList,
                })
            }
        })
    }

    // 编辑原因
    changeAuditReason = e => {
        const {
            target: { value },
        } = e
        this.setState({
            auditReason: value,
        })
    }

    // 审核通过
    approvePass = () => {
        const { withdrawCashRecordId } = this.props
        const { auditReason } = this.state

        Modal.confirm({
            title: '提示',
            content: '是否确认操作',
            onOk: () => {
                withdrawAudit({
                    withdrawCashRecordId,
                    auditReason,
                    withdrawCashStatus: 1,
                }).then(res => {
                    if (res && res.success) {
                        message.success('操作成功！')
                        this.fetchOrderDetail()
                    }
                })
            },
        })
    }

    // 审核拒绝
    approveReject = () => {
        const { withdrawCashRecordId } = this.props
        const { auditReason } = this.state
        if (auditReason) {
            Modal.confirm({
                title: '提示',
                content: '是否确认操作',
                onOk: () => {
                    withdrawAudit({
                        withdrawCashRecordId,
                        auditReason,
                        withdrawCashStatus: 0,
                    }).then(res => {
                        if (res && res.success) {
                            message.success('操作成功！')
                            this.fetchOrderDetail()
                        }
                    })
                },
            })
        } else {
            message.warn('请输入意见！')
        }
    }

    // 转签
    changeSign = () => {
        this.setState({
            signVisible: true,
        })
    }

    // 取消转签
    hiddenSign = () => {
        this.setState({
            signVisible: false,
        })
    }

    // 转签成功
    handleSign = value => {
        const { withdrawCashRecordId } = this.props
        withdrawAudit({
            withdrawCashRecordId,
            withdrawCashStatus: 10,
            ...value,
        }).then(res => {
            if (res && res.success) {
                message.success('操作成功！')
                this.fetchOrderDetail()
                this.hiddenSign()
            }
        })
    }

    render() {
        const {
            detail: {
                withdrawCashStatus,
                isShowAudit,
                companyName,
                bankNum,
                openBankDetail,
                withdrawCashAmount,
                userableAmount,
                withdrawCashFee,
                withdrawCashDate,
                withdrawCashStatusName,
                remark,
            },
            signVisible,
            taskSignList,
        } = this.state

        const showButtonGroup = withdrawCashStatus === -1 && isShowAudit

        return (
            <Fragment>
                <DetailList
                    data={[
                        {
                            label: '企业名称',
                            value: companyName,
                        },
                        {
                            label: '结算账号',
                            value: bankNum,
                        },
                        {
                            label: '开户行',
                            value: openBankDetail,
                        },
                        {
                            label: '提现金额',
                            value: withdrawCashAmount,
                        },
                        {
                            label: '账户剩余可用金额',
                            value: userableAmount,
                        },
                        {
                            label: '提现手续费',
                            value: withdrawCashFee,
                        },
                        {
                            label: '提现时间',
                            value: withdrawCashDate,
                        },
                        {
                            label: '提现状态',
                            value: withdrawCashStatusName,
                        },
                        {
                            label: '备注',
                            value: remark,
                        },
                        {
                            label: '意见',
                            value: <Input onChange={this.changeAuditReason} />,
                        },
                    ]}
                />
                {showButtonGroup && (
                    <ButtonGroup
                        globalWidth={false}
                        globalSize="default"
                        buttons={[
                            {
                                text: '审核通过',
                                onClick: this.approvePass,
                            },
                            {
                                text: '转签',
                                onClick: this.changeSign,
                                type: 'pending',
                            },
                            {
                                text: '审核拒绝',
                                onClick: this.approveReject,
                                type: 'danger',
                            },
                        ]}
                    />
                )}
                <ChangeSignModal
                    onOk={this.handleSign}
                    onCancel={this.hiddenSign}
                    visible={signVisible}
                />
                <ApproveChain data={taskSignList} />
            </Fragment>
        )
    }
}

export default InIoanWithdrawDetail
