import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'

// mock
import storeGoodsListMock from '../mock/storegoodslist'

// import { fetchFunction } from '@/services'
const fetchFunction = async () => ({ data: { list: [], count: 0 }, success: true })

@connect(() => ({}))
class GoodsStoreGoodsList extends Component {
    state = {
        searchCondition: {}, // 搜索条件
        dataSrouce: storeGoodsListMock || [], // 表格数据
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

        return (
            <PageHeaderWrapper>
                <SearchForm
                    data={[
                        {
                            label: '输入名称/编号',
                            type: 'input',
                            key: 'searchKey',
                        },
                        {
                            label: '门店',
                            type: 'select',
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                            key: 'selectKey',
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <BasicTable
                    columns={[
                        {
                            fixed: 'left',
                            title: '商品批次Id',
                            dataIndex: 'goodsId',
                            type: 'longText',
                        },
                        {
                            fixed: 'left',
                            title: '门店',
                            dataIndex: 'storeName',
                        },
                        {
                            title: 'skuId',
                            dataIndex: 'skuId',
                        },
                        {
                            title: 'sku品名',
                            dataIndex: 'skuName',
                        },
                        {
                            dataIndex: 'goodsClass',
                            title: '品类',
                        },
                        {
                            dataIndex: 'goodsType',
                            title: '品种',
                        },
                        {
                            dataIndex: 'goodsArea',
                            title: '产区',
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
                            title: '实际规格值',
                        },
                        {
                            dataIndex: 'clearWeight',
                            title: '净重',
                        },
                        {
                            dataIndex: 'provider',
                            title: '供应商',
                        },
                        {
                            dataIndex: 'orderDate',
                            title: '采购日期',
                        },
                        {
                            dataIndex: 'buySinglePrice',
                            title: '采购单价',
                            type: 'amount',
                        },
                        {
                            dataIndex: 'storePrice',
                            title: '门店结算价',
                            type: 'amount',
                        },
                        {
                            dataIndex: 'storeCurrentPriceAll',
                            title: '门店在售价',
                            type: 'amount',
                        },
                        {
                            dataIndex: 'inventory',
                            title: '库存',
                        },
                        {
                            fixed: 'right',
                            dataIndex: 'state',
                            title: '上下架状态',
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

export default GoodsStoreGoodsList
