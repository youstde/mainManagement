import React, { Component } from 'react'
import { connect } from 'dva'
import { Table } from 'antd'
import { getPageQuery } from '@/utils/utils'
import moment from 'moment'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'

@connect(({ ruleRecord }) => ({
    ruleRecord,
}))
class RuleRecord extends Component {
    componentDidMount() {
        const { id } = getPageQuery()
        const { dispatch } = this.props

        dispatch({
            type: 'ruleRecord/fetchList',
            payload: id,
        })
    }

    render() {
        const {
            ruleRecord: { list },
        } = this.props

        const columns = [
            {
                title: '操作时间',
                dataIndex: 'gmtCreate',
                render: text => (
                    <span>{text ? moment(text).format('YYYY.MM.DD HH:mm:ss') : ''}</span>
                ),
            },
            {
                title: '处置策略',
                dataIndex: 'strategyName',
            },
            {
                title: '操作类型',
                dataIndex: 'operateType',
                render: text => {
                    const statusMap = {
                        1: {
                            name: '解除处置',
                        },
                        2: {
                            name: '处置',
                        },
                    }
                    return <span>{statusMap[text].name}</span>
                },
            },
            {
                title: '状态',
                dataIndex: 'state',
                render: text => {
                    const statusMap = {
                        0: {
                            name: '完成',
                        },
                        1: {
                            name: '已提交',
                        },
                        2: {
                            name: '已审核',
                        },
                        3: {
                            name: '已拒绝',
                        },
                    }
                    return <span>{statusMap[text].name}</span>
                },
            },
            {
                title: '操作方',
                dataIndex: 'userName',
            },
        ]

        return (
            <PageHeaderWrapper>
                <Table
                    columns={columns}
                    dataSource={list}
                    pagination={false}
                    rowKey={record => record.id}
                />
            </PageHeaderWrapper>
        )
    }
}

export default RuleRecord
