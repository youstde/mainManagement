import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Input, message, Tag, Modal } from 'antd'

import DetailList from '@/components/DetailList'
import FileGallery from '@/components/FileGallery'
import ApproveChain from '@/components/ApproveChain'
import ButtonGroup from '@/components/ButtonGroup'
import Button from '@/components/Button'
import ChangeSignModal from '@/components/ChangeSignModal'
import InvoiceEntry from './InvoiceEntry'

import { selectOrderDetails, auditOrder, manualInvoiceEntry } from '../services/purchase'

@connect(() => ({}))
class InloanPurchaseDetail extends PureComponent {
    state = {
        galleryData: [],
        galleryVisible: false,
        detail: {},
        chainList: [],
        remark: '',

        changeSignShow: false,
        showInvoiceEntry: false,
        qiniuUrl: null,
    }

    componentDidMount() {
        this.fetchOrderDetail()
    }

    // 获取详情
    fetchOrderDetail = () => {
        const { orderId } = this.props

        selectOrderDetails({ orderId }).then(res => {
            if (res && res.success) {
                this.setState({
                    detail: res.data.data,
                    chainList: res.data.taskSignVOList,
                    remark: '',
                })
            }
        })
    }

    handleShowGallery = data => {
        if (!data || data.length === 0) {
            message.warn('没有可以查看的文件！')
            return
        }
        this.setState({
            galleryVisible: true,
            galleryData: data,
        })
    }

    handleCloseGallery = () => {
        this.setState({
            galleryVisible: false,
        })
    }

    changeRemark = e => {
        this.setState({
            remark: e.target.value,
        })
    }

