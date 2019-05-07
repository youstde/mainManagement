import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Table, Modal } from 'antd'
import moment from 'moment'
import { removeDisposal } from './services'
import SearchForm from '@/components/SearchForm'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'

import { pageSize } from '@/utils/dict'

@connect(({ record }) => ({
    record,
}))
class Record extends Component {
    state = {
        searchData: {}, // 查询条件
        current: 1,
    }

    componentDidMount() {
        const data = {
            pageSize,
            pageIndex: 1,
        }
        this.queryList(data)
    }

    handleSearchForm = values => {
        const { rangedate, ruleName, state } = values

        const data = {
            ruleName,
            state,
            startDate: rangedate ? rangedate[0] : '',
            endDate: rangedate ? rangedate[1] : '',
            pageSize,
            pageIndex: 1,
        }

        this.setState({
            searchData: values,
            current: 1,
        })

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
            type: 'record/fetchList',
            payload: data,
        })
    }

    viewOperateRecord = id => {
        const { dispatch } = this.props
        dispatch(routerRedux.push(`/risk-manage/record/record-list?id=${id}`))
    }

    removeDisposal = id => {
        removeDisposal(id).then(res => {
            if (res && res.success) {
                Modal.success({
                    title: '解除处置申请已提交!',
                    onOk: () => {
                        this.queryList()
                    },
                })
            }
        })
    }

    render() {
        const { current } = this.state
        const {
            record: { list, total },
        } = this.props

        const paginationProps = {
            showQuickJumper: true,
            pageSize,
            total,
            current,
            onChange: this.handleChangePage,
        }

        const stateList = [
            {
                key: 0,
                value: '已处置',
            },
            {
                key: 1,
                value: '已解除',
            },
            {
                key: 2,
                value: '解除审核中',
            },
            {
                key: 3,
                value: '已拒绝',
            },
        ]

        const columns = [
            {
                title: '预警生成时间',
                dataIndex: 'gmtCreate',
                render: text => (
                    <span>{text ? moment(text).format('YYYY.MM.DD HH:mm:ss') : ''}</span>
                ),
            },
            {
                title: '涉险企业',
                dataIndex: 'companyName',
            },
            {
                title: '规则名称',
                dataIndex: 'ruleName',
            },
            {
                title: '规则明细',
                dataIndex: 'ruleDetails',
            },
            {
                title: '风控等级',
                dataIndex: 'ruleLevel',
                render: text => {
                    const statusMap = {
                        2: {
                            name: '轻度',
                        },
                        5: {
                            name: '中度',
                        },
                        8: {
                            name: '重度',
                        },
                    }
                    return <span>{statusMap[text].name}</span>
                },
            },
            {
                title: '一级分类',
                dataIndex: 'businessFirstNodeName',
            },
            {
                title: '二级分类',
                dataIndex: 'businessSecondNodeName',
            },
            {
                title: '处置策略',
                dataIndex: 'strategyName',
            },
            {
                title: '当前状态',
                dataIndex: 'state',
                render: text => {
                    const statusMap = {
                        0: {
                            name: '已处置',
                        },
                        1: {
                            name: '已解除',
                        },
                        2: {
                            name: '解除审核中',
                        },
                        3: {
                            name: '已拒绝',
                        },
                    }
                    return <span>{statusMap[text].name}</span>
                },
            },
            {
                title: '操作',
                dataIndex: 'receiptUrl',
                render: (text, record) => (
                    <div style={{ display: 'grid' }}>
                        {(record.state === 0 || record.state === 3) &&
                        record.strategyCode !== 'strategy_warning' ? (
                            <a href={text} onClick={() => this.removeDisposal(record.id)}>
                                解除处置
                            </a>
                        ) : null}
                        {record.strategyCode !== 'strategy_warning' && (
                            <a href={text} onClick={() => this.viewOperateRecord(record.id)}>
                                查看操作记录
                            </a>
                        )}
                    </div>
                ),
            },
        ]

        const buttonGroup = [
            {
                onSearch: this.handleSearchForm,
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
                                label: '状态',
                                type: 'select',
                                options: stateList,
                                key: 'state',
                                placeholder: '请选择状态',
                            },
                            {
                                label: '时间范围',
                                type: 'rangepicker',
                                key: 'rangedate',
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

export default Record
