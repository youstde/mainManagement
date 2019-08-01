import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'

import { baseStatisticsGet, generalGet } from '@/services/common'

@connect(() => ({}))
class StatisticsGoodsStatistics extends Component {
    state = {
        searchCondition: {}, // 搜索条件
        dataSrouce: [], // 表格数据
        merchantData: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        }, // 表格分页
    }

    componentDidMount() {
        this.fetchMerchantData()
        this.fetchData()
    }

    fetchMerchantData = () => {
        generalGet({
            t: 'merchants',
        }).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    merchantData: res.data,
                })
            }
        })
    }

    // 请求表格的数据
    fetchData = () => {
        const { pagination, searchCondition } = this.state
        const params = {
            t: 'stat.goods',
            size: pagination.pageSize,
            index: pagination.current,
        }
        if (searchCondition.mch_id) params.mch_id = searchCondition.mch_id
        baseStatisticsGet(params).then(res => {
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

    render() {
        const { dataSrouce, pagination, merchantData } = this.state

        function createStoreOptions() {
            const arr = merchantData.map(item => {
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
                            key: 'mch_id',
                            label: '选择门店',
                            type: 'select',
                            options: createStoreOptions(),
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <BasicTable
                    columns={[
                        {
                            title: '商品批次Id',
                            dataIndex: 'serial_no',
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
                            title: '品类',
                            dataIndex: 'category_name',
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
                            dataIndex: 'quantity_purchase',
                            title: '采购数量',
                        },
                        {
                            dataIndex: 'price_purchase',
                            title: '采购单价',
                        },
                        {
                            dataIndex: 'amount_purchase',
                            title: '采购成本',
                        },
                        {
                            dataIndex: 'price_logistics',
                            title: '物流平摊成本',
                        },
                        {
                            dataIndex: 'quantity_receive',
                            title: '门店入库数量',
                        },
                        {
                            dataIndex: 'amount_settlement',
                            title: '门店结算总价',
                        },
                        {
                            dataIndex: 'quantity_logistics_loss',
                            title: '物流损耗数',
                        },
                        {
                            dataIndex: 'amount_logistics_loss',
                            title: '物流损耗额',
                        },
                        {
                            dataIndex: 'rate_logistics_loss',
                            title: '损耗率',
                        },
                        {
                            dataIndex: 'amount_gross_profit',
                            title: '毛利额',
                        },
                        {
                            dataIndex: 'rate_gross_profit',
                            title: '毛利率',
                        },
                    ]}
                    scroll={{ x: 2300 }}
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

export default StatisticsGoodsStatistics
