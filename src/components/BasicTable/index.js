import React, { Component, Fragment } from 'react'
import { Table } from 'antd'
import Button from '@/components/Button'
import moment from 'moment'

import { NumberToThousands } from '@/utils/utils'

import './index.less'

class BasicTable extends Component {
    /**
     * 业务化的columns转换
     */
    transformColumns = columns => {
        const newCol = columns.map(col => {
            if (col.type === 'date' && !col.render) {
                col.render = text =>
                    text ? moment(text).format(col.format || 'YYYY-MM-DD hh:mm:ss') : ''
            }
            // 金额类型，渲染千分符，保留俩位
            if (col.type === 'amount' && !col.render) {
                col.render = text => (text ? NumberToThousands(text) : '')
            }
            // 长文本的最小宽度优化
            if (col.type === 'longText' && !col.render) {
                col.render = text => <div style={{ minWidth: 150 }}>{text}</div>
            }
            if (col.type === 'oprate') {
                col.title = col.title || '操作'
                col.dataIndex = col.dataIndex || 'toolcol'
                // 固定列
                // col.fixed = 'right'

                if (!col.render && col.buttons && col.buttons.length) {
                    col.render = (_, record) => {
                        return (
                            <Fragment>
                                {col.buttons.map(
                                    ({ text, onClick = () => {}, style, ...btnPrams }, index) => (
                                        <Button
                                            size="small"
                                            key={index}
                                            onClick={() => onClick(record)}
                                            style={{
                                                marginRight: 10,
                                                ...style,
                                            }}
                                            type="default"
                                            {...btnPrams}
                                        >
                                            {typeof text === 'function' ? text(record) : text}
                                        </Button>
                                    )
                                )}
                            </Fragment>
                        )
                    }
                }
            }
            return col
        })
        return newCol
    }

    transformData = data => {
        const { rowKey } = this.props
        if (rowKey) {
            return data
        }
        data.forEach((d, index) => {
            d.key = d.key || index
        })
        return data
    }

    render() {
        const { columns, dataSource, rowSelection, pagination, ...props } = this.props
        const columnsOption = this.transformColumns(columns)
        const dataOption = this.transformData(dataSource)

        if (pagination) {
            Object.assign({}, { showQuickJumper: true }, pagination)
        }

        return (
            <Table
                columns={columnsOption}
                dataSource={dataOption}
                rowSelection={rowSelection || {}}
                pagination={pagination}
                // scroll={{ x: 'max-content' }}
                {...props}
            />
        )
    }
}

export default BasicTable
