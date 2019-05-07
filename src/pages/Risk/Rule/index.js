import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Table } from 'antd'
import SearchForm from '@/components/SearchForm'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'

import { pageSize } from '@/utils/dict'

@connect(({ rule }) => ({
    rule,
}))
class Rule extends Component {
    state = {
        searchData: {}, // 查询条件
        current: 1,
    }

    componentDidMount() {
        const data = {
            id: 0,
            pageSize,
            pageIndex: 1,
        }

        this.getTypeOneList()
        this.queryList(data)
    }

    handleSearchForm = values => {
        this.setState({
            searchData: values,
            current: 1,
        })
        const data = {
            pageSize,
            pageIndex: 1,
            ...values,
        }

        this.queryList(data)
    }

    handleChangePage = value => {
        const { searchData } = this.state
        const data = {
            pageIndex: value,
            pageSize,
            ...searchData,
        }
        this.setState({
            current: value,
        })

        this.queryList(data)
    }

    queryList = data => {
        const { dispatch } = this.props
        dispatch({
            type: 'rule/fetchList',
            payload: data,
        })
    }

    getTypeOneList = () => {
        const { dispatch } = this.props
        dispatch({
            type: 'rule/fetchTypeOneList',
            payload: {
                id: 0,
            },
        })
    }

    changeOneType = val => {
        const { dispatch } = this.props
        dispatch({
            type: 'rule/fetchTypeTwoList',
            payload: {
                id: val,
            },
        })
    }

    addRule = () => {
        const { dispatch } = this.props
        dispatch(routerRedux.push('/risk-manage/rule/add-rule'))
    }

    editRule = id => {
        const { dispatch } = this.props
        dispatch(routerRedux.push(`/risk-manage/rule/add-rule?id=${id}`))
    }

    render() {
        const { current } = this.state
        const {
            rule: { list, total, typeOneList, typeTwoList },
        } = this.props

        const paginationProps = {
            showQuickJumper: true,
            pageSize,
            total,
            current,
            onChange: this.handleChangePage,
        }

        const columns = [
            {
                title: '一级分类',
                dataIndex: 'firstRuleName',
            },
            {
                title: '二级分类',
                dataIndex: 'secondRuleName',
            },
            {
                title: '一级业务节点',
                dataIndex: 'firstBusinessName',
            },
            {
                title: '二级业务节点',
                dataIndex: 'secondBusinessName',
            },
            {
                title: '严重等级',
                dataIndex: 'ruleLevelStr',
            },
            {
                title: '处置策略',
                dataIndex: 'strategyCode',
            },
            {
                title: '规则名称',
                dataIndex: 'ruleName',
            },
            {
                title: '规则说明',
                dataIndex: 'ruleDetails',
            },
            {
                title: '风控接触策略',
                dataIndex: 'removeRuleStr',
            },
            {
                title: '触发类型',
                dataIndex: 'triggerTypeStr',
            },
            {
                title: '策略响应周期',
                dataIndex: 'strategyResponseStr',
            },
            {
                title: '操作',
                dataIndex: 'receiptUrl',
                render: (text, record) => (
                    <a href={text} onClick={() => this.editRule(record.id)}>
                        配置
                    </a>
                ),
            },
        ]

        const buttonGroup = [
            {
                onSearch: this.handleSearchForm,
            },
            {
                text: '新增',
                type: 'primary',
                icon: 'plus',
                onClick: this.addRule,
            },
        ]

        return (
            <PageHeaderWrapper>
                <div>
                    <SearchForm
                        data={[
                            {
                                label: '规则',
                                type: 'input',
                                key: 'ruleName',
                                placeholder: '请输入规则关键字',
                            },
                            {
                                label: '一级分类',
                                type: 'select',
                                options: typeOneList,
                                key: 'firstId',
                                placeholder: '请选择一级分类',
                                onChange: this.changeOneType,
                            },
                            {
                                label: '二级分类',
                                type: 'select',
                                options: typeTwoList,
                                key: 'secondId',
                                placeholder: '请选择二级分类',
                                allowClear: true,
                            },
                        ]}
                        buttonGroup={buttonGroup}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={list}
                    pagination={paginationProps}
                    rowKey={record => record.id}
                />
            </PageHeaderWrapper>
        )
    }
}

export default Rule
