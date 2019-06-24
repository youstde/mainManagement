import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import Button from '@/components/Button'

import { goodsBaseGet } from '@/services/common'

@connect(() => ({}))
class GoodsSkuList extends Component {
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
    // 请求表格的数据
    fetchData = () => {
        const { pagination, searchCondition } = this.state
        const options = {
            t: 'sku.list',
            size: pagination.pageSize,
            index: pagination.current,
        }
        if (searchCondition.q) {
            options.q = searchCondition.q
        }
        goodsBaseGet(options).then(res => {
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

    editSome = id => {
        const { history } = this.props
        history.push(`/goods/skuedit?id=${id}`)
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
                            key: 'q',
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <BasicTable
                    columns={[
                        {
                            title: 'skuId',
                            dataIndex: 'skuid',
                        },
                        {
                            title: '商品图片',
                            dataIndex: 'goodsImg',
                        },
                        {
                            title: 'sku品名',
                            dataIndex: 'name',
                            type: 'longText',
                        },
                        {
                            title: '品类',
                            dataIndex: 'category_name',
                        },
                        {
                            dataIndex: 'variety_name',
                            title: '品种',
                        },
                        {
                            dataIndex: 'region_name',
                            title: '产区',
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
                        {
                            type: 'oprate',
                            fixed: 'right',
                            render: (_, item) => {
                                return (
                                    <div>
                                        <Button
                                            onClick={() => this.editSome(item.skuid)}
                                            size="small"
                                            type="default"
                                        >
                                            编辑
                                        </Button>
                                        <span>&nbsp;</span>
                                        <Button
                                            onClick={() => this.handleShowDetail(item)}
                                            size="small"
                                            type="default"
                                        >
                                            查看
                                        </Button>
                                    </div>
                                )
                            },
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

export default GoodsSkuList
