import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import Button from '@/components/Button'

import {
    deliversPost,
    goodsBaseGet,
    configurationGet,
    storeBaseGet,
    generalGet,
} from '@/services/common'
import { createSignOptions, clearDate } from '@/utils/utils'

@connect(() => ({}))
class PurchaseDispatchbillList extends Component {
    state = {
        searchCondition: {}, // 搜索条件
        dataSrouce: [], // 表格数据
        skuData: [],
        storeData: [],
        providerCid: 'A2CDF5CDE38BEFEB3E',
        providerData: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        }, // 表格分页
    }

    componentDidMount() {
        this.fetchData()
        this.fetchSkuData()
        this.fetchProviderData()
        this.fetchStoreData()
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

    fetchSkuData = () => {
        generalGet({
            t: 'skus',
        }).then(res => {
            this.setState({
                skuData: res.data,
            })
        })
    }

    fetchProviderData = () => {
        const { providerCid } = this.state
        configurationGet({
            t: 'values',
            cid: providerCid,
        }).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    providerData: res.data[providerCid],
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
        const { dataSrouce, pagination, skuData, providerData, storeData } = this.state

        function createSkuOptions() {
            const arr = skuData.map(item => {
                return {
                    key: item.value,
                    value: item.text,
                }
            })
            return arr
        }

        function createOptions(data) {
            const arr = data.map(item => {
                return {
                    key: item.id,
                    value: item.name,
                }
            })
            return arr
        }

        function createStoreOptions() {
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
                            label: ' sku品名',
                            type: 'select',
                            options: createSkuOptions(),
                            key: 'skuid',
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
                            options: [{ key: 0, value: '未处理' }, { key: 1, value: '已处理' }],
                        },
                        {
                            key: 'supplier_id',
                            label: '供应商',
                            type: 'select',
                            options: createOptions(providerData || []),
                        },
                        {
                            key: 'mch_id',
                            label: '订货门店',
                            type: 'select',
                            options: createStoreOptions(),
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
