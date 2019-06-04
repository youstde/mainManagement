import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import Button from '@/components/Button'
import GoodsSpuEdit from './edit'

// mock
import spuListMock from '../mock/spulist'

// import { fetchFunction } from '@/services'
const fetchFunction = async () => ({ data: { list: [], count: 0 }, success: true })

@connect(() => ({}))
class GoodsSpuList extends Component {
    state = {
        showDetail: false,
        showEdit: false,
        searchCondition: {}, // 搜索条件
        dataSrouce: spuListMock || [], // 表格数据
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

    handleShowDetail = () => {
        this.setState({
            showDetail: true,
        })
    }

    handleHideDetail = () => {
        this.setState({
            showDetail: false,
        })
    }

    handleHideEdit = () => {
        this.setState({
            showEdit: false,
        })
    }

    editSome = () => {
        this.setState({
            showEdit: true,
        })
    }

    render() {
        const { dataSrouce, pagination, showEdit, showDetail } = this.state

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
                            title: 'spuId',
                            dataIndex: 'spuId',
                        },
                        {
                            title: '商品图片',
                            dataIndex: 'goodsImg',
                        },
                        {
                            title: 'spu品名',
                            dataIndex: 'spuName',
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
                            type: 'oprate',
                            render: () => {
                                return (
                                    <div>
                                        <Button
                                            onClick={() => this.editSome()}
                                            size="small"
                                            type="default"
                                        >
                                            编辑
                                        </Button>
                                        <span>&nbsp;</span>
                                        <Button
                                            onClick={() => this.handleShowDetail()}
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
                    dataSource={dataSrouce}
                    pagination={{
                        ...pagination,
                        onChange: this.handleChangePage,
                    }}
                />
                <Modal
                    title="编辑spu信息"
                    footer={null}
                    width={680}
                    destroyOnClose
                    visible={showEdit}
                    onCancel={this.handleHideEdit}
                >
                    <GoodsSpuEdit />
                </Modal>
                <Modal
                    title="spu信息"
                    footer={null}
                    width={680}
                    destroyOnClose
                    visible={showDetail}
                    onCancel={this.handleHideDetail}
                >
                    <GoodsSpuEdit />
                </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default GoodsSpuList
