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
class InvoiceOwner extends Component {
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
        const { companyName, rangedate, fpCode } = values
        if (companyName) {
            this.setState({
                searchData: values,
            })
            const data = {
                pageSize,
                pageIndex: 1,
                companyName,
                fpCode,
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
            searchData: { companyName, rangedate, fpCode },
        } = this.state
        this.setState({
            current: value,
        })
        const data = {
            pageSize,
            pageIndex: value,
            companyName,
            fpCode,
            startTime: rangedate ? rangedate[0] : '',
            endTime: rangedate ? rangedate[1] : '',
        }

        this.queryList(data)
    }

    queryList = data => {
        const { dispatch } = this.props
        dispatch({
            type: 'report/fetchInvoiceOwner',
            payload: data,
        })
    }

    render() {
        const {
            report: { invoiceOwnerList, invoiceOwnerTotal, allCompany },
        } = this.props
        const { current } = this.state

        const paginationProps = {
            showQuickJumper: true,
            pageSize,
            total: invoiceOwnerTotal,
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
                title: '开票日期',
                dataIndex: 'kpDate',
            },
            {
                title: '购方名称',
                dataIndex: 'gfName',
            },
            {
                title: '购方税号',
                dataIndex: 'gfTaxno',
            },
            {
                title: '购方地址电话',
                dataIndex: 'gfAddr',
            },
            {
                title: '购方银行账号',
                dataIndex: 'gfBank',
            },
            {
                title: '销售方名称',
                dataIndex: 'xfName',
            },
            {
                title: '销售方税号',
                dataIndex: 'xfTaxno',
            },
            {
                title: '销售方地址电话',
                dataIndex: 'xfAddr',
            },
            {
                title: '销售方银行账号',
                dataIndex: 'xfBank',
            },
            {
                title: '合计金额',
                dataIndex: 'amount',
                render: text => {
                    return `${NumberToThousands(text)}元`
                },
            },
            {
                title: '合计税额',
                dataIndex: 'taxAmount',
                render: text => {
                    return `${NumberToThousands(text)}元`
                },
            },
            {
                title: '开票人',
                dataIndex: 'kpr',
            },
            {
                title: '复核人',
                dataIndex: 'fhr',
            },
            {
                title: '收款人',
                dataIndex: 'skr',
            },
            {
                title: '发票备注',
                dataIndex: 'remark',
            },
            {
                title: '是否作废',
                dataIndex: 'isvoid',
            },
            {
                title: '发票来源',
                dataIndex: 'srcId',
            },
            {
                title: '数据渠道',
                dataIndex: 'placeId',
            },
            {
                title: '发票入库时间',
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
                                label: '企业名称',
                                type: 'select',
                                options: allCompany,
                                key: 'companyName',
                                placeholder: '请选择企业',
                                showSearch: true,
                                allowClear: true,
                            },
                            {
                                label: '发票代码',
                                type: 'input',
                                key: 'fpCode',
                                placeholder: '请输入发票代码',
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
                    dataSource={invoiceOwnerList}
                    pagination={paginationProps}
                    scroll={{ x: 4500 }}
                    rowKey={record => record.id}
                />
            </PageHeaderWrapper>
        )
    }
}

export default InvoiceOwner
