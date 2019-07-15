import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import BasicTable from '@/components/BasicTable'
import Button from '@/components/Button'
import { purchaseDetailColumns } from '@/pages/config/index'

import { orderBaseGet } from '@/services/common'

@connect(() => ({}))
class StoremanagementOrderDetail extends Component {
    state = {
        dataSrouce: [],
    }

    componentDidMount() {
        this.fetchData()
    }

    // 请求表格的数据
    fetchData = () => {
        const { serialNo } = this.props
        orderBaseGet({
            t: 'order.goods',
            serial_no: serialNo,
        }).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    dataSrouce: res.data,
                })
            }
        })
    }

    render() {
        const { dataSrouce } = this.state

        return (
            <PageHeaderWrapper>
                <BasicTable
                    columns={purchaseDetailColumns}
                    scroll={{ x: 1900 }}
                    dataSource={dataSrouce}
                />
            </PageHeaderWrapper>
        )
    }
}

export default StoremanagementOrderDetail
