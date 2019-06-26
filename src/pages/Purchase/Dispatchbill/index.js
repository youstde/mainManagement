import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import Button from '@/components/Button'

import { deliversPost } from '@/services/common'
import { createSignOptions, clearDate } from '@/utils/utils'

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
    fetchData = () => {
        const { pagination, searchCondition } = this.state
        const params = {
            t: 'orders',
            index: pagination.current,
            size: pagination.pageSize,
        }
        if (searchCondition.skuid) params.skuid = searchCondition.skuid
        if (searchCondition.date) params.date = clearDate(searchCondition.date)
        if (searchCondition.supplier_id) params.supplier_id = searchCondition.supplier_id
        if (searchCondition.mch_id) params.mch_id = searchCondition.mch_id
        if (searchCondition.status !== '') params.status = searchCondition.status
        createSignOptions(params)
        const formData = new FormData()
        Object.keys(params).forEach(key => {
            formData.append(key, params[key])
        })
        deliversPost('', formData).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    dataSrouce: res.data,
                    pagination: {
                        ...pagination,
                        total: res.pages.count,
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

    handleShowDetail = serialNo => {
        const { history } = this.props
        history.push(`/purchase/dispatchbill/detail?serialNo=${serialNo}`)
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
                            dataIndex: 'supplier_name',
                        },
                        {
                            title: '订货门店名称',
                            dataIndex: 'mch_name',
                        },
                        // {
                        //     title: '门店订货数量',
                        //     dataIndex: 'amount',
                        //     type: 'amount',
                        // },
                        // {
                        //     title: '日期',
                        //     dataIndex: 'datecol',
                        //     type: 'date',
                        // },
                        // {
                        //     dataIndex: 'key-0',
                        //     title: '实际采购数量',
                        // },
                        // {
                        //     dataIndex: 'key-1',
                        //     title: 'skuid',
                        // },
                        // {
                        //     dataIndex: 'key-2',
                        //     title: ' sku品名',
                        // },
                        // {
                        //     dataIndex: 'key-3',
                        //     title: '品类',
                        // },
                        // {
                        //     dataIndex: 'key-4',
                        //     title: '产区',
                        // },
                        // {
                        //     dataIndex: 'key-5',
                        //     title: '品种',
                        // },
                        // {
                        //     dataIndex: 'key-6',
                        //     title: '存储情况',
                        // },
                        // {
                        //     dataIndex: 'key-7',
                        //     title: '加工情况',
                        // },
                        // {
                        //     dataIndex: 'key-8',
                        //     title: '内包装',
                        // },
                        // {
                        //     dataIndex: 'key-9',
                        //     title: '外包装',
                        // },
                        // {
                        //     dataIndex: 'key-10',
                        //     title: '实际发货数量',
                        // },
                        {
                            dataIndex: 'buy_date',
                            title: '采购日期',
                        },
                        {
                            dataIndex: 'buyer',
                            title: '采购人员',
                        },
                        {
                            title: '物流状态',
                            render: (_, { status }) => {
                                let text = '未处理'
                                if (status) text = '已处理'
                                return <span>{text}</span>
                            },
                        },
                        {
                            // fixed: 'right',
                            type: 'oprate',
                            render: (_, { serial_no: serialNo }) => {
                                return (
                                    <div>
                                        <Button
                                            onClick={() => this.handleShowDetail(serialNo)}
                                            size="small"
                                            type="default"
                                        >
                                            查看详情
                                        </Button>
                                    </div>
                                )
                            },
                        },
                    ]}
                    // scroll={{ x: 2100 }}
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
