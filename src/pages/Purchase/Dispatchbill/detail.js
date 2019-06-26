import React, { Component } from 'react'
import { connect } from 'dva'
import { Button } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import BasicTable from '@/components/BasicTable'

import { purchasePost } from '@/services/common'
import { createSignOptions } from '@/utils/utils'

@connect(() => ({}))
class DispatchBillDetail extends Component {
    state = {
        dataSrouce: [], // 表格数据
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        }, // 表格分页
    }

    componentDidMount() {
        console.log(this.props)
        const {
            location: { query },
        } = this.props
        this.fetchData(query.serialNo)
    }

    // 请求表格的数据
    fetchData = serialNo => {
        const { pagination } = this.state

        const params = {
            t: 'order.skus',
            serial_no: serialNo,
            index: pagination.current,
            size: pagination.pageSize,
        }
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

    goBack = () => {
        const { history } = this.props
        history.goBack()
    }

    render() {
        const { dataSrouce, pagination } = this.state

        return (
            <PageHeaderWrapper>
                <BasicTable
                    columns={[
                        {
                            dataIndex: 'skuid',
                            title: 'skuID',
                        },
                        {
                            dataIndex: 'name',
                            title: 'sku品名',
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
                            dataIndex: 'levels',
                            title: '等级',
                        },
                        {
                            dataIndex: 'brand_name',
                            title: '品牌',
                        },
                        {
                            dataIndex: 'specification_name',
                            title: '规格',
                        },
                        {
                            dataIndex: 'specification_value',
                            title: '规格值',
                        },
                    ]}
                    scroll={{ x: 1600 }}
                    dataSource={dataSrouce}
                    pagination={{
                        ...pagination,
                        onChange: this.handleChangePage,
                    }}
                />
                <div style={{ textAlign: 'center' }}>
                    <Button onClick={() => this.goBack()} type="primary">
                        返回
                    </Button>
                </div>
            </PageHeaderWrapper>
        )
    }
}

export default DispatchBillDetail
