import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import Button from '@/components/Button'
import BaseSwitch from '../components/BaseSwitch'
import SetAdmin from '../components/setAdmin'

// mock
import indexMock from '../mock/index'

// import { fetchFunction } from '@/services'
const fetchFunction = async () => ({ data: { list: [], count: 0 }, success: true })

@connect(() => ({}))
class StoremanagementIndex extends Component {
    constructor(props) {
        super(props)
        this.baseSwitch = React.createRef()
    }

    state = {
        visibleModal: false,
        searchCondition: {}, // 搜索条件
        dataSrouce: indexMock || [], // 表格数据
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

    toggleState = checked => {
        const { dataSrouce } = this.state
        // const { current: { closeLoading } } = this.baseSwitch

        if (checked) {
            // 发送请求去启用
            setTimeout(() => {
                dataSrouce[0].state = 1
                this.setState(
                    {
                        dataSrouce,
                    },
                    () => {
                        window.sendMessage('toggle:switch', false)
                    }
                )
            }, 1e3)
        } else {
            setTimeout(() => {
                dataSrouce[0].state = 0
                this.setState(
                    {
                        dataSrouce,
                    },
                    () => {
                        window.sendMessage('toggle:switch', false)
                    }
                )
            }, 1e3)
        }
    }

    handleCancel = () => {
        this.setState({
            visibleModal: false,
        })
    }

    deleteItem = () => {}

    handleShowDetail = () => {
        this.setState({
            visibleModal: true,
        })
    }

    render() {
        const { dataSrouce, pagination, visibleModal } = this.state
        const { toggleState, handleCancel } = this

        return (
            <PageHeaderWrapper>
                <SearchForm
                    data={[
                        {
                            label: '门店名称',
                            type: 'input',
                            key: 'storeName',
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <BasicTable
                    columns={[
                        {
                            title: '门店名称',
                            dataIndex: 'storeName',
                        },
                        {
                            title: '门店地址',
                            dataIndex: 'storeAdress',
                            type: 'longText',
                        },
                        {
                            title: '门店负责人',
                            dataIndex: 'storeAdmin',
                        },
                        {
                            title: '联系手机',
                            dataIndex: 'phone',
                        },
                        {
                            dataIndex: 'storeType',
                            title: '门店类型',
                        },
                        {
                            dataIndex: 'state',
                            title: '状态',
                            render: state => (
                                <div>
                                    <BaseSwitch
                                        state={state}
                                        toggleStateBc={toggleState}
                                        ref={this.baseSwitch}
                                    />
                                </div>
                            ),
                        },
                        {
                            type: 'oprate',
                            render: () => {
                                return (
                                    <div>
                                        <Button
                                            onClick={() => this.handleShowDetail()}
                                            size="small"
                                            type="default"
                                        >
                                            设置管理员
                                        </Button>
                                        <span>&nbsp;</span>
                                        <Button
                                            onClick={() => this.deleteItem()}
                                            size="small"
                                            type="danger"
                                        >
                                            删除
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
                    title="设置管理员"
                    destroyOnClose
                    visible={visibleModal}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <SetAdmin handleCancel={handleCancel} />
                </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default StoremanagementIndex