    // 审核通过
    approvePass = () => {
        const { orderId } = this.props
        const { remark } = this.state

        Modal.confirm({
            title: '提示',
            content: '是否确认操作',
            onOk: () => {
                auditOrder({
                    orderId,
                    remark,
                    auditStatus: 1,
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
    handleConfirmChangeSign = values => {
        const { orderId } = this.props

        auditOrder({
            orderId,
            auditStatus: 10,
            ...values,
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

    // 退回接收方
    returnAcceptor = () => {
        const { orderId } = this.props
        const { remark } = this.state

        if (!remark) {
            message.warn('请填写备注！')
            return
        }
        Modal.confirm({
            title: '提示',
            content: '是否确认操作',
            onOk: () => {
                auditOrder({
                    orderId,
                    remark,
                    auditStatus: 3,
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
        const { orderId } = this.props
        const { remark } = this.state

        if (!remark) {
            message.warn('请填写备注！')
            return
        }
        Modal.confirm({
            title: '提示',
            content: '是否确认操作',
            onOk: () => {
                auditOrder({
                    orderId,
                    remark,
                    auditStatus: 2,
                }).then(res => {
                    if (res && res.success) {
                        message.success('操作成功！')
                        this.fetchOrderDetail()
                    }
                })
            },
        })
    }

    // 发票录入
    handleShowInvoiceEntry = qiniuUrl => {
        this.setState({
            showInvoiceEntry: true,
            qiniuUrl,
        })
    }

    handleConfirmInvoiceEntry = values => {
        const { orderId } = this.props
        const { qiniuUrl } = this.state
        const data = Object.assign({}, values, { orderId, qiniuUrl })

        manualInvoiceEntry(data).then(res => {
            if (res && res.success) {
                message.success('操作成功！')
                this.handleCancleInvoiceEntry()
                this.fetchOrderDetail()
            }
        })
    }

    handleCancleInvoiceEntry = () => {
        this.setState({
            showInvoiceEntry: false,
        })
    }

    render() {
        const {
            galleryData,
            galleryVisible,
            detail,
            chainList,
            remark,
            changeSignShow,
            showInvoiceEntry,
        } = this.state

        // 销售发票的节点处理
        let showInvoiceGroupEl = null
        let showInvoiceLookButton = null
        if (detail.procurementInvoiceList && detail.procurementInvoiceList.length > 0) {
            showInvoiceGroupEl = (
                <Fragment>
                    {detail.procurementInvoiceList.map((inv, index) => (
                        <div key={index}>
                            {inv.checkStatusName && <Tag>{inv.checkStatusName}</Tag>}
                            {inv.totalRemainSum != null && (
                                <Tag>{`剩余金额${inv.totalRemainSum}`}</Tag>
                            )}
                            <Button
                                style={{
                                    marginRight: '10px',
                                }}
                                size="small"
                                onClick={() => this.handleShowGallery([inv.qiniuUrl])}
                            >
                                查看发票
                            </Button>
                            {inv.downloadUrl != null && (
                                <Button
                                    style={{
                                        marginRight: '10px',
                                    }}
                                    size="small"
                                    onClick={() => this.handleShowGallery([inv.downloadUrl])}
                                >
                                    查看原件
                                </Button>
                            )}
                            {inv.invoiceCheckButton != null && detail.auditStatus !== 1 && (
                                <Button
                                    size="small"
                                    onClick={() => this.handleShowInvoiceEntry(inv.qiniuUrl)}
                                >
                                    发票信息录入
                                </Button>
                            )}
                        </div>
                    ))}
                    <InvoiceEntry
                        visible={showInvoiceEntry}
                        onOk={this.handleConfirmInvoiceEntry}
                        onCancel={this.handleCancleInvoiceEntry}
                    />
                </Fragment>
            )
        }
        if (detail.procurementInvoiceUrlList && detail.procurementInvoiceUrlList.length > 0) {
            showInvoiceLookButton = (
                <Button
                    size="small"
                    onClick={() => this.handleShowGallery(detail.procurementInvoiceUrlList)}
                >
                    查看发票
                </Button>
            )
        }
        const invoiceEl = (
            <Fragment>
                {showInvoiceGroupEl}
                {showInvoiceLookButton}
            </Fragment>
        )

        const showButtonGroup =
            detail.auditStatus === 0 && detail.orderStatus === 1 && detail.isShowAudit

        return (
            <Fragment>
                <DetailList
                    data={[
                        {
                            label: '发起方',
                            value: detail.initiatorCompanyName,
                        },
                        {
                            label: '接收方',
                            value: detail.acceptorCompanyName,
                        },
                        {
                            label: '采购项目',
                            value: detail.procurementProject,
                        },
                        {
                            label: '采购金额',
                            value: detail.procurementAmount,
                        },
                        {
                            label: '锌贝壳流转凭证',
                            value: detail.znContractDownloadUrl && (
                                <Button size="small">
                                    <a
                                        target="_blank"
                                        href={detail.znContractDownloadUrl}
                                        rel="noopener noreferrer"
                                    >
                                        去下载
                                    </a>
                                </Button>
                            ),
                        },
                        {
                            label: '付款承诺函',
                            value: (
                                <Fragment>
                                    {detail.paymentContractUrls &&
                                        detail.paymentContractUrls.map(url => {
                                            if (url) {
                                                return (
                                                    <Button size="small" key={url}>
                                                        <a
                                                            target="_blank"
                                                            href={url}
                                                            rel="noopener noreferrer"
                                                        >
                                                            查看付款承诺函
                                                        </a>
                                                    </Button>
                                                )
                                            }
                                            return null
                                        })}
                                </Fragment>
                            ),
                        },
                        {
                            label: '采购合同',
                            value: detail.procurementContractList && (
                                <Button
                                    size="small"
                                    onClick={() =>
                                        this.handleShowGallery(detail.procurementContractList)
                                    }
                                >
                                    查看采购合同
                                </Button>
                            ),
                        },
                        {
                            label: '物流凭证',
                            value: detail.logisticsUrlList && detail.logisticsUrlList.length > 0 && (
                                <Button
                                    size="small"
                                    onClick={() => this.handleShowGallery(detail.logisticsUrlList)}
                                >
                                    查看物流凭证
                                </Button>
                            ),
                        },
                        {
                            label: '销售合同',
                            value: detail.saleContractList && detail.saleContractList.length > 0 && (
                                <Button
                                    size="small"
                                    onClick={() => this.handleShowGallery(detail.saleContractList)}
                                >
                                    查看销售合同
                                </Button>
                            ),
                        },
                        {
                            label: '销售发票',
                            value: invoiceEl,
                        },
                        {
                            label: '发票总额',
                            value: detail.invoiceTotalAmount,
                        },
                        {
                            label: '发票金额对比',
                            value: <Tag>{detail.compareOrderAndInvoiceAmount}</Tag>,
                        },
                        {
                            label: '到期时间',
                            value: detail.expirationTime ? detail.expirationTime.split(' ')[0] : '',
                        },
                        {
                            label: '采购单状态',
                            value: <Tag>{detail.orderStatusName}</Tag>,
                        },
                        {
                            label: '备注(原因)',
                            value: <Input value={remark} onChange={this.changeRemark} />,
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
                                text: '退回接收方',
                                onClick: this.returnAcceptor,
                                type: 'warn',
                                hide: detail.isCheckChangeSignAndAudit,
                            },
                            {
                                text: detail.isCheckChangeSignAndAudit ? '不同意' : '审核拒绝',
                                onClick: this.approveReject,
                                type: 'danger',
                            },
                        ]}
                    />
                )}
                <ApproveChain data={chainList} />
                {showButtonGroup && (
                    <ChangeSignModal
                        visible={changeSignShow}
                        onCancel={this.handleCancleChangeSign}
                        onOk={this.handleConfirmChangeSign}
                    />
                )}
                {galleryVisible && (
                    <FileGallery data={galleryData} onClose={this.handleCloseGallery} />
                )}
            </Fragment>
        )
    }
}

export default InloanPurchaseDetail
