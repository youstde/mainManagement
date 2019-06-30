import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'

// mock
// import OrderMock from '../mock/order'

// import { fetchFunction } from '@/services'
const fetchFunction = async () => ({ data: { list: [], count: 0 }, success: true })

@connect(() => ({}))
class StoremanagementOrder extends Component {
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
        // this.fetchData()
    }

    // 请求表格的数据
    fetchData = (parmas = {}) => {
        const { pageNum, ...params } = parmas
        const { pagination, searchCondition } = this.state

        fetchFunction({
            pageSize: pagination.pageSize,
            pageNum: pageNum || pagination.current,
            ...searchCondition,
            ...params,
        }).then(res => {
            if (res && res.success) {
                this.setState({
                    dataSrouce: res.data.list,
                    pagination: {
                        ...pagination,
                        total: res.data.count,
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
        console.log(dataSrouce)

        return (
            <PageHeaderWrapper>
                <SearchForm
                    data={[
                        {
                            label: '订单ID',
                            type: 'input',
                            key: 'orderId',
                        },
                        {
                            label: '手机号',
                            type: 'input',
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                            key: 'phone',
                        },
                        {
                            label: '订单时间',
                            type: 'datepicker',
                            key: 'orderDate',
                        },
                        {
                            label: '订单状态',
                            type: 'select',
                            key: 'orderState',
                            options: [{ key: 0, value: '未处理' }, { key: 1, value: '已处理' }],
                        },
                        {
                            key: 'storeName',
                            label: '门店',
                            type: 'select',
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                        },
                    ]}
                    buttonGroup={[
                        { onSearch: this.handleFormSearch },
                        { onDownload: this.handleFromDownload },
                    ]}
                />
                <BasicTable
                    columns={[
                        {
                            title: '订单时间',
                            dataIndex: 'orderDate',
                            type: 'date',
                        },
                        {
                            title: '订单Id',
                            dataIndex: 'orderId',
                        },
                        {
                            title: '所属门店',
                            dataIndex: 'storeName',
                        },
                        {
                            title: '客户Id',
                            dataIndex: 'userId',
                        },
                        {
                            dataIndex: 'userPhone',
                            title: '客户电话',
                        },
                        {
                            dataIndex: 'userName',
                            title: '客户姓名',
                        },
                        {
                            dataIndex: 'orderPrice',
                            title: '订单金额',
                        },
                        {
                            dataIndex: 'paymament',
                            title: '支付方式',
                        },
                        {
                            dataIndex: 'orderState',
                            title: '订单状态',
                        },
                        {
                            dataIndex: 'goodsId',
                            title: ' 商品批次Id',
                            type: 'longText',
                        },
                        {
                            dataIndex: 'skuName',
                            title: 'sku品名',
                        },
                        {
                            dataIndex: 'goodsClass',
                            title: '品类',
                        },
                        {
                            dataIndex: 'goodsArea',
                            title: '产区',
                        },
                        {
                            dataIndex: 'goodsType',
                            title: '品种',
                        },
                        {
                            dataIndex: 'storecase',
                            title: '存储情况',
                        },
                        {
                            dataIndex: 'processcase',
                            title: '加工情况',
                        },
                        {
                            dataIndex: 'outPackage',
                            title: '外包装',
                        },
                        {
                            dataIndex: 'innerPackage',
                            title: '内包装',
                        },
                        {
                            dataIndex: 'factSize',
                            title: ' 实际规格值',
                        },
                        {
                            dataIndex: 'clearWeight',
                            title: '净重',
                        },
                        {
                            dataIndex: 'buyDate',
                            title: '采购日期',
                        },
                        {
                            dataIndex: 'storePrice',
                            title: '门店结算价',
                        },
                        {
                            dataIndex: 'storeCurrentPriceSingle',
                            title: '门店在售价(单)',
                        },
                        {
                            dataIndex: 'buyNum',
                            title: '售出数量',
                        },
                        {
                            dataIndex: 'storeCurrentPriceAll',
                            title: '门店在售价(总)',
                        },
                        {
                            dataIndex: 'applybill',
                            title: '发票申请',
                        },
                        {
                            dataIndex: 'usermark',
                            title: '用户备注',
                        },
                        {
                            dataIndex: 'adminmark',
                            title: '管理备注',
                        },
                        {
                            type: 'oprate',
                            fixed: 'right',
                            buttons: [{ text: '查看' }, { text: '编辑' }],
                        },
                    ]}
                    scroll={{ x: 2800 }}
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

export default StoremanagementOrder
