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
class DataTop extends Component {
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
        const { companyName } = values
        if (companyName) {
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
                title: '请选择企业',
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
            type: 'report/fetchDataTop',
            payload: data,
        })
    }

    render() {
        const {
            report: { dataTopList, dataTopTotal, allCompany },
        } = this.props
        const { current } = this.state

        const paginationProps = {
            showQuickJumper: true,
            pageSize,
            total: dataTopTotal,
            current,
            onChange: this.handleChangePage,
        }

        const columns = [
            {
                title: '日期范围',
                dataIndex: 'udate',
            },
            {
                title: '客户名称',
                dataIndex: 'gfName',
            },
            {
                title: '开票金额',
                dataIndex: 'tamount',
                render: text => {
                    return `${NumberToThousands(text)}元`
                },
            },
            {
                title: '开票金额占比',
                dataIndex: 'zb',
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
                        ]}
                        buttonGroup={buttonGroup}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={dataTopList}
                    pagination={paginationProps}
                    rowKey={record => record.id}
                />
            </PageHeaderWrapper>
        )
    }
}

export default DataTop
