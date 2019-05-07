import React, { Component } from 'react'
import { connect } from 'dva'
import { Table, Modal } from 'antd'
import SearchForm from '@/components/SearchForm'
import { NumberToThousands } from '@/utils/utils'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'

import { pageSize } from '@/utils/dict'

@connect(({ report }) => ({
    report,
}))
class InvoiceDetail extends Component {
    state = {
        searchData: {}, // 查询条件
        current: 1,
    }

    componentDidMount() {
        this.queryList()
    }

    handleSearchForm = values => {
        const { fpCode } = values
        if (fpCode) {
            this.setState({
                searchData: values,
            })
            const data = {
                pageSize,
                pageIndex: 1,
                ...values,
            }

            this.queryList(data)
        } else {
            Modal.warning({
                title: '请输入发票代码',
            })
        }
    }

    handleChangePage = value => {
        const { searchData } = this.state
        this.setState({
            current: value,
        })
        const data = {
            pageSize,
            pageIndex: value,
            ...searchData,
        }

        this.queryList(data)
    }

    queryList = data => {
        const { dispatch } = this.props
        dispatch({
            type: 'report/fetchInvoiceDetail',
            payload: data,
        })
    }

    render() {
        const {
            report: { invoiceDetailList, invoiceDetailTotal },
        } = this.props
        const { current } = this.state

        const paginationProps = {
            showQuickJumper: true,
            pageSize,
            total: invoiceDetailTotal,
            current,
            onChange: this.handleChangePage,
        }

        const columns = [
            {
                title: '发票类型',
                dataIndex: 'fpType',
            },
            {
                title: '发票代码',
                dataIndex: 'fpCode',
            },
            {
                title: '发票号码',
                dataIndex: 'fpNo',
            },
            {
                title: '商品名称',
                dataIndex: 'spName',
            },
            {
                title: '规格型号',
                dataIndex: 'spec',
            },
            {
                title: '计量单位',
                dataIndex: 'unit',
            },
            {
                title: '商品数量',
                dataIndex: 'spNum',
            },
            {
                title: '单价含税标志',
                dataIndex: 'priceLogo',
            },
            {
                title: '金额',
                dataIndex: 'tamount',
                render: text => {
                    return `${NumberToThousands(text)}元`
                },
            },
            {
                title: '税率',
                dataIndex: 'taxRate',
            },
            {
                title: '税额',
                dataIndex: 'taxAmount',
                render: text => {
                    return `${NumberToThousands(text)}元`
                },
            },
            {
                title: '发票来源',
                dataIndex: 'fpSource',
            },
            {
                title: '数据渠道',
                dataIndex: 'place',
            },
            {
                title: '发票上报时间',
                dataIndex: 'rkDate',
            },
        ]

        const buttonGroup = [
            {
                onSearch: this.handleSearchForm,
            },
        ]

        return (
            <PageHeaderWrapper>
                <div>
                    <SearchForm
                        data={[
                            {
                                label: '发票代码',
                                type: 'input',
                                key: 'fpCode',
                                placeholder: '请输入发票代码',
                            },
                        ]}
                        buttonGroup={buttonGroup}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={invoiceDetailList}
                    pagination={paginationProps}
                    rowKey={record => record.id}
                />
            </PageHeaderWrapper>
        )
    }
}

export default InvoiceDetail
