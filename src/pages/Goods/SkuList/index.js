import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'

// mock
import skuListMock from '../mock/skulist'

// import { fetchFunction } from '@/services'
const fetchFunction = async () => ({ data: { list: [], count: 0 }, success: true })

@connect(() => ({}))
class GoodsSkuList extends Component {
    state = {
        searchCondition: {}, // 搜索条件
        dataSrouce: skuListMock || [], // 表格数据
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
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <BasicTable
                    columns={[
                        {
                            title: 'skuId',
                            dataIndex: 'skuId',
                        },
                        {
                            title: '商品图片',
                            dataIndex: 'goodsImg',
                        },
                        {
                            title: 'sku品名',
                            dataIndex: 'skuName',
                            type: 'longText',
                        },
                        {
                            title: '品类',
                            dataIndex: 'goodsClass',
                        },
                        {
                            dataIndex: 'goodsType',
                            title: '品种',
                        },
                        {
                            dataIndex: 'area',
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
                            dataIndex: 'outpackage',
                            title: '外包装',
                        },
                        {
                            dataIndex: 'innerpackage',
                            title: '内包装',
                        },
                        {
                            dataIndex: 'level',
                            title: '等级',
                        },
                        {
                            dataIndex: 'brand',
                            title: '品牌',
                        },
                        {
                            dataIndex: 'size',
                            title: '规格',
                        },
                        {
                            dataIndex: 'sizeNum',
                            title: '规格值',
                        },
                        {
                            type: 'oprate',
                            fixed: 'right',
                            buttons: [{ text: '查看' }, { text: '编辑' }],
                        },
                    ]}
                    scroll={{ x: 1200 }}
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

export default GoodsSkuList
