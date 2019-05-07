import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Input, Tag, message, Modal } from 'antd'

import DetailList from '@/components/DetailList'
import ApproveChain from '@/components/ApproveChain'
import ButtonGroup from '@/components/ButtonGroup'
import Button from '@/components/Button'
import FileUpload from '@/components/FileUpload'
import FileGallery from '@/components/FileGallery'
import ChangeSignModal from '@/components/ChangeSignModal'
import ZhongdengDetail from './ZhongdengDetail'

import { selectDiscountDetails, tardeAudit, changeAttachment } from '../services/financing'
import { printRangeById } from '@/utils/utils'

@connect(() => ({}))
class InloanPurchaseDetail extends PureComponent {
    state = {
        detail: {},
        chainList: [],
        remark: '',

        showZhongdeng: false,
        changeSignShow: false,
        showGallery: false,
    }

    componentDidMount() {
        this.fetchOrderDetail()
    }

    // 获取详情
    fetchOrderDetail = () => {
        const { tradeId } = this.props
        selectDiscountDetails({ discountRecordId: tradeId }).then(res => {
            if (res && res.success) {
                this.setState({
                    detail: res.data.data,
                    chainList: res.data.taskSignVOList,
                    remark: '',
                })
            }
        })
    }

    changeRemark = e => {
        this.setState({
            remark: e.target.value,
        })
    }

    handleShowZhongdeng = () => {
        this.setState({
            showZhongdeng: true,
        })
    }

    handleHideZhongdeng = () => {
        this.setState({
            showZhongdeng: false,
        })
    }

    // 审核通过
    approvePass = () => {
        const { tradeId } = this.props
        const { remark } = this.state

        Modal.confirm({
            title: '提示',
            content: '是否确认操作',
            onOk: () => {
                tardeAudit({
                    tradeDiscountRecordId: tradeId,
                    subsidyCashReason: remark,
                    subsidyCashStatus: 1,
                }).then(res => {
                    if (res && res.success) {
                        message.success('操作成功！')
                        this.fetchOrderDetail()
                    }
                })
            },
        })
    }

    // 转签
    changeSign = () => {
        this.setState({
            changeSignShow: true,
        })
    }

    // 确认转签
    handleConfirmChangeSign = ({ remark, changeUserId }) => {
        const { tradeId } = this.props

        tardeAudit({
            tradeDiscountRecordId: tradeId,
            subsidyCashReason: remark,
            subsidyCashStatus: 10,
            changeUserId,
        }).then(res => {
            if (res && res.success) {
                message.success('操作成功！')
                this.fetchOrderDetail()
                this.handleCancleChangeSign()
            }
        })
    }

    // 关闭转签窗口
    handleCancleChangeSign = () => {
        this.setState({
            changeSignShow: false,
        })
    }

    // 审核拒绝
    approveReject = () => {
        const { tradeId } = this.props
        const { remark } = this.state

        if (!remark) {
            message.warn('请填写备注！')
            return
        }
        Modal.confirm({
            title: '提示',
            content: '是否确认操作',
            onOk: () => {
                tardeAudit({
                    tradeDiscountRecordId: tradeId,
                    subsidyCashReason: remark,
                    subsidyCashStatus: 2,
                }).then(res => {
                    if (res && res.success) {
                        message.success('操作成功！')
                        this.fetchOrderDetail()
                    }
                })
            },
        })
    }

    // 附件提交
    handleAttachmentCommit = () => {
        const { tradeId } = this.props
        const {
            detail: { attachment },
        } = this.state
        const fileString = this.attachmentFile.getUrlString()
        if (!fileString) {
            message.warn('请先上传')
            return
        }
        if (fileString === attachment) {
            message.warn('请上传新的附件')
            return
        }
        Modal.confirm({
            content: '是否确认提交',
            onOk: () => {
                changeAttachment({
                    tradeDiscountRecordId: tradeId,
                    attachment: fileString,
                    isAdd: true,
                }).then(res => {
                    if (res && res.success) {
                        message.success('文件提交成功')
                        this.fetchOrderDetail()
                    }
                })
            },
        })
    }

    // 附件删除
    handleAttachmentRemove = file => {
        const { tradeId } = this.props
        // 如果文件是通过数据传过来的，需要提示
        if (!file.originFileObj) {
            Modal.confirm({
                content: '是否确认删除该文件',
                onOk: () => {
                    changeAttachment({
                        tradeDiscountRecordId: tradeId,
                        attachment: file.url,
                        isAdd: false,
                    }).then(res => {
                        if (res && res.success) {
                            message.success('文件删除成功')
                            this.fetchOrderDetail()
                        }
                    })
                },
            })
            return false
        }
        return true
    }

