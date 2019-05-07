/* eslint-disable consistent-return */
import React, { Component } from 'react'
import { connect } from 'dva'
import { Table, Badge } from 'antd'
import { Link } from 'dva/router'
import moment from 'moment'
import SearchForm from '@/components/SearchForm'
import { NumberToThousands, getPageQuery } from '@/utils/utils'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'

import { pageSize, orderStatus } from '@/utils/dict'

@connect(({ company, common }) => ({
    company,
    common,
}))
class CashRecord extends Component {
    state = {
        searchData: {}, // 查询条件

        current: 1,
    }

    componentDidMount() {
        const { dispatch } = this.props
        const { companyId } = getPageQuery()
        dispatch({
            type: 'common/fetchPaymentType',
        })

        const data = {
            companyId,
            pageSize,
        }

        this.queryList(data)
    }

    handleSearchForm = values => {
        const { type, rangedate } = values
        const { companyId } = getPageQuery()

        const data = {
            paymentType: type,
            startTime: rangedate ? rangedate[0] : '',
            endTime: rangedate ? rangedate[1] : '',
            pageSize,
            pageIndex: 1,
            companyId,
        }

        this.setState({
            searchData: values,
        })

        this.queryList(data)
    }

    handleChangePage = value => {
        const { companyId } = getPageQuery()
        const {
            searchData: { type, rangedate },
        } = this.state
        this.setState({
            current: value,
        })
        const data = {
            pageIndex: value,
            pageSize,
            companyId,
            paymentType: type,
            startTime: rangedate ? rangedate[0] : '',
            endTime: rangedate ? rangedate[1] : '',
        }

        this.queryList(data)
    }

    queryList = data => {
        const { dispatch } = this.props
        dispatch({
            type: 'company/fetchCashList',
            payload: data,
        })
    }

    render() {
        const {
            company: { cashList, cashTotal },
            common: { paymentTypeList },
        } = this.props

        const { current } = this.state

        const paginationProps = {
            showQuickJumper: true,
            pageSize,
            total: cashTotal,
            current,
            onChange: this.handleChangePage,
        }

        const columns = [
            {
                title: '创建时间',
                dataIndex: 'gmtCreate',
                render: text => (text ? moment(text).format('YYYY.MM.DD HH:mm:ss') : ''),
            },
            {
                title: '变动类型',
                dataIndex: 'tradeTypeName',
            },
            {
                title: '变动金额(元)',
                dataIndex: 'tradeAmount',
                render: (text, record) => {
                    const { tradeFlowDirection } = record
                    const res = `${tradeFlowDirection === 0 ? '+' : '-'}${NumberToThousands(text)}`
                    const fontColor = tradeFlowDirection === 0 ? '#ff3300' : '#52c41a'
                    return <span style={{ color: fontColor }}>{res}</span>
                },
            },
            {
                title: '订单状态',
                dataIndex: 'tradeStatus',
                render: (text, record) => {
                    if (text) {
                        return (
                            <Badge
                                status={orderStatus[text].status}
                                text={record.tradeStatusName}
                            />
                        )
                    }
                },
            },
            {
                title: '操作',
                dataIndex: 'financialAccessId',
                render: financialAccessId => (
                    <Link
                        to={{
                            pathname: '/company/cash-detail',
                            search: `?financialAccessId=${financialAccessId}`,
                        }}
                    >
                        查看详情
                    </Link>
                ),
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
                                label: '订单状态',
                                type: 'select',
                                options: paymentTypeList,
                                key: 'type',
                            },
                            {
                                label: '时间范围',
                                type: 'rangepicker',
                                key: 'rangedate',
                            },
                        ]}
                        buttonGroup={buttonGroup}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={cashList}
                    pagination={paginationProps}
                    rowKey={record => record.financialAccessId}
                />
            </PageHeaderWrapper>
        )
    }
}

export default CashRecord
