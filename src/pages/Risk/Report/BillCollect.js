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
class BillCollect extends Component {
    state = {
        searchData: {}, // 查询条件
        current: 1,
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch({
            type: 'report/fetchAllCompany',
        })

        this.queryList()
    }

    handleSearchForm = values => {
        const { companyName, rangedate } = values
        if (companyName) {
            this.setState({
                searchData: values,
            })
            const data = {
                pageSize,
                pageIndex: 1,
                companyName,
                startTime: rangedate ? rangedate[0] : '',
                endTime: rangedate ? rangedate[1] : '',
            }

            this.queryList(data)
        } else {
            Modal.warning({
                title: '请选择企业',
            })
        }
    }

    handleChangePage = value => {
        const {
            searchData: { companyName, rangedate },
        } = this.state
        this.setState({
            current: value,
        })
        const data = {
            pageSize,
            pageIndex: value,
            companyName,
            startTime: rangedate ? rangedate[0] : '',
            endTime: rangedate ? rangedate[1] : '',
        }

        this.queryList(data)
    }

    queryList = data => {
        const { dispatch } = this.props
        dispatch({
            type: 'report/fetchBillCollect',
            payload: data,
        })
    }

    render() {
        const {
            report: { billCollectList, billCollectTotal, allCompany },
        } = this.props
        const { current } = this.state

        const paginationProps = {
            showQuickJumper: true,
            pageSize,
            total: billCollectTotal,
            current,
            onChange: this.handleChangePage,
        }

        const columns = [
            {
                title: '日期',
                dataIndex: 'udate',
            },
            {
                title: '开票销售额',
                dataIndex: 'ztamount',
                render: text => {
                    return `${NumberToThousands(text)}元`
                },
            },
            {
                title: '红废票金额',
                dataIndex: 'ftamount',
                render: text => {
                    return `${NumberToThousands(text)}元`
                },
            },
            {
                title: '红废票占比',
                dataIndex: 'hfzb',
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
                                label: '企业名称',
                                type: 'select',
                                options: allCompany,
                                key: 'companyName',
                                placeholder: '请选择企业',
                                showSearch: true,
                                allowClear: true,
                            },
                            {
                                label: '时间范围',
                                type: 'rangepicker',
                                key: 'rangedate',
                                dateFormat: 'YYYY-MM',
                            },
                        ]}
                        buttonGroup={buttonGroup}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={billCollectList}
                    pagination={paginationProps}
                    rowKey={record => record.id}
                />
            </PageHeaderWrapper>
        )
    }
}

export default BillCollect
