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
class DecisionSupplier extends Component {
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
                type: 0,
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
            type: 'report/fetchDecisionSupplier',
            payload: data,
        })
    }

    render() {
        const {
            report: { supplierList, supplierTotal, companyList },
        } = this.props
        const { current } = this.state

        const paginationProps = {
            showQuickJumper: true,
            pageSize,
            total: supplierTotal,
            current,
            onChange: this.handleChangePage,
        }

        const columns = [
            {
                title: '供应商企业名称',
                dataIndex: 'companyName',
                width: 200,
                fixed: 'left',
            },
            {
                title: '核心企业名称',
                dataIndex: 'hics',
                width: 200,
                fixed: 'left',
            },
            {
                title: '可用锌贝壳',
                dataIndex: 'freexbk',
                width: 100,
            },
            {
                title: '累计锌贝壳',
                dataIndex: 'ljxbk',
                width: 100,
            },
            {
                title: '累计融资费用',
                dataIndex: 'rzye',
                width: 100,
                render: text => {
                    return `${NumberToThousands(text)}元`
                },
            },
            {
                title: '累计接收笔数',
                dataIndex: 'jsbs',
                width: 100,
            },
            {
                title: '累计融资额',
                dataIndex: 'byrze',
                width: 100,
                render: text => {
                    return `${NumberToThousands(text)}元`
                },
            },
            {
                title: '累计融资占比',
                dataIndex: 'txzb',
                width: 100,
            },
            {
                title: '累计融资笔数',
                dataIndex: 'txbs',
                width: 100,
            },
            {
                title: '累计锌贝壳流转额',
                dataIndex: 'lze',
                width: 100,
            },
            {
                title: '累计锌贝壳流转额占比',
                dataIndex: 'lzzb',
                width: 100,
            },
            {
                title: '累计锌贝壳流转笔数',
                dataIndex: 'lzbs',
                width: 100,
            },
            {
                title: '累计承兑额',
                dataIndex: 'cde',
                width: 100,
                render: text => {
                    return `${NumberToThousands(text)}元`
                },
            },
            {
                title: '累计承兑额占比',
                dataIndex: 'cdzb',
                width: 100,
            },
            {
                title: '累计承兑笔数',
                dataIndex: 'cdbs',
                width: 100,
            },
            {
                title: '累计保兑额',
                dataIndex: 'bde',
                width: 100,
                render: text => {
                    return `${NumberToThousands(text)}元`
                },
            },
            {
                title: '累计保兑额占比',
                dataIndex: 'bdzb',
                width: 100,
            },
            {
                title: '累计保兑笔数',
                dataIndex: 'bdbs',
                width: 100,
            },
            {
                title: '接收锌贝壳arpu值',
                dataIndex: 'jsarpu',
                width: 100,
            },
            {
                title: '融资arpu值',
                dataIndex: 'txarpu',
                width: 100,
            },
            {
                title: '锌贝壳流转arpu值',
                dataIndex: 'lzarpu',
                width: 100,
            },
            {
                title: '承兑arpu值',
                dataIndex: 'cdarpu',
                width: 100,
            },
            {
                title: '保兑arpu值',
                dataIndex: 'bdarpu',
                width: 100,
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
                                label: '供应商名称',
                                type: 'select',
                                options: companyList,
                                key: 'companyId',
                                placeholder: '请选择供应商',
                                showSearch: true,
                                allowClear: true,
                            },
                        ]}
                        buttonGroup={buttonGroup}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={supplierList}
                    pagination={paginationProps}
                    scroll={{ x: 2500 }}
                    rowKey={record => record.id}
                />
            </PageHeaderWrapper>
        )
    }
}

export default DecisionSupplier
