import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'

import { baseStatisticsGet, generalGet } from '@/services/common'

@connect(() => ({}))
class StatisticsMerchantStatistics extends Component {
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
            t: 'stat.merchant',
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
                            title: '日期',
                            dataIndex: 'date',
                        },
                        {
                            title: '门店ID',
                            dataIndex: 'mch_id',
                        },
                        {
                            title: '门店名称',
                            dataIndex: 'mch_name',
                        },
                        {
                            title: '门店销售总额',
                            dataIndex: 'amount_sale',
                        },
                        {
                            buttons: [{ text: '查看详情' }, { text: '编辑' }],
                            title: '门店损耗额',
                            dataIndex: 'amount_loss',
                        },
                        {
                            dataIndex: 'amount_settlement',
                            title: '对应结算成本总额',
                        },
                        {
                            dataIndex: 'rate_gross_profit',
                            title: '毛利率',
                        },
                        {
                            dataIndex: 'amount_gross_profit',
                            title: '毛利额',
                        },
                        {
                            dataIndex: 'rate_gross_profit_4',
                            title: '四毛率',
                        },
                        {
                            dataIndex: 'amount_gross_profit_4',
                            title: '四毛额',
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

export default StatisticsMerchantStatistics