    handleShowGallery = () => {
        this.setState({
            showGallery: true,
        })
    }

    handleCloseGallery = () => {
        this.setState({
            showGallery: false,
        })
    }

    // 打印
    printForPrivew = () => {
        printRangeById('financingDetail')
    }

    render() {
        const { detail, chainList, remark, changeSignShow, showZhongdeng, showGallery } = this.state
        const { tradeId } = this.props

        const showButtonGroup = detail.subsidyCashStatus === 0 && detail.isShowAudit

        return (
            <div id="financingDetail">
                <DetailList
                    data={[
                        {
                            label: '融资申请方',
                            value: detail.companyName,
                        },
                        {
                            label: '银行账户',
                            value: detail.electronicAccount,
                        },
                        {
                            label: '开户行',
                            value: detail.openBankNum,
                        },
                        {
                            label: '融资金额（元）',
                            value: detail.subsidyCashAmount,
                        },
                        {
                            label: '融资利率（%）',
                            value: detail.subsidyCashRate,
                        },
                        {
                            label: '融资服务费（元）',
                            value: detail.subsidyCashFee,
                        },
                        {
                            label: '实际付款金额（元）',
                            value: detail.realArriveAmount,
                        },
                        {
                            label: '融资时间',
                            value: detail.subsidyCashDate,
                        },
                        {
                            label: '承兑方',
                            value: detail.acceptCompanyName,
                        },
                        {
                            label: '生效额度（元）',
                            value: detail.awardedCreditLimit,
                        },
                        {
                            label: '授信总额（元）',
                            value: detail.awardedCreditLimitMax,
                        },
                        {
                            label: '已用额度（元）',
                            value: detail.awardedCreditLimitUsed,
                        },
                        {
                            label: '已用敞口（元）',
                            value: detail.alreadyRiskExposure,
                        },
                        {
                            label: '现有融资余额（元）',
                            value: detail.currentDiscountRemainAmount,
                        },
                        {
                            label: '状态',
                            value: <Tag>{detail.subsidyCashStatusName}</Tag>,
                        },
                        {
                            label: '电子合同文件',
                            value: (
                                <Button size="small" onClick={this.handleShowZhongdeng}>
                                    查看中登网资料
                                </Button>
                            ),
                        },
                        {
                            label: '备注',
                            value: detail.subsidyCashReason,
                        },
                        {
                            label: '意见',
                            // auditReason
                            value: <Input value={remark} onChange={this.changeRemark} />,
                        },
                        {
                            // TODO: auditFileUrls
                            label: '相关附件',
                            value: showButtonGroup ? (
                                <Fragment>
                                    <FileUpload
                                        ref={ref => {
                                            this.attachmentFile = ref
                                        }}
                                        fileList={detail.auditFileUrls || []}
                                        uploadTip="上传附件"
                                        accept="*"
                                        onRemove={this.handleAttachmentRemove}
                                    />
                                    <Button onClick={this.handleAttachmentCommit} type="default">
                                        提交附件
                                    </Button>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <Button onClick={this.handleShowGallery} type="default">
                                        查看附件
                                    </Button>
                                    {showGallery && (
                                        <FileGallery
                                            data={detail.auditFileUrls}
                                            onClose={this.handleCloseGallery}
                                        />
                                    )}
                                </Fragment>
                            ),
                        },
                    ]}
                />
                {showButtonGroup && (
                    <ButtonGroup
                        globalWidth={false}
                        globalSize="default"
                        buttons={[
                            {
                                text: detail.isCheckChangeSignAndAudit ? '同意' : '审核通过',
                                onClick: this.approvePass,
                            },
                            {
                                text: '转签',
                                onClick: this.changeSign,
                                type: 'pending',
                            },
                            {
                                text: detail.isCheckChangeSignAndAudit ? '不同意' : '审核拒绝',
                                onClick: this.approveReject,
                                type: 'danger',
                            },
                        ]}
                    />
                )}
                <ButtonGroup
                    globalWidth={false}
                    globalSize="default"
                    primary={[
                        {
                            text: '打印预览',
                            onClick: this.printForPrivew,
                        },
                    ]}
                />
                <ApproveChain data={chainList} />
                {showButtonGroup && (
                    <ChangeSignModal
                        visible={changeSignShow}
                        onCancel={this.handleCancleChangeSign}
                        onOk={this.handleConfirmChangeSign}
                    />
                )}
                <Modal
                    visible={showZhongdeng}
                    title="中登网资料"
                    width="600px"
                    footer={null}
                    onCancel={this.handleHideZhongdeng}
                >
                    <ZhongdengDetail tradeId={tradeId} />
                </Modal>
            </div>
        )
    }
}

export default InloanPurchaseDetail
