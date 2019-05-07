import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import BasicTable from '@/components/BasicTable'
import Button from '@/components/Button'
import InIoanWithdrawDetail from './detail'

import { selectWithdrawCashListPage } from '../services/withdraw'

@connect(() => ({}))
class InIoanWithdraw extends Component {
    state = {
        showDetail: false,
        orderId: null,
        searchCondition: {}, // 搜索条件
        dataSrouce: [], // 表格数据
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        }, // 表格分页
    }

    componentDidMount() {
        this.fetchData()
    }

    // 请求表格的数据
    fetchData = (parmas = {}) => {
        const { pageNum, ...params } = parmas
        const { pagination, searchCondition } = this.state

        selectWithdrawCashListPage({
            pageSize: pagination.pageSize,
            pageNum: pageNum || pagination.current,
            ...searchCondition,
            ...params,
        }).then(res => {
            if (res && res.success) {
                this.setState({
                    dataSrouce: res.data.list,
                    pagination: {
                        ...pagination,
                        total: res.data.count,
                    },
                })
            }
        })
    }

    // 切换分页
    handleChangePage = page => {
        const { pagination } = this.state

        this.setState(
            {
                pagination: {
                    ...pagination,
                    current: page,
                },
            },
            () => {
                this.fetchData({
                    pageNum: page,
                })
            }
        )
    }

    handleShowDetail = orderId => {
        this.setState({
            showDetail: true,
            orderId,
        })
    }

    handleHideDetail = () => {
        this.setState({
            showDetail: false,
            orderId: '',
        })
        this.fetchData()
    }

    render() {
        const { dataSrouce, pagination, showDetail, orderId } = this.state

        return (
            <PageHeaderWrapper>
                <BasicTable
                    columns={[
                        {
                            title: ' 企业名称',
                            dataIndex: 'companyName',
                        },
                        {
                            title: '提现金额',
                            dataIndex: 'withdrawCashAmount',
                            type: 'amount',
                        },
                        {
                            title: '提现手续费',
                            dataIndex: 'withdrawCashFee',
                            type: 'amount',
                        },
                        {
                            title: '提现状态',
                            dataIndex: 'withdrawCashStatusName',
                        },
                        {
                            dataIndex: 'withdrawCashDate',
                            title: '提现时间',
                        },
                        {
                            dataIndex: 'remark',
                            title: '备注',
                        },
                        {
                            dataIndex: 'gmtCreate',
                            title: '创建时间',
                        },
                        {
                            dataIndex: 'gmtModified',
                            title: '更新时间',
                        },
                        {
                            type: 'oprate',
                            render: (
                                _,
                                { withdrawCashStatus, isShowAudit, withdrawCashRecordId: orId }
                            ) => {
                                let text = '详情'
                                let type = 'default'
                                if (withdrawCashStatus === -1) {
                                    if (isShowAudit) {
                                        text = '审核'
                                    } else {
                                        text = '待审核'
                                    }
                                    type = 'primary'
                                } else if (withdrawCashStatus === 9) {
                                    text = '审核中'
                                    type = 'pending'
                                }

                                return (
                                    <Button
                                        onClick={() => this.handleShowDetail(orId)}
                                        size="small"
                                        type={type}
                                    >
                                        {text}
                                    </Button>
                                )
                            },
                        },
                    ]}
                    dataSource={dataSrouce}
                    pagination={{
                        ...pagination,
                        onChange: this.handleChangePage,
                    }}
                />
                <Modal
                    title="订单记录"
                    footer={null}
                    width={680}
                    destroyOnClose
                    visible={showDetail}
                    onCancel={this.handleHideDetail}
                >
                    <InIoanWithdrawDetail withdrawCashRecordId={orderId} />
                </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default InIoanWithdraw
