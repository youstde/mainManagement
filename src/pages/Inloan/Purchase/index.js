import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Modal } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import Button from '@/components/Button'
import InloanPurchaseDetail from './detail'

import { selectOrderListPage } from '../services/purchase'

@connect(() => ({}))
class InloanPurchase extends PureComponent {
    state = {
        showDetail: false,
        dataSrouce: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        },
        searchCondition: {},
        orderId: null,
    }

    componentDidMount() {
        this.fetchData()
    }

    // 请求表格的数据
    fetchData = (parmas = {}) => {
        const { pageNum, ...params } = parmas
        const { pagination, searchCondition } = this.state

        selectOrderListPage({
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

    // 切换页面
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

    handleShowDetail = orderId => {
        this.setState({
            showDetail: true,
            orderId,
        })
    }

    render() {
        const { showDetail, dataSrouce, pagination, orderId } = this.state

        return (
            <PageHeaderWrapper>
                <SearchForm
                    data={[
                        {
                            label: '企业名称',
                            type: 'input',
                            key: 'companyName',
                        },
                        {
                            label: '状态',
                            type: 'select',
                            options: [
                                { key: '0', value: '未审核' },
                                { key: '1', value: '已审核' },
                                { key: '2', value: '审核失败' },
                                { key: '3', value: '审核退回' },
                            ],
                            key: 'auditStatus',
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <BasicTable
                    columns={[
                        {
                            title: ' 发起方',
                            dataIndex: 'initiatorCompanyName',
                        },
                        {
                            title: '接收方',
                            dataIndex: 'acceptorCompanyName',
                        },
                        {
                            dataIndex: 'procurementAmount',
                            title: '采购金额',
                            type: 'amount',
                        },
                        {
                            dataIndex: 'orderStatusName',
                            title: '采购单状态',
                        },
                        {
                            dataIndex: 'expirationTime',
                            title: '到期时间',
                            render: text => {
                                if (text) {
                                    return text.split(' ')[0]
                                }
                                return text
                            },
                        },
                        {
                            dataIndex: 'auditStatusName',
                            title: '审核状态',
                        },
                        {
                            dataIndex: 'comfirmExpirationTime',
                            title: '确认到期时间',
                        },
                        {
                            dataIndex: 'procurementProject',
                            title: '采购项目',
                        },
                        {
                            dataIndex: 'gmtCreate',
                            title: '创建时间',
                        },
                        {
                            type: 'oprate',
                            render: (
                                _,
                                { orderStatus, auditStatus, isShowAudit, orderId: orId }
                            ) => {
                                let text = '详情'
                                let type = 'default'

                                if (orderStatus === 1 && auditStatus === 0) {
                                    if (isShowAudit) {
                                        text = '审核'
                                    } else {
                                        text = '待审核'
                                    }
                                    type = 'primary'
                                } else if (auditStatus === 9) {
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
                    <InloanPurchaseDetail orderId={orderId} />
                </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default InloanPurchase
