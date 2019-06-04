import React, { Component } from 'react'
import { connect } from 'dva'
import { message, Input, Table } from 'antd'
import EditableTable from './components/editTabel'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'

// mock
import orderMock from '../mock/ordermanagement'

// import { fetchFunction } from '@/services'
const fetchFunction = async () => ({ data: { list: [], count: 0 }, success: true })

@connect(() => ({}))
class Test extends Component {
    state = {
        selectedRowKeys: [],
        searchCondition: {}, // 搜索条件
        dataSrouce: orderMock || [], // 表格数据
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        }, // 表格分页
    }

    componentDidMount() {
        // this.fetchData()
    }

    // 请求表格的数据
    fetchData = (parmas = {}) => {
        const { pageNum, ...params } = parmas
        const { pagination, searchCondition } = this.state

        fetchFunction({
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

    // 查询表单下载
    handleFromDownload = values => {}

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

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys })
    }

    // 生成采购单
    createOrder = () => {
        const { selectedRowKeys } = this.state
        const { history } = this.props
        if (selectedRowKeys.length) {
            history.push('/purchase/createorder')
        } else {
            message.warning('请勾选你需要生成采购单的订单!')
        }
    }

    render() {
        const { dataSrouce, pagination } = this.state

        return (
            <PageHeaderWrapper>
                <EditableTable />
            </PageHeaderWrapper>
        )
    }
}

export default Test
