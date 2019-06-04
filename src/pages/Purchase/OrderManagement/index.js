import React, { Component } from 'react'
import { connect } from 'dva'
import { message } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import Button from '@/components/Button'

// mock
import orderMock from '../mock/ordermanagement'

// import { fetchFunction } from '@/services'
const fetchFunction = async () => ({ data: { list: [], count: 0 }, success: true })

@connect(() => ({}))
class PurchaseOrderManagement extends Component {
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
        const { dataSrouce, pagination, selectedRowKeys } = this.state

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        }

        return (
            <PageHeaderWrapper>
                <SearchForm
                    data={[
                        {
                            label: 'sku id/品名',
                            type: 'input',
                            key: 'skuId',
                        },
                        {
                            label: '门店',
                            type: 'select',
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                            key: 'storeName',
                        },
                        {
                            label: '订货时间',
                            type: 'datepicker',
                            key: 'orderDate',
                        },
                        {
                            label: '状态',
                            type: 'select',
                            key: 'state',
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <div style={{ textAlign: 'right', paddingBottom: '10px' }}>
                    <Button onClick={() => this.editSome()} size="small" type="default">
                        手动生成采购单
                    </Button>
                    <span>&nbsp;</span>
                    <Button onClick={() => this.createOrder()} size="small" type="default">
                        勾选生成采购单
                    </Button>
                </div>
                <BasicTable
                    columns={[
                        {
                            title: '订货日期',
                            dataIndex: 'orderDate',
                            type: 'date',
                            format: 'YYYY-MM-DD',
                        },
                        {
                            title: '订货门店',
                            dataIndex: 'orderStore',
                        },
                        {
                            title: 'skuId',
                            dataIndex: 'skuId',
                        },
                        {
                            title: 'sku品名',
                            dataIndex: 'skuName',
                            type: 'longText',
                        },
                        {
                            dataIndex: 'goodsClass',
                            title: '品类',
                        },
                        {
                            dataIndex: 'area',
                            title: '产区',
                        },
                        {
                            dataIndex: 'goodsType',
                            title: '品种',
                        },
                        {
                            dataIndex: 'storecase',
                            title: '存储情况',
                        },
                        {
                            dataIndex: 'processcase',
                            title: '加工情况',
                        },
                        {
                            dataIndex: 'outpackage',
                            title: '外包装',
                        },
                        {
                            dataIndex: 'innerpackage',
                            title: '内包装',
                        },
                        {
                            dataIndex: 'orderNum',
                            title: '订货数量',
                        },
                        {
                            dataIndex: 'state',
                            title: '状态',
                        },
                    ]}
                    rowKey={record => record.id}
                    rowSelection={rowSelection}
                    dataSource={dataSrouce}
                    pagination={{
                        ...pagination,
                        onChange: this.handleChangePage,
                    }}
                />
            </PageHeaderWrapper>
        )
    }
}

export default PurchaseOrderManagement
