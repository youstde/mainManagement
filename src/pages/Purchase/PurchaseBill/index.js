import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import Button from '@/components/Button'

// import { fetchFunction } from '@/services'
const fetchFunction = async () => ({ data: { list: [], count: 0 }, success: true })

@connect(() => ({}))
class PurchaseBillList extends Component {
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
                            label: '采购单号',
                            type: 'input',
                            key: 'inputKey',
                        },
                        {
                            label: '采购日期',
                            type: 'datepicker',
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                            key: 'selectKey',
                        },
                        {
                            label: '供应商',
                            type: 'select',
                            key: 'dateKey',
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                        },
                        {
                            label: '采购人员',
                            type: 'input',
                            key: 'rangedateKey',
                        },
                        {
                            label: '状态',
                            type: 'select',
                            key: 'status',
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                        },
                        {
                            label: 'sku品名',
                            type: 'select',
                            key: 'skuname',
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
                        生成采购单
                    </Button>
                </div>
                <BasicTable
                    columns={[
                        {
                            title: '采购单号',
                            dataIndex: 'col1',
                        },
                        {
                            title: '采购日期',
                            dataIndex: 'col2',
                        },
                        {
                            title: '采购供应商',
                            dataIndex: 'amount',
                            type: 'amount',
                        },
                        {
                            title: '采购人员',
                            dataIndex: 'datecol',
                            type: 'date',
                        },
                        {
                            dataIndex: 'key-0',
                            title: '采购总成本',
                        },
                        {
                            dataIndex: 'key-1',
                            title: '采购总件数',
                        },
                        {
                            dataIndex: 'key-2',
                            title: 'skuID',
                        },
                        {
                            dataIndex: 'key-3',
                            title: 'sku品名',
                        },
                        {
                            dataIndex: 'key-4',
                            title: '品类',
                        },
                        {
                            dataIndex: 'key-5',
                            title: '产区',
                        },
                        {
                            dataIndex: 'key-6',
                            title: '品种',
                        },
                        {
                            dataIndex: 'key-7',
                            title: '存储情况',
                        },
                        {
                            dataIndex: 'key-8',
                            title: '加工情况',
                        },
                        {
                            dataIndex: 'key-9',
                            title: '内包装',
                        },
                        {
                            dataIndex: 'key-10',
                            title: '外包装',
                        },
                        {
                            dataIndex: 'key-11',
                            title: '实际规格值',
                        },
                        {
                            dataIndex: 'key-12',
                            title: '净重',
                        },
                        {
                            dataIndex: 'key-13',
                            title: '采购单价',
                        },
                        {
                            dataIndex: 'key-14',
                            title: '采购成本',
                        },
                        {
                            dataIndex: 'key-15',
                            title: '订货门店名称',
                        },
                        {
                            dataIndex: 'key-16',
                            title: '对应订货数量',
                        },
                        {
                            dataIndex: 'key-17',
                            title: '采购单状态',
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

export default PurchaseBillList
