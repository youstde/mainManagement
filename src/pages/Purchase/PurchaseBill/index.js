import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import Button from '@/components/Button'

import { purchasePost, configurationGet, goodsBaseGet } from '@/services/common'
import { createSignOptions, clearDate } from '@/utils/utils'

@connect(() => ({}))
class PurchaseBillList extends Component {
    state = {
        providerCid: 'A2CDF5CDE38BEFEB3E',
        providerData: [],
        skuData: [],
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
        this.fetchProviderData()
        this.fetchSkuData()
    }

    // 请求表格的数据
    fetchData = () => {
        const { pagination, searchCondition } = this.state

        const params = {
            t: 'orders',
            index: pagination.current,
            size: pagination.pageSize,
        }
        if (searchCondition.supplier_id) params.supplier_id = searchCondition.supplier_id
        if (searchCondition.date) params.date = clearDate(searchCondition.date)
        if (searchCondition.status !== '') params.status = searchCondition.status
        if (searchCondition.skuid) params.skuid = searchCondition.skuid
        if (searchCondition.buyer) params.buyer = searchCondition.buyer
        createSignOptions(params)
        const formData = new FormData()
        Object.keys(params).forEach(key => {
            formData.append(key, params[key])
        })
        purchasePost('', formData).then(res => {
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

    fetchSkuData = () => {
        goodsBaseGet({
            t: 'sku.list',
        }).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    skuData: res.data,
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
        history.push(`/purchase/purchasebill/detail?serialNo=${serialNo}`)
    }

    handleProviderChange = value => {
        console.log(`selected ${value}`)
    }

    render() {
        const { dataSrouce, pagination, providerData, skuData } = this.state

        function createRoleOptions() {
            const roleOptions = providerData.map(item => {
                return {
                    key: item.id,
                    value: item.name,
                }
            })
            return roleOptions
        }

        function createSkuOptions() {
            const skuOptions = skuData.map(item => {
                return {
                    key: item.skuid,
                    value: item.name,
                }
            })
            return skuOptions
        }

        return (
            <PageHeaderWrapper>
                <SearchForm
                    data={[
                        // {
                        //     label: '采购单号',
                        //     type: 'input',
                        //     key: 'q',
                        // },
                        {
                            label: '采购日期',
                            type: 'datepicker',
                            key: 'date',
                        },
                        {
                            label: '供应商',
                            type: 'select',
                            key: 'supplier_id',
                            options: createRoleOptions(),
                        },
                        {
                            label: '采购人员',
                            type: 'input',
                            key: 'buyer',
                        },
                        {
                            label: '状态',
                            type: 'select',
                            key: 'status',
                            options: [{ key: 0, value: '未处理' }, { key: 1, value: '已处理' }],
                        },
                        {
                            label: 'sku品名',
                            type: 'select',
                            key: 'skuid',
                            options: createSkuOptions(),
                        },
                    ]}
                    buttonGroup={[
                        { onSearch: this.handleFormSearch },
                        { onDownload: this.handleFromDownload },
                    ]}
                />
                <div style={{ textAlign: 'right', paddingBottom: '10px' }}>
                    <Button onClick={() => this.handleShowEdit()} size="small" type="default">
                        生成发货单
                    </Button>
                </div>
                <BasicTable
                    columns={[
                        {
                            title: '采购单号',
                            dataIndex: 'serial_no',
                        },
                        {
                            title: '采购日期',
                            dataIndex: 'buy_date',
                        },
                        {
                            title: '采购供应商',
                            dataIndex: 'supplier_name',
                        },
                        {
                            title: '采购人员',
                            dataIndex: 'buyer',
                        },
                        {
                            dataIndex: 'cost_total',
                            title: '采购总成本',
                        },
                        {
                            dataIndex: 'quantity_total',
                            title: '采购总件数',
                        },
                        {
                            title: '采购单状态',
                            render: (_, { status }) => {
                                let text = '未处理'
                                if (status !== 0) text = '已处理'
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
