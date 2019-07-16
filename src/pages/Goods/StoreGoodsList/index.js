import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'

import { generalGet, goodsBaseGet } from '@/services/common'

@connect(() => ({}))
class GoodsStoreGoodsList extends Component {
    state = {
        searchCondition: {}, // 搜索条件
        storeData: [],
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
        const params = {
            t: 'goods.list',
            size: pagination.pageSize,
            index: pagination.current,
        }
        if (searchCondition.q) params.q = searchCondition.q
        if (searchCondition.status !== undefined && searchCondition.status !== '')
            params.status = searchCondition.status
        goodsBaseGet(params).then(res => {
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
        const { dataSrouce, pagination, storeData } = this.state

        function createStoreOption() {
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
                            label: '输入名称/编号',
                            type: 'input',
                            key: 'q',
                        },
                        // {
                        //     label: '门店',
                        //     type: 'select',
                        //     options: createStoreOption(),
                        //     key: 'selectKey',
                        // },
                        {
                            label: '状态',
                            type: 'select',
                            initValue: '0',
                            options: [
                                { key: -1, value: '全部' },
                                { key: 0, value: '已下架' },
                                { key: 1, value: '已上架' },
                            ],
                            key: 'status',
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <BasicTable
                    columns={[
                        {
                            fixed: 'left',
                            title: '商品批次Id',
                            dataIndex: 'serial_no',
                            type: 'longText',
                        },
                        {
                            fixed: 'left',
                            title: '门店',
                            dataIndex: 'merchant_name',
                        },
                        {
                            title: 'skuId',
                            dataIndex: 'skuid',
                        },
                        {
                            title: 'sku品名',
                            dataIndex: 'name',
                        },
                        {
                            dataIndex: 'category_name',
                            title: '品类',
                        },
                        {
                            dataIndex: 'variety_name',
                            title: '品种',
                        },
                        {
                            dataIndex: 'region_name',
                            title: '产区',
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
                            dataIndex: 'specification_real',
                            title: '实际规格值',
                        },
                        {
                            dataIndex: 'weight_net',
                            title: '净重',
                        },
                        {
                            dataIndex: 'supplier_name',
                            title: '供应商',
                        },
                        {
                            dataIndex: 'buy_date',
                            title: '采购日期',
                        },
                        {
                            dataIndex: 'price_purchase',
                            title: '采购价',
                            type: 'amount',
                        },
                        {
                            dataIndex: 'price_settlement',
                            title: '门店结算价',
                            type: 'amount',
                        },
                        {
                            dataIndex: 'price_sale',
                            title: '门店在售价',
                            type: 'amount',
                        },
                        {
                            dataIndex: 'stock_now',
                            title: '库存',
                        },
                        {
                            fixed: 'right',
                            dataIndex: 'status_desc',
                            title: '上下架状态',
                        },
                    ]}
                    scroll={{ x: 2200 }}
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

export default GoodsStoreGoodsList
