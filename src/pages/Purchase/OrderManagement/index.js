import React, { Component } from 'react'
import { connect } from 'dva'
import { message } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import Button from '@/components/Button'

import { goodsBaseGet, storeBaseGet, generalGet } from '@/services/common'
import { clearDate } from '@/utils/utils'

@connect(() => ({}))
class PurchaseOrderManagement extends Component {
    state = {
        storeData: [],
        selectedRowKeys: [],
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
        this.fetchStoreData()
    }

    // 请求表格的数据
    fetchData = () => {
        const { pagination, searchCondition } = this.state

        const options = {
            t: 'purchase.skus',
            pageSize: pagination.pageSize,
            pageNum: pagination.current,
        }

        if (searchCondition.q) {
            options.q = searchCondition.q
        }
        if (searchCondition.mch_id) {
            options.mch_id = searchCondition.mch_id
        }
        if (searchCondition.date) {
            options.date = clearDate(searchCondition.date)
        }
        if (searchCondition.status) {
            options.status = searchCondition.status
        }

        goodsBaseGet(options).then(res => {
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

    fetchStoreData = () => {
        generalGet({
            t: 'merchants',
        }).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    storeData: res.data,
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
        const { dataSrouce } = this.state
        let tag = true
        const index = selectedRowKeys.length - 1
        dataSrouce.forEach(item => {
            if (item.id === selectedRowKeys[index]) {
                if (item.status !== 0) tag = false
            }
        })
        if (tag) {
            this.setState({ selectedRowKeys })
        }
        console.log(selectedRowKeys)
    }

    // 生成采购单
    createOrder = () => {
        const { selectedRowKeys } = this.state
        const { history } = this.props
        if (selectedRowKeys.length) {
            let str = ''
            selectedRowKeys.forEach(item => {
                str += `${item}_`
            })
            str = str.replace(/_$/, '')
            history.push(`/purchase/createorder?ids=${str}`)
        } else {
            message.warning('请勾选你需要生成采购单的订单!')
        }
    }

    // 手动生成采购单
    manualCreateOrder = () => {
        const { history } = this.props
        history.push('/purchase/manualcreateorder')
    }

    render() {
        const { dataSrouce, pagination, selectedRowKeys, storeData } = this.state

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        }
        function createStrorOption() {
            const arr = storeData.map(item => {
                return {
                    key: item.value,
                    value: item.text,
                }
            })
            return arr
        }

        return (
            <PageHeaderWrapper>
                <SearchForm
                    data={[
                        {
                            label: 'sku id/品名',
                            type: 'input',
                            key: 'q',
                        },
                        {
                            label: '门店',
                            type: 'select',
                            options: createStrorOption(),
                            key: 'mch_id',
                        },
                        {
                            label: '订货时间',
                            type: 'datepicker',
                            key: 'date',
                        },
                        {
                            label: '状态',
                            type: 'select',
                            key: 'status',
                            options: [{ key: 0, value: '未处理' }, { key: 1, value: '已处理' }],
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <div style={{ textAlign: 'right', paddingBottom: '10px' }}>
                    <Button onClick={() => this.manualCreateOrder()} size="small" type="default">
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
                            dataIndex: 'create_time',
                            type: 'date',
                            // format: 'YYYY-MM-DD',
                        },
                        {
                            title: '订货门店',
                            dataIndex: 'merchant_name',
                        },
                        {
                            title: 'skuId',
                            dataIndex: 'skuid',
                        },
                        {
                            title: 'sku品名',
                            dataIndex: 'name',
                            type: 'longText',
                        },
                        {
                            dataIndex: 'category_name',
                            title: '品类',
                        },
                        {
                            dataIndex: 'region_name',
                            title: '产区',
                        },
                        {
                            dataIndex: 'variety_name',
                            title: '品种',
                        },
                        {
                            dataIndex: 'storage_name',
                            title: '存储情况',
                        },
                        {
                            dataIndex: 'process_name',
                            title: '加工情况',
                        },
                        {
                            dataIndex: 'packing_name_a',
                            title: '外包装',
                        },
                        {
                            dataIndex: 'packing_name_b',
                            title: '内包装',
                        },
                        {
                            dataIndex: 'quantity',
                            title: '订货数量',
                        },
                        {
                            title: '状态',
                            fixed: 'right',
                            render: (_, { status }) => {
                                let text = '未处理'
                                if (status !== 0) {
                                    text = '已处理'
                                }
                                return <p>{text}</p>
                            },
                        },
                    ]}
                    rowKey={record => record.id}
                    scroll={{ x: 1600 }}
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
