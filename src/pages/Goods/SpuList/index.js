import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import Button from '@/components/Button'
import Detail from './detail'

import { goodsBaseGet } from '@/services/common'

// mock
import spuListMock from '../mock/spulist'

@connect(() => ({}))
class GoodsSpuList extends Component {
    state = {
        activeId: '',
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
        this.fetchData()
    }

    // 请求表格的数据
    fetchData = () => {
        const { pagination, searchCondition } = this.state
        const options = {
            t: 'spu.list',
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

    handleShowDetail = id => {
        this.setState({
            showDetail: true,
            activeId: id,
        })
    }

    handleHideDetail = () => {
        this.setState({
            showDetail: false,
            activeId: '',
        })
    }

    editSome = id => {
        const { history } = this.props
        history.push(`/goods/spuedit?id=${id}`)
    }

    render() {
        const { dataSrouce, pagination, showEdit, showDetail, activeId } = this.state

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
                            title: 'spuId',
                            dataIndex: 'spuid',
                        },
                        {
                            title: '商品图片',
                            dataIndex: 'goodsImg',
                            render: (_, { pictures }) => {
                                const imgArr =
                                    pictures &&
                                    pictures.map((item, i) => {
                                        return <img src={item.url} alt="" key={i} />
                                    })
                                return imgArr
                            },
                        },
                        {
                            title: 'spu品名',
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
                            type: 'oprate',
                            render: (_, { spuid: itemId }) => {
                                return (
                                    <div>
                                        <Button
                                            onClick={() => this.editSome(itemId)}
                                            size="small"
                                            type="default"
                                        >
                                            编辑
                                        </Button>
                                        <span>&nbsp;</span>
                                        <Button
                                            onClick={() => this.handleShowDetail(itemId)}
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
                    title="spu信息"
                    footer={null}
                    width={680}
                    destroyOnClose
                    visible={showDetail}
                    onCancel={this.handleHideDetail}
                >
                    <Detail activeId={activeId} />
                </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default GoodsSpuList
