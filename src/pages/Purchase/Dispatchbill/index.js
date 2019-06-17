import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'

// import { fetchFunction } from '@/services'
const fetchFunction = async () => ({ data: { list: [], count: 0 }, success: true })

@connect(() => ({}))
class PurchaseDispatchbillList extends Component {
    state = {
        searchCondition: {}, // 搜索条件
        dataSrouce: [], // 表格数据
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        }, // 表格分页
    }

    componentDidMount() {
        this.fetchData()
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

    render() {
        const { dataSrouce, pagination } = this.state

        return (
            <PageHeaderWrapper>
                <SearchForm
                    data={[
                        {
                            label: ' sku品名',
                            type: 'select',
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                            key: 'skuname',
                        },
                        {
                            label: '日期',
                            type: 'datepicker',
                            key: 'date',
                        },
                        {
                            label: '状态',
                            type: 'select',
                            key: 'status',
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                        },
                        {
                            key: 'provider',
                            label: '供应商',
                            type: 'select',
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                        },
                        {
                            key: 'store',
                            label: '订货门店',
                            type: 'select',
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                        },
                    ]}
                    buttonGroup={[
                        { onSearch: this.handleFormSearch },
                        { onDownload: this.handleFromDownload },
                    ]}
                />
                <BasicTable
                    columns={[
                        {
                            title: '采购供应商',
                            dataIndex: 'col1',
                        },
                        {
                            title: '订货门店名称',
                            dataIndex: 'col2',
                        },
                        {
                            title: '门店订货数量',
                            dataIndex: 'amount',
                            type: 'amount',
                        },
                        {
                            title: '日期',
                            dataIndex: 'datecol',
                            type: 'date',
                        },
                        {
                            dataIndex: 'key-0',
                            title: '实际采购数量',
                        },
                        {
                            dataIndex: 'key-1',
                            title: 'skuid',
                        },
                        {
                            dataIndex: 'key-2',
                            title: ' sku品名',
                        },
                        {
                            dataIndex: 'key-3',
                            title: '品类',
                        },
                        {
                            dataIndex: 'key-4',
                            title: '产区',
                        },
                        {
                            dataIndex: 'key-5',
                            title: '品种',
                        },
                        {
                            dataIndex: 'key-6',
                            title: '存储情况',
                        },
                        {
                            dataIndex: 'key-7',
                            title: '加工情况',
                        },
                        {
                            dataIndex: 'key-8',
                            title: '内包装',
                        },
                        {
                            dataIndex: 'key-9',
                            title: '外包装',
                        },
                        {
                            dataIndex: 'key-10',
                            title: '实际发货数量',
                        },
                        {
                            dataIndex: 'key-11',
                            title: '采购日期',
                        },
                        {
                            dataIndex: 'key-12',
                            title: '采购人员',
                        },
                        {
                            dataIndex: 'status',
                            title: '物流状态',
                        },
                        {
                            fixed: 'right',
                            type: 'oprate',
                            buttons: [{ text: '查看详情' }, { text: '编辑' }],
                        },
                    ]}
                    scroll={{ x: 2100 }}
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

export default PurchaseDispatchbillList
