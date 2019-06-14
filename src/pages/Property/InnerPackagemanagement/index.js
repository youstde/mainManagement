import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal, message } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import Button from '@/components/Button'
import EditItem from './edit'

// mock
import MockData from '../mock/classmanagement'

// import { fetchFunction } from '@/services'
const fetchFunction = async () => ({ data: { list: [], count: 0 }, success: true })

@connect(() => ({}))
class PropertyOutPackageManagement extends Component {
    state = {
        modelTitle: '编辑',
        visibleModal: false,
        searchCondition: {}, // 搜索条件
        dataSrouce: MockData || [], // 表格数据
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

    handleShowEdit = id => {
        if (id) {
            this.setState({
                visibleModal: true,
                modelTitle: '编辑',
            })
        } else {
            this.setState({
                visibleModal: true,
                modelTitle: '新增品类',
            })
        }
    }

    handleCancel = () => {
        this.setState({
            visibleModal: false,
        })
    }

    render() {
        const { dataSrouce, pagination, visibleModal, modelTitle } = this.state

        return (
            <PageHeaderWrapper>
                <SearchForm
                    data={[
                        {
                            label: '内包装名称',
                            type: 'input',
                            key: 'q',
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <div style={{ textAlign: 'right', paddingBottom: '10px' }}>
                    <Button onClick={() => this.handleShowEdit()} size="small" type="default">
                        新增内包装
                    </Button>
                </div>
                <BasicTable
                    columns={[
                        {
                            title: '内包装id',
                            dataIndex: 'id',
                        },
                        {
                            title: '内包装名称',
                            dataIndex: 'name',
                        },
                        {
                            title: '添加日期',
                            dataIndex: 'date',
                        },
                        {
                            type: 'oprate',
                            render: (_, { id }) => {
                                return (
                                    <div>
                                        <Button
                                            onClick={() => this.handleShowEdit(id)}
                                            size="small"
                                            type="default"
                                        >
                                            编辑
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
                    title={modelTitle}
                    destroyOnClose
                    visible={visibleModal}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <EditItem cancelBc={this.handleCancel} />
                </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default PropertyOutPackageManagement
