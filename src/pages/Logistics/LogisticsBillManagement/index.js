import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
// import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import Button from '@/components/Button'

import { logisticsPost } from '@/services/common'
import { createSignOptions } from '@/utils/utils'

@connect(() => ({}))
class LogisticsBillManagement extends Component {
    state = {
        // searchCondition: {}, // 搜索条件
        dataSrouce: [], // 表格数据
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        }, // 表格分页
    }

    componentDidMount() {
        console.log(111)
        this.fetchData()
    }

    // 请求表格的数据
    fetchData = () => {
        const { pagination } = this.state
        const params = {
            t: 'orders',
            index: pagination.current,
            size: pagination.pageSize,
        }
        createSignOptions(params)
        const formData = new FormData()
        Object.keys(params).forEach(key => {
            formData.append(key, params[key])
        })
        logisticsPost('', formData).then(res => {
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
    // handleFormSearch = values => {
    //     const { pagination } = this.state

    //     this.setState(
    //         {
    //             searchCondition: values,
    //             pagination: {
    //                 ...pagination,
    //                 current: 1,
    //             },
    //         },
    //         () => {
    //             this.fetchData()
    //         }
    //     )
    // }

    // 查询表单下载
    // handleFromDownload = values => {}

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
        history.push(`/logistics/logisticsbillmanagement/detail?serialNo=${serialNo}`)
    }

    render() {
        const { dataSrouce, pagination } = this.state

        return (
            <PageHeaderWrapper>
                {/* <SearchForm
                    data={[
                        {
                            label: '发货日期',
                            type: 'datepicker',
                            key: 'inputKey',
                        },
                        {
                            label: '发货地',
                            type: 'input',
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                            key: 'selectKey',
                        },
                        {
                            label: '收货地',
                            type: 'input',
                            key: 'dateKey',
                        },
                        {
                            label: '车牌号码',
                            type: 'input',
                            key: 'rangedateKey',
                        },
                    ]}
                    buttonGroup={[
                        { onSearch: this.handleFormSearch },
                        { onDownload: this.handleFromDownload },
                    ]}
                /> */}
                <BasicTable
                    columns={[
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
                    scroll={{ x: 2100 }}
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

export default LogisticsBillManagement
