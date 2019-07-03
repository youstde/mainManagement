import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'

import { goodsBaseGet } from '@/services/common'

@connect(() => ({}))
class RepertoryStorewarehouse extends Component {
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
        const params = {
            t: 'goods.list',
            size: pagination.pageSize,
            index: pagination.current,
        }
        if (searchCondition.q) params.q = searchCondition.q
        // status: -1全部；1表示上架，0表示下架
        if (searchCondition.status !== undefined) params.status = searchCondition.status
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
                <SearchForm
                    data={[
                        {
                            label: '商品名称/批次编号',
                            type: 'input',
                            key: 'q',
                        },
                        {
                            label: '状态',
                            type: 'select',
                            options: [
                                { key: -1, value: '全部' },
                                { key: 0, value: '下架' },
                                { key: 1, value: '上架' },
                            ],
                            key: 'status',
                        },
                    ]}
                    buttonGroup={[
                        { onSearch: this.handleFormSearch },
                        // { onDownload: this.handleFromDownload }
                    ]}
                />
                <BasicTable
                    columns={[
                        {
                            title: '门店',
                            dataIndex: 'merchant_name',
                        },
                        {
                            title: '收货员',
                            dataIndex: 'operator',
                        },
                        {
                            title: '收货日期',
                            dataIndex: 'receive_time',
                        },
                        {
                            title: '商品批次Id',
                            dataIndex: 'serial_no',
                        },
                        {
                            dataIndex: 'skuid',
                            title: ' skuId',
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
                            dataIndex: 'specification_real',
                            title: '实际规格值',
                        },
                        {
                            dataIndex: 'weight_net',
                            title: '净重',
                        },
                        {
                            dataIndex: 'buy_date',
                            title: '采购日期',
                        },
                        {
                            dataIndex: 'buyer',
                            title: '采购员',
                        },
                        {
                            dataIndex: 'ship_date',
                            title: '发货日期',
                        },
                        {
                            dataIndex: 'logistics_name',
                            title: '物流公司',
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
                            dataIndex: 'vehicle_type',
                            title: '车辆类型',
                        },
                        {
                            dataIndex: 'vehicle_no',
                            title: '车牌号码',
                        },
                        {
                            dataIndex: 'quantity_original',
                            title: ' 门店订货数量',
                        },
                        {
                            dataIndex: 'quantity_receive',
                            title: '实际入库数量',
                        },
                    ]}
                    scroll={{ x: 3000 }}
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

export default RepertoryStorewarehouse
