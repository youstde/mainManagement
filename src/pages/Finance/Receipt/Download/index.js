import React, { Component } from 'react'
import { connect } from 'dva'
import { Table } from 'antd'
import moment from 'moment'
import SearchForm from '@/components/SearchForm'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'

import { pageSize } from '@/utils/dict'

@connect(({ download }) => ({
    download,
}))
class Download extends Component {
    state = {
        // a: '1',
        searchData: {}, // 查询条件
    }

    componentDidMount() {
        this.queryList()
    }

    componentWillUnmount() {
        const { dispatch } = this.props
        dispatch({
            type: 'download/clear',
        })
    }

    handleSearchForm = values => {
        this.setState({
            searchData: values,
        })

        this.queryList(values)
    }

    handleChangePage = value => {
        const { searchData } = this.state
        const data = {
            startPage: value,
            ...searchData,
        }

        this.queryList(data)
    }

    queryList = data => {
        const { dispatch } = this.props
        dispatch({
            type: 'download/fetchList',
            payload: data,
        })
    }

    render() {
        const {
            download: { list, total },
        } = this.props

        const paginationProps = {
            showQuickJumper: true,
            pageSize,
            total,
            onChange: this.handleChangePage,
        }

        const columns = [
            {
                title: '类型',
                dataIndex: 'resourceType',
                render: text => {
                    let content
                    switch (text) {
                        case 0:
                            content = '电子回单'
                            break
                        default:
                            break
                    }
                    return <span>{content}</span>
                },
            },
            {
                title: '企业名称',
                dataIndex: 'companyName',
            },
            {
                title: '数据条数',
                dataIndex: 'downloadSize',
            },
            {
                title: '下载时间',
                dataIndex: 'downloadTimestamp',
                render: text => (
                    <span>{text ? moment(text).format('YYYY.MM.DD HH:mm:ss') : ''}</span>
                ),
            },
            {
                title: '操作',
                dataIndex: 'receiptUrl',
                render: text => <a href={text}>下载</a>,
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
                                type: 'input',
                                key: 'companyName',
                            },
                        ]}
                        buttonGroup={buttonGroup}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={list}
                    pagination={paginationProps}
                    rowKey={record => record.receiptRecordId}
                />
            </PageHeaderWrapper>
        )
    }
}

export default Download
