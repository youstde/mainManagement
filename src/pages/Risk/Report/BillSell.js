import React, { Component } from 'react'
import { connect } from 'dva'
import { Table } from 'antd'
import SearchForm from '@/components/SearchForm'
import { NumberToThousands } from '@/utils/utils'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'

import { pageSize } from '@/utils/dict'

@connect(({ report }) => ({
    report,
}))
class BillSell extends Component {
    state = {
        searchData: {}, // 查询条件
        current: 1,
    }

    componentDidMount() {
        const { dispatch } = this.props
        const { current } = this.state
        dispatch({
            type: 'report/fetchCompanyList',
            payload: {
                type: 1,
            },
        })
        const data = {
            pageSize,
            pageIndex: current,
        }
        this.queryList(data)
    }

    handleSearchForm = values => {
        this.setState({
            searchData: values,
        })
        const data = {
            pageSize,
            pageIndex: 1,
            ...values,
        }

        this.queryList(data)
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
            type: 'report/fetchBillSell',
            payload: data,
        })
    }

    render() {
        const {
            report: { billSellList, billSellTotal, companyList },
        } = this.props
        const { current } = this.state

        const paginationProps = {
            showQuickJumper: true,
            pageSize,
            total: billSellTotal,
            current,
            onChange: this.handleChangePage,
        }

        const columns = [
            {
                title: '截止日期',
                dataIndex: 'dt',
            },
            {
                title: '企业名称',
                dataIndex: 'companyName',
            },
            {
                title: '授信额度',
                dataIndex: 'sxe',
                render: text => {
                    return `${NumberToThousands(text)}元`
                },
            },
            {
                title: '到期日',
                dataIndex: 'dqdate',
            },
            {
                title: '实缴保证金',
                dataIndex: 'bzj',
                render: text => {
                    return `${NumberToThousands(text)}元`
                },
            },
            {
                title: '已用额度',
                dataIndex: 'used',
                render: text => {
                    return `${NumberToThousands(text)}元`
                },
            },
            {
                title: '已用敞口',
                dataIndex: 'yyck',
                render: text => {
                    return `${NumberToThousands(text)}元`
                },
            },
            {
                title: '融资余额',
                dataIndex: 'rzye',
                render: text => {
                    return `${NumberToThousands(text)}元`
                },
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
                                label: '核心企业名称',
                                type: 'select',
                                options: companyList,
                                key: 'companyId',
                                placeholder: '请选择核心企业',
                                showSearch: true,
                                allowClear: true,
                            },
                        ]}
                        buttonGroup={buttonGroup}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={billSellList}
                    pagination={paginationProps}
                    rowKey={record => record.id}
                />
            </PageHeaderWrapper>
        )
    }
}

export default BillSell
