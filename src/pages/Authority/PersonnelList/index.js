import React, { Component } from 'react'
import { connect } from 'dva'
import { Popconfirm, message, Modal } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import Button from '@/components/Button'
import PersonnelStateSwitch from './components/stateCheck'
import ConnectRole from './connectRole'
import EditPerson from './edit'

import { baseGet } from '@/services/common'

@connect(() => ({}))
class AuthorityPersonnelList extends Component {
    state = {
        roleList: [],
        activeNumberId: '',
        activeMember: {},
        showConnectRole: false,
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
        // 获取角色列表
        this.fetchRoleList()
    }

    // 请求表格的数据
    fetchData = (parmas = {}) => {
        const { pageNum, ...params } = parmas
        const { pagination, searchCondition } = this.state

        const query = {
            t: 'member.list',
            size: pagination.pageSize,
            index: pageNum || pagination.current,
            ...params,
        }
        if (searchCondition.q) {
            query.q = searchCondition.q
        }

        if (searchCondition.roles) {
            query.roles = searchCondition.roles
        }

        baseGet(query).then(res => {
            if (res && res.errcode === 0) {
                if (res.data.length) {
                    const { data } = res
                    this.setState({
                        dataSrouce: data,
                        pagination: {
                            ...pagination,
                            total: res.pages ? res.pages.count : 0,
                        },
                    })
                } else {
                    this.setState({
                        dataSrouce: [],
                        pagination: {
                            ...pagination,
                            total: 0,
                        },
                    })
                }
            }
        })
    }

    fetchRoleList = () => {
        baseGet({
            t: 'role.list',
            size: 100,
            index: 1,
        }).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    roleList: res.data,
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

    toggleState = (checked, personId) => {
        // const { current: { closeLoading } } = this.baseSwitch
        if (checked) {
            // 发送请求去启用
            baseGet({
                t: 'member.status',
                id: personId,
                action: 'enable',
            }).then(res => {
                if (res && res.errcode === 0) {
                    this.fetchData()
                }
                window.sendMessage('toggle:authority/personnelmanagement/list:switch', false)
            })
        } else {
            baseGet({
                t: 'member.status',
                id: personId,
                action: 'disable',
            }).then(res => {
                if (res && res.errcode === 0) {
                    this.fetchData()
                }
                window.sendMessage('toggle:authority/personnelmanagement/list:switch', false)
            })
        }
    }

    // 删除某个成员
    confirmdelete = numberId => {
        baseGet({
            t: 'member.status',
            id: numberId,
            action: 'delete',
        }).then(res => {
            if (res && res.errcode === 0) {
                message.success('删除成功')
            }
            this.fetchData()
        })
    }

    handleHideConnectRole = () => {
        this.setState(
            {
                showConnectRole: false,
                activeNumberId: '',
            },
            () => {
                this.fetchData()
            }
        )
    }

    connectRole = numberId => {
        this.setState({
            showConnectRole: true,
            activeNumberId: numberId,
        })
    }

    editSome = member => {
        this.setState({
            showEditNumber: true,
            activeMember: member,
        })
    }

    handleHideEditNumber = () => {
        this.setState(
            {
                showEditNumber: false,
                activeMember: {},
            },
            () => {
                this.fetchData()
            }
        )
    }

    render() {
        const {
            dataSrouce,
            pagination,
            showConnectRole,
            activeNumberId,
            showEditNumber,
            roleList,
            activeMember,
        } = this.state

        function createRoleOptions() {
            const roleOptions = roleList.map(item => {
                return {
                    key: item.id,
                    value: item.name,
                }
            })
            return roleOptions
        }

        return (
            <PageHeaderWrapper>
                <SearchForm
                    data={[
                        {
                            label: '请输入关键字',
                            type: 'input',
                            key: 'q',
                        },
                        {
                            label: '所属角色',
                            type: 'select',
                            options: createRoleOptions(),
                            key: 'roles',
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <div style={{ textAlign: 'right', paddingBottom: '10px' }}>
                    <Button onClick={() => this.editSome()} size="small" type="default">
                        新增成员
                    </Button>
                </div>
                <BasicTable
                    columns={[
                        {
                            title: '成员账号',
                            render: (_, { mobile }) => <span>{mobile}</span>,
                        },
                        {
                            title: '姓名',
                            dataIndex: 'name',
                        },
                        {
                            title: '手机号码',
                            dataIndex: 'mobile',
                        },
                        {
                            title: '所属角色',
                            dataIndex: 'roles',
                            render: (_, { roles }) => {
                                const roleArr = []
                                roles.forEach(role => {
                                    roleArr.push(<div>{role}</div>)
                                })
                                return <div>{roleArr}</div>
                            },
                        },
                        {
                            dataIndex: 'create_time',
                            title: '添加时间',
                            type: 'date',
                        },
                        {
                            dataIndex: 'last_time',
                            title: '最后登录',
                        },
                        {
                            dataIndex: 'status',
                            title: '是否启用',
                            render: (_, { status, id: personId }) => {
                                return (
                                    <div>
                                        <PersonnelStateSwitch
                                            state={status}
                                            id={personId}
                                            toggleStateBc={this.toggleState}
                                        />
                                    </div>
                                )
                            },
                        },
                        {
                            type: 'oprate',
                            render: (_, member) => {
                                return (
                                    <div style={{ lineHeight: 2 }}>
                                        <Button
                                            onClick={() => this.connectRole(member.id)}
                                            size="small"
                                            type="default"
                                        >
                                            关联角色
                                        </Button>
                                        <span>&nbsp;</span>
                                        <Button
                                            onClick={() => this.editSome(member)}
                                            size="small"
                                            type="default"
                                        >
                                            编辑
                                        </Button>
                                        <span>&nbsp;</span>
                                        <Popconfirm
                                            title="确定删除该成员吗?"
                                            onConfirm={() => {
                                                this.confirmdelete(member.id)
                                            }}
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
                    title="关联角色"
                    footer={null}
                    width={680}
                    destroyOnClose
                    visible={showConnectRole}
                    onCancel={this.handleHideConnectRole}
                >
                    <ConnectRole
                        numberId={activeNumberId}
                        cancelModal={this.handleHideConnectRole}
                    />
                </Modal>
                <Modal
                    title="编辑成员"
                    footer={null}
                    width={680}
                    destroyOnClose
                    visible={showEditNumber}
                    onCancel={this.handleHideEditNumber}
                >
                    <EditPerson members={activeMember} cancelModal={this.handleHideEditNumber} />
                </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default AuthorityPersonnelList
