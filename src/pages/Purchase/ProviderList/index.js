import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal, Popconfirm, message } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import Button from '@/components/Button'
import AddProvider from './addProvider'

// mock
import ProviderListMock from '../mock/providerlist'

// import { fetchFunction } from '@/services'
const fetchFunction = async () => ({ data: { list: [], count: 0 }, success: true })

@connect(() => ({}))
class PurchaseProviderList extends Component {
    state = {
        editItem: null,
        showEdit: false,
        searchCondition: {}, // 搜索条件
        dataSrouce: ProviderListMock || [], // 表格数据
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

    handleHideEdit = () => {
        this.setState({
            showEdit: false,
            editItem: null,
        })
    }

    editSome = data => {
        if (data) {
            // 此时有数据回填
            this.setState({
                showEdit: true,
                editItem: data,
            })
        } else {
            this.setState({
                showEdit: true,
                editItem: null,
            })
        }
    }

    // 删除某个供应商
    deleteItem = () => {}

    render() {
        const { dataSrouce, pagination, showEdit, editItem } = this.state

        function confirmdelete() {
            message.success('删除成功')
        }

        return (
            <PageHeaderWrapper>
                <SearchForm
                    data={[
                        {
                            label: ' 供应商',
                            type: 'input',
                            key: 'providerkey',
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <div style={{ textAlign: 'right', paddingBottom: '10px' }}>
                    <Button onClick={() => this.editSome()} size="small" type="default">
                        新增供应商
                    </Button>
                </div>
                <BasicTable
                    columns={[
                        {
                            title: '供应商名称',
                            dataIndex: 'providerName',
                        },
                        {
                            title: '供应品类',
                            dataIndex: 'providerClass',
                            render: (_, { providerClass }) => {
                                const arr = providerClass.map(item => <p key={item}>{item}</p>)
                                return <div>{arr}</div>
                            },
                        },
                        {
                            title: '供应商地址',
                            dataIndex: 'providerAdress',
                            type: 'longText',
                        },
                        {
                            title: '供应商联系人',
                            dataIndex: 'providerLinkPeople',
                        },
                        {
                            dataIndex: 'providerPhone',
                            title: '供应商联系电话',
                        },
                        {
                            dataIndex: 'settleTimer',
                            title: '结算周期',
                        },
                        {
                            dataIndex: 'bankAccount',
                            title: '银行账户',
                        },
                        {
                            dataIndex: 'bank',
                            title: '开户行',
                        },
                        {
                            dataIndex: 'bankNum',
                            title: '银行账号',
                        },
                        {
                            type: 'oprate',
                            render: (_, dataItem) => {
                                return (
                                    <div style={{ lineHeight: 2 }}>
                                        <Button
                                            onClick={() => this.editSome(dataItem)}
                                            size="small"
                                            type="default"
                                        >
                                            编辑
                                        </Button>
                                        <span>&nbsp;</span>
                                        <Popconfirm
                                            title="确定删除该供应商吗?"
                                            onConfirm={confirmdelete}
                                            okText="确定"
                                            cancelText="取消"
                                        >
                                            <Button
                                                onClick={() => this.deleteItem()}
                                                size="small"
                                                type="danger"
                                            >
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
                    title={editItem ? '编辑供应商信息' : '添加供应商'}
                    footer={null}
                    width={680}
                    destroyOnClose
                    visible={showEdit}
                    onCancel={this.handleHideEdit}
                >
                    <AddProvider data={editItem || {}} cancelModal={this.handleHideEdit} />
                </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default PurchaseProviderList
