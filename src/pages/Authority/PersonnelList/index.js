import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import PersonnelStateSwitch from './components/stateCheck'

import { baseGet } from '@/services/common'

@connect(() => ({}))
class AuthorityPersonnelList extends Component {
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
    fetchData = (parmas = {}) => {
        const { pageNum, ...params } = parmas
        const { pagination, searchCondition } = this.state

        baseGet({
            t: 'member.list',
            type: 1,
            mch_id: '', // 门店Id
            size: pagination.pageSize,
            index: pageNum || pagination.current,
            ...searchCondition,
            ...params,
        }).then(res => {
            console.log(res)
            if (res && res.errcode === 0) {
                const {
                    data,
                    pages: { count },
                } = res
                this.setState({
                    dataSrouce: data,
                    pagination: {
                        ...pagination,
                        total: count,
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
    handleFromDownload = values => {}

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
                t: 'role.status',
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

    render() {
        const { dataSrouce, pagination } = this.state

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
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                            key: 'roles',
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <BasicTable
                    columns={[
                        {
                            title: '成员账号',
                            dataIndex: 'mch_name',
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
                            type: 'date',
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
                            buttons: [{ text: '查看详情' }, { text: '编辑' }],
                        },
                    ]}
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

export default AuthorityPersonnelList
