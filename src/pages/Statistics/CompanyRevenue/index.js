import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'

import { baseStatisticsGet } from '@/services/common'

@connect(() => ({}))
class StatisticsCompanyRevenue extends Component {
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

        baseStatisticsGet({
            t: 'stat.revenue',
            size: pagination.pageSize,
            index: pagination.current,
        }).then(res => {
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
        const { dataSrouce, pagination } = this.state

        return (
            <PageHeaderWrapper>
                <BasicTable
                    columns={[
                        {
                            title: '日期',
                            dataIndex: 'date',
                        },
                        {
                            title: '销售总收入',
                            dataIndex: 'amount_sale',
                        },
                        {
                            title: '门店结算总额',
                            dataIndex: 'amount_settlement',
                        },
                        {
                            title: '对应采购成本',
                            dataIndex: 'amount_purchase',
                        },
                        {
                            dataIndex: 'amount_logistics',
                            title: '对应物流成本',
                        },
                        // {
                        //     dataIndex: 'amount_loss_total',
                        //     title: '总仓损耗额',
                        // },
                        {
                            dataIndex: 'amount_loss_mch',
                            title: '门店损耗额',
                        },
                        {
                            dataIndex: 'amount_gross_profit',
                            title: '公司毛利额',
                        },
                        {
                            dataIndex: 'rate_gross_profit',
                            title: '公司毛利率',
                        },
                        {
                            dataIndex: 'amount_gross_profit_4',
                            title: '公司四毛额',
                        },
                        {
                            dataIndex: 'rate_gross_profit_4',
                            title: '公司四毛率',
                        },
                    ]}
                    scroll={{ x: 1600 }}
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

export default StatisticsCompanyRevenue
