/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react'
import { Table, Input, Button, Form } from 'antd'

import { purchasePost } from '@/services/common'

import { createSignOptions } from '@/utils/utils'
// import styles from './index.less'

const EditableContext = React.createContext()

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)

class EditableCell extends Component {
    state = {
        editing: false,
    }

    toggleEdit = () => {
        let { editing } = this.state
        editing = !editing
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus()
            }
        })
    }

    save = e => {
        const { record, handleSave } = this.props
        this.form.validateFields((error, values) => {
            console.log('values:', values)
            if (error && error[e.currentTarget.id]) {
                return
            }
            this.toggleEdit()
            handleSave({ ...record, ...values }, values)
        })
    }

    renderCell = form => {
        this.form = form
        const { children, dataIndex, record, title } = this.props
        const { editing } = this.state
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ],
                    initialValue: record[dataIndex],
                })(
                    <Input
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                        onBlur={this.save}
                    />
                )}
            </Form.Item>
        ) : (
            <div
                // className={styles.editableCellValueWrap}
                className="editableCellValueWrap"
                style={{ paddingRight: 24, minHeight: '40px' }}
                onClick={this.toggleEdit}
            >
                {children}
            </div>
        )
    }

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                    children
                )}
            </td>
        )
    }
}

// eslint-disable-next-line react/no-multi-comp
class EditableTable extends Component {
    _isMounted = false

    constructor(props) {
        super(props)
        const { tabelData } = this.props
        this.state = {
            dataSource: tabelData || [],
        }
    }

    componentDidMount() {
        this._isMounted = true
        window.onMessage('update:dataSource', data => {
            data.key = Date.now()
            this.handleAdd(data)
        })
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    handleAdd = data => {
        const { dataSource } = this.state
        const newData = data || dataSource
        this.setState({
            dataSource: newData,
        })
    }

    handleSave = (row, values) => {
        const { ids, inputChangeBc } = this.props
        const { dataSource } = this.state

        const {
            id,
            skuid,
            specification_real,
            quantity_real,
            price_unit,
            price_total,
            weight_net,
        } = row
        const params = {
            t: 'sku.save',
            id,
            args: ids,
            skuid,
        }
        if (specification_real) params.specification_real = specification_real
        if (quantity_real) params.quantity_real = quantity_real
        if (price_unit) params.price_unit = price_unit
        if (price_total) params.price_total = price_total
        if (weight_net) params.weight_net = weight_net
        createSignOptions(params)
        const formData = new FormData()
        Object.keys(params).forEach(key => {
            formData.append(key, params[key])
        })
        purchasePost('', formData).then(res => {
            if (res && res.errcode === 0) {
                const { additional } = res
                inputChangeBc(additional)
                const newData = [...dataSource]
                const index = newData.findIndex(item => row.id === item.id)
                // const item = newData[index]
                // console.log('item:', item, row)
                newData.splice(index, 1, {
                    ...row,
                    ...res.data,
                })
                this.setState({ dataSource: newData })
            }
        })
    }

    submit = () => {
        const { dataSource } = this.state
        const { handleSubmit } = this.props
        console.log('dataSource:', dataSource)
        handleSubmit()
    }

    render() {
        const { tabelColumns, tabelLocalType } = this.props
        const { dataSource } = this.state
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        }
        const Newcolumns = tabelColumns.map(col => {
            if (!col.editable) {
                return col
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            }
        })

        const ButtonArr = []
        if (tabelLocalType === 1) {
            ButtonArr.push(
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    新增一行
                </Button>
            )
        }

        return (
            <div>
                {ButtonArr}
                <Table
                    scroll={{ x: 2100 }}
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={Newcolumns}
                />
                <div style={{ textAlign: 'center', paddingTop: 50 }}>
                    <Button onClick={this.submit} type="primary" style={{ marginBottom: 16 }}>
                        提交
                    </Button>
                </div>
            </div>
        )
    }
}

export default EditableTable
