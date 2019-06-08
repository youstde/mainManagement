import React, { Component } from 'react'
import { connect } from 'dva'
import { message, Modal } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import BasicTable from '@/components/BasicTable'
import Button from '@/components/Button'
import StateSwitch from './components/StateSwitch'
import EditRole from './editRole'

import { baseConfig } from '@/utils/baseConfig'
import { baseGet } from '@/services/common'

@connect(() => ({}))
class AuthorityManagementRole extends Component {
    state = {
        activeRoleData: {},
        showEditRole: false,
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
    fetchData = (parmas = {}) => {
        const { pageNum, ...params } = parmas
        const { pagination, searchCondition } = this.state

        baseGet({
            t: 'role.list',
            size: pagination.pageSize,
            index: pageNum || pagination.current,
            ...searchCondition,
            ...params,
        }).then(res => {
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

    deleteItem = roleId => {
        baseGet({
            t: 'role.status',
            id: roleId,
            action: 'delete',
        }).then(res => {
            if (res && res.errcode === 0) {
                this.fetchData()
                message.success('删除成功!', 2)
            }
        })
    }

    toggleState = (checked, roleId) => {
        // const { current: { closeLoading } } = this.baseSwitch
        if (checked) {
            // 发送请求去启用
            baseGet({
                t: 'role.status',
                id: roleId,
                action: 'enable',
            }).then(res => {
                if (res && res.errcode === 0) {
                    this.fetchData()
                }
                window.sendMessage('toggle:authority/management/role:switch', false)
            })
        } else {
            baseGet({
                t: 'role.status',
                id: roleId,
                action: 'disable',
            }).then(res => {
                if (res && res.errcode === 0) {
                    this.fetchData()
                }
                window.sendMessage('toggle:authority/management/role:switch', false)
            })
        }
    }

    handleShowEdit = roleData => {
        this.setState({
            showEditRole: true,
            activeRoleData: roleData,
        })
    }

    handleHideEdit = () => {
        this.setState({
            showEditRole: false,
            activeRoleData: {},
        })
        this.fetchData()
    }

    handleToRoleAuthority = roleId => {
        const { history } = this.props
        history.push(`/authority/management/roleauthority?id=${roleId}`)
    }

    render() {
        const { dataSrouce, pagination, showEditRole, activeRoleData } = this.state

        return (
            <PageHeaderWrapper>
                <BasicTable
                    columns={[
                        {
                            title: '角色名称',
                            dataIndex: 'name',
                        },
                        {
                            title: '角色描述',
                            dataIndex: 'intro',
                        },
                        {
                            title: '管理员类型',
                            dataIndex: 'type',
                            render: (_, { type }) => {
                                return <div>{baseConfig.auth_types[type]}</div>
                            },
                        },
                        {
                            title: '成员数量',
                            dataIndex: 'members',
                        },
                        {
                            dataIndex: 'create_time',
                            title: '添加时间',
                            type: 'date',
                            format: 'YYYY-MM-DD',
                        },
                        {
                            dataIndex: 'status',
                            title: '是否启用',
                            render: (_, { status, id: roleId }) => {
                                return (
                                    <div>
                                        <StateSwitch
                                            state={status}
                                            id={roleId}
                                            toggleStateBc={this.toggleState}
                                        />
                                    </div>
                                )
                            },
                        },
                        {
                            type: 'oprate',
                            render: (_, roleData) => {
                                return (
                                    <div>
                                        <Button
                                            onClick={() => this.handleToRoleAuthority(roleData.id)}
                                            size="small"
                                            type="default"
                                        >
                                            权限设置
                                        </Button>
                                        <span>&nbsp;</span>
                                        <Button
                                            onClick={() => this.handleShowEdit(roleData)}
                                            size="small"
                                            type="default"
                                        >
                                            编辑
                                        </Button>
                                        <span>&nbsp;</span>
                                        <Button
                                            onClick={() => this.deleteItem(roleData.id)}
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
                    title="编辑角色信息"
                    footer={null}
                    width={680}
                    destroyOnClose
                    visible={showEditRole}
                    onCancel={this.handleHideEdit}
                >
                    <EditRole roleData={activeRoleData} onCancel={this.handleHideEdit} />
                </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default AuthorityManagementRole
