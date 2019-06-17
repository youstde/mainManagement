import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import Button from '@/components/Button'

// import { fetchFunction } from '@/services'
const fetchFunction = async () => ({ data: { list: [], count: 0 }, success: true })

@connect(() => ({}))
class LogisticsDispatchmanagement extends Component {
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
                            type: 'input',
                            key: 'inputKey',
                        },
                        {
                            label: '日期',
                            type: 'datepicker',
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                            key: 'selectKey',
                        },
                        {
                            label: '门店',
                            type: 'select',
                            key: 'dateKey',
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                        },
                    ]}
                    buttonGroup={[
                        { onSearch: this.handleFormSearch },
                        { onDownload: this.handleFromDownload },
                    ]}
                />
                <div style={{ textAlign: 'right', paddingBottom: '10px' }}>
                    <Button onClick={() => this.handleShowEdit()} size="small" type="default">
                        生成物流单
                    </Button>
                </div>
                <BasicTable
                    columns={[
                        {
                            title: '发货地（供应商名称)',
                            dataIndex: 'col1',
                        },
                        {
                            title: '收货地（门店名称）',
                            dataIndex: 'col2',
                        },
                        {
                            title: 'skuID',
                            dataIndex: 'amount',
                            type: 'amount',
                        },
                        {
                            title: 'sku品名',
                            dataIndex: 'datecol',
                            type: 'date',
                        },
                        {
                            dataIndex: 'key-0',
                            title: '品类',
                        },
                        {
                            dataIndex: 'key-1',
                            title: '产区',
                        },
                        {
                            dataIndex: 'key-2',
                            title: '品种',
                        },
                        {
                            dataIndex: 'key-3',
                            title: '存储情况',
                        },
                        {
                            dataIndex: 'key-4',
                            title: '加工情况',
                        },
                        {
                            dataIndex: 'key-5',
                            title: '内包装',
                        },
                        {
                            dataIndex: 'key-6',
                            title: '外包装',
                        },
                        {
                            dataIndex: 'key-7',
                            title: '门店订货数量',
                        },
                        {
                            dataIndex: 'key-8',
                            title: '实际采购数量',
                        },
                        {
                            dataIndex: 'key-9',
                            title: '采购日期',
                        },
                        {
                            dataIndex: 'key-10',
                            title: '采购人员',
                        },
                        {
                            dataIndex: 'key-11',
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

export default LogisticsDispatchmanagement
