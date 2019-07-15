import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import Button from '@/components/Button'
import Detail from './detail'

import { generalGet, orderBaseGet } from '@/services/common'

@connect(() => ({}))
class StoremanagementOrder extends Component {
    state = {
        visibleModal: false,
        activeSerialNo: '',
        storeData: [],
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
        this.fetchStoreData()
    }

    // 请求表格的数据
    fetchData = () => {
        const { pagination, searchCondition } = this.state
        console.log('searchCondition:', searchCondition)
        const params = {
            t: 'order.list',
            size: pagination.pageSize,
            index: pagination.current,
        }
        if (searchCondition.order_time) params.order_time = searchCondition.order_time
        if (searchCondition.mch_id) params.mch_id = searchCondition.mch_id
        if (searchCondition.mobile) params.mobile = searchCondition.mobile
        if (searchCondition.serial_no) params.serial_no = searchCondition.serial_no
        if (searchCondition.status !== undefined && searchCondition.status !== '')
            params.status = searchCondition.status
        console.log('params:', params)
        orderBaseGet(params).then(res => {
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

    handleShowDetail = id => {
        this.setState({
            activeSerialNo: id,
            visibleModal: true,
        })
    }

    handleModalCancel = () => {
        this.setState({
            visibleModal: false,
            activeSerialNo: '',
        })
    }

    render() {
        const { dataSrouce, pagination, storeData, activeSerialNo, visibleModal } = this.state
        console.log(dataSrouce)

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
                            label: '订单ID',
                            type: 'input',
                            key: 'serial_no',
                        },
                        {
                            label: '手机号',
                            type: 'input',
                            key: 'mobile',
                        },
                        {
                            label: '订单时间',
                            type: 'datepicker',
                            key: 'order_time',
                        },
                        {
                            label: '订单状态',
                            type: 'select',
                            key: 'status',
                            options: [{ key: 0, value: '未处理' }, { key: 1, value: '已处理' }],
                        },
                        {
                            key: 'mch_id',
                            label: '门店',
                            type: 'select',
                            options: createStoreOptions(),
                        },
                    ]}
                    buttonGroup={[
                        { onSearch: this.handleFormSearch },
                        // { onDownload: this.handleFromDownload },
                    ]}
                />
                <BasicTable
                    columns={[
                        {
                            title: '订单时间',
                            dataIndex: 'create_time',
                            type: 'date',
                        },
                        {
                            title: '订单Id',
                            dataIndex: 'serial_no',
                        },
                        {
                            title: '所属门店',
                            dataIndex: 'storeName',
                        },
                        {
                            title: '客户Id',
                            dataIndex: 'user_id',
                        },
                        {
                            dataIndex: 'mobile',
                            title: '客户电话',
                        },
                        {
                            dataIndex: 'contacter',
                            title: '客户姓名',
                        },
                        {
                            dataIndex: 'amount',
                            title: '订单金额',
                        },
                        {
                            dataIndex: 'paytype',
                            title: '支付方式',
                        },
                        {
                            dataIndex: 'status_desc',
                            title: '订单状态',
                        },
                        {
                            dataIndex: 'remark_user',
                            title: '用户备注',
                        },
                        {
                            dataIndex: 'remark_admin',
                            title: '管理备注',
                        },
                        {
                            type: 'oprate',
                            fixed: 'right',
                            render: (_, { serial_no: serialNo }) => {
                                return (
                                    <div>
                                        <Button
                                            onClick={() => this.handleShowDetail(serialNo)}
                                            size="small"
                                            type="default"
                                            style={{ marginBottom: '10px' }}
                                        >
                                            查看详情
                                        </Button>
                                    </div>
                                )
                            },
                        },
                    ]}
                    scroll={{ x: 1900 }}
                    dataSource={dataSrouce}
                    pagination={{
                        ...pagination,
                        onChange: this.handleChangePage,
                    }}
                />
                <Modal
                    width="90%"
                    title="订单详情"
                    destroyOnClose
                    visible={visibleModal}
                    onCancel={this.handleModalCancel}
                    footer={null}
                >
                    <Detail serialNo={activeSerialNo} />
                </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default StoremanagementOrder
