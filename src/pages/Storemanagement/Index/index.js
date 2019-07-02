import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal, message, Popconfirm } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import Button from '@/components/Button'
import BaseSwitch from '../components/BaseSwitch'
import SetAdmin from '../components/setAdmin'
import AddStore from './addStore'

import { storeBaseGet } from '@/services/common'
import { getPageQuery } from '@/utils/utils'

import { baseConfig } from '@/utils/baseConfig'

@connect(() => ({}))
class StoremanagementIndex extends Component {
    constructor(props) {
        super(props)
        this.baseSwitch = React.createRef()
    }

    state = {
        storeItemData: null,
        activeStoreId: '',
        visibleModal: false,
        visibleAddStoreModal: false,
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
        const query = getPageQuery()

        const options = {
            t: 'list',
            index: pagination.current,
            size: pagination.pageSize,
        }
        if (searchCondition.q || query.q) {
            options.q = searchCondition.q || query.q
        }
        storeBaseGet(options).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    dataSrouce: res.data,
                    pagination: {
                        ...pagination,
                        total: res.pages ? res.pages.count : 0,
                    },
                })
            }
        })
    }

    // 查询表单搜索
    handleFormSearch = (values, newQuery) => {
        const {
            location: { pathname },
            history,
        } = this.props
        console.log('newQuery:', newQuery, pathname)
        // TODO：将搜索条件同步到地址栏中
        // history.replace(`${pathname}${newQuery}`)
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

    toggleState = (checked, storeId) => {
        if (checked) {
            // 发送请求去启用
            storeBaseGet({
                t: 'status',
                id: storeId,
                action: 'enable',
            }).then(res => {
                if (res && res.errcode === 0) {
                    message.success('启用成功!', 2)
                    window.sendMessage('toggle:switch', false)
                    this.fetchData()
                }
            })
        } else {
            storeBaseGet({
                t: 'status',
                id: storeId,
                action: 'disable',
            }).then(res => {
                if (res && res.errcode === 0) {
                    message.success('禁用成功!', 2)
                    window.sendMessage('toggle:switch', false)
                    this.fetchData()
                }
            })
        }
    }

    handleCancel = () => {
        this.setState({
            visibleModal: false,
            activeStoreId: '',
        })
        this.fetchData()
    }

    deleteItem = storeId => {
        storeBaseGet({
            t: 'status',
            id: storeId,
            action: 'delete',
        }).then(res => {
            if (res && res.errcode === 0) {
                message.success('删除成功!', 2)
            }
            this.fetchData()
        })
    }

    handleShowDetail = storeId => {
        console.log('storeId:', storeId)
        this.setState({
            visibleModal: true,
            activeStoreId: storeId,
        })
    }

    showAddStore = () => {
        this.setState({
            visibleAddStoreModal: true,
        })
    }

    handleAddStoreCancel = () => {
        this.setState({
            visibleAddStoreModal: false,
            storeItemData: null,
        })
        this.fetchData()
    }

    handleShowEdit = storeItemData => {
        this.setState({
            storeItemData,
            visibleAddStoreModal: true,
        })
    }

    render() {
        const {
            dataSrouce,
            pagination,
            visibleModal,
            visibleAddStoreModal,
            activeStoreId,
            storeItemData,
        } = this.state
        const { toggleState, handleCancel } = this

        return (
            <PageHeaderWrapper>
                <SearchForm
                    data={[
                        {
                            label: '门店名称',
                            type: 'input',
                            key: 'q',
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <div style={{ textAlign: 'right', paddingBottom: '10px' }}>
                    <Button onClick={() => this.showAddStore()} size="small" type="default">
                        新增门店
                    </Button>
                </div>
                <BasicTable
                    columns={[
                        {
                            title: '门店名称',
                            dataIndex: 'name',
                        },
                        {
                            title: '门店地址',
                            dataIndex: 'address',
                            type: 'longText',
                        },
                        {
                            title: '门店负责人',
                            dataIndex: 'contacter',
                        },
                        {
                            title: '联系手机',
                            dataIndex: 'mobile',
                        },
                        {
                            dataIndex: 'storeType',
                            title: '门店类型',
                            render: (_, { level }) => <div>{baseConfig.mch_levels[level]}</div>,
                        },
                        {
                            dataIndex: 'state',
                            title: '状态',
                            render: (_, source) => {
                                return source ? (
                                    <div>
                                        <BaseSwitch
                                            dataSource={source}
                                            toggleStateBc={toggleState}
                                            ref={this.baseSwitch}
                                        />
                                    </div>
                                ) : (
                                    ''
                                )
                            },
                        },
                        {
                            type: 'oprate',
                            render: (_, storeData) => {
                                return (
                                    <div>
                                        <Button
                                            onClick={() => this.handleShowDetail(storeData.id)}
                                            size="small"
                                            type="default"
                                            style={{ marginBottom: '10px' }}
                                        >
                                            设置管理员
                                        </Button>
                                        <span>&nbsp;</span>
                                        <Button
                                            onClick={() => this.handleShowEdit(storeData)}
                                            size="small"
                                            type="default"
                                        >
                                            编辑
                                        </Button>
                                        <span>&nbsp;</span>
                                        <Popconfirm
                                            title="确定删除该门店吗?"
                                            onConfirm={() => this.deleteItem(storeData.id)}
                                            okText="确定"
                                            cancelText="取消"
                                        >
                                            <Button size="small" type="danger">
                                                删除
                                            </Button>
                                        </Popconfirm>
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
                    title="设置管理员"
                    destroyOnClose
                    visible={visibleModal}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <SetAdmin storeId={activeStoreId} handleCancel={handleCancel} />
                </Modal>
                <Modal
                    title={storeItemData ? '编辑' : '新增门店'}
                    destroyOnClose
                    visible={visibleAddStoreModal}
                    onCancel={this.handleAddStoreCancel}
                    footer={null}
                >
                    <AddStore
                        storeItemData={storeItemData || {}}
                        handleCancel={this.handleAddStoreCancel}
                    />
                </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default StoremanagementIndex
