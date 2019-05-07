import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import Button from '@/components/Button'
import BasicTable from '@/components/BasicTable'
import InloanFinancingDetail from './detail'

import { selectDiscountListPage } from '../services/financing'

@connect(() => ({}))
class InloanFinancing extends Component {
    state = {
        searchCondition: {}, // 搜索条件
        dataSrouce: [], // 表格数据
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        }, // 表格分页

        showDetail: false,
        tradeId: null,
    }

    componentDidMount() {
        this.fetchData()
    }

    // 请求表格的数据
    fetchData = (parmas = {}) => {
        const { pageNum, ...params } = parmas
        const { pagination, searchCondition } = this.state

        selectDiscountListPage({
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

    // 查询表单搜索
    handleFormSearch = values => {
        const { pagination } = this.state

        this.setState(
            {
                searchCondition: values,
                pagination: {
                    ...pagination,
                    current: 1,
                },
            },
            () => {
                this.fetchData()
            }
        )
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

    handleHideDetail = () => {
        this.setState({
            showDetail: false,
        })
        this.fetchData()
    }

    handleShowDetail = tradeId => {
        this.setState({
            showDetail: true,
            tradeId,
        })
    }

    render() {
        const { dataSrouce, pagination, showDetail, tradeId } = this.state

        return (
            <PageHeaderWrapper>
                <SearchForm
                    data={[
                        {
                            label: '融资申请方',
                            type: 'input',
                            key: 'companyName',
                        },
                        {
                            label: '状态',
                            type: 'select',
                            options: [
                                { key: '0', value: '待打款' },
                                { key: '1', value: '打款通过' },
                                { key: '2', value: '打款拒绝' },
                                { key: '3', value: '取消' },
                                { key: '4', value: '已过期' },
                                { key: '-1', value: '待确认' },
                            ],
                            key: 'subsidyCashStatus',
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <BasicTable
                    columns={[
                        {
                            title: '融资申请方',
                            dataIndex: 'companyName',
                        },
                        {
                            title: '融资金额',
                            dataIndex: 'subsidyCashAmount',
                            type: 'amount',
                        },
                        {
                            title: '融资利率',
                            dataIndex: 'subsidyCashRate',
                        },
                        {
                            title: '融资手续费',
                            dataIndex: 'subsidyCashFee',
                        },
                        {
                            dataIndex: 'realArriveAmount',
                            title: '实际到账金额',
                            type: 'amount',
                        },
                        {
                            dataIndex: 'subsidyCashDate',
                            title: '融资时间',
                        },
                        {
                            dataIndex: 'subsidyCashStatusName',
                            title: '状态',
                        },
                        {
                            type: 'oprate',
                            render: (
                                _,
                                { subsidyCashStatus, isShowAudit, tradeDiscountRecordId }
                            ) => {
                                let text = '详情'
                                let type = 'default'

                                if (subsidyCashStatus === 0) {
                                    if (isShowAudit) {
                                        text = '审核'
                                    } else {
                                        text = '待审核'
                                    }
                                    type = 'primary'
                                } else if (subsidyCashStatus === 9) {
                                    text = '审核中'
                                    type = 'pending'
                                }

                                return (
                                    <Button
                                        onClick={() => this.handleShowDetail(tradeDiscountRecordId)}
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
                    <InloanFinancingDetail tradeId={tradeId} />
                </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default InloanFinancing
