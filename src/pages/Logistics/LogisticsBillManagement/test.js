import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal, message } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import BasicTable from '@/components/BasicTable'
import Button from '@/components/Button'

import { logisticsGet, storeBaseGet } from '@/services/common'

@connect(() => ({}))
class PropertyClassTestManagement extends Component {
    state = {
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
    // fetchData = () => {
    //     const { pagination } = this.state
    //     const params = {
    //         t: 'orders',
    //         index: pagination.current,
    //         size: pagination.pageSize,
    //     }
    //     logisticsGet(params).then(res => {
    //         if (res && res.errcode === 0) {
    //             this.setState({
    //                 dataSrouce: res.data,
    //                 pagination: {
    //                     ...pagination,
    //                     total: res.pages.count,
    //                 },
    //             })
    //         }
    //     })
    // }

    // 请求表格的数据
    fetchData = () => {
        const { pagination, searchCondition } = this.state

        const options = {
            t: 'list',
            index: pagination.current,
            size: pagination.pageSize,
        }
        storeBaseGet(options).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    dataSrouce: res.data,
                    pagination: {
                        ...pagination,
                        total: res.pages ? res.pages.count : 0,
                    },
                })
            }
        })
    }

    render() {
        const { dataSrouce, pagination } = this.state

        return (
            <PageHeaderWrapper>
                <BasicTable
                    columns={[
                        {
                            title: '批次号',
                            dataIndex: 'id',
                        },
                        {
                            title: '物流单号',
                            dataIndex: 'serial_no',
                        },
                        {
                            title: '发货日期',
                            dataIndex: 'ship_date',
                        },
                        {
                            title: '物流公司',
                            dataIndex: 'logistics_name',
                        },
                        {
                            dataIndex: 'cost_total',
                            title: '物流成本',
                        },
                        {
                            dataIndex: 'vehicle_type',
                            title: '车辆类型',
                        },
                        {
                            dataIndex: 'vehicle_no',
                            title: '车牌号码',
                        },
                        {
                            dataIndex: 'driver_name',
                            title: '驾驶员姓名',
                        },
                        {
                            dataIndex: 'driver_mobile',
                            title: '驾驶员联系方式',
                        },
                        {
                            dataIndex: 'supplier_address',
                            title: '发货地',
                        },
                        {
                            dataIndex: 'mch_address',
                            title: '收货地',
                        },
                        {
                            dataIndex: 'arrive_date',
                            title: '预计到达时间',
                        },
                        {
                            fixed: 'right',
                            type: 'oprate',
                            buttons: [{ text: '查看详情' }, { text: '编辑' }],
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

export default PropertyClassTestManagement
