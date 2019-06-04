import React, { Component } from 'react'
import { Table, Input, Button, Form } from 'antd'

// mock
import editTabelMock from '../../mock/editTabel'

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
            if (error && error[e.currentTarget.id]) {
                return
            }
            this.toggleEdit()
            handleSave({ ...record, ...values })
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
                className="editable-cell-value-wrap"
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
class EditableTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dataSource: editTabelMock || [],
            count: 2,
        }
    }

    handleAdd = () => {
        const { count, dataSource } = this.state
        const newData = {
            key: count,
            name: `Edward King ${count}`,
            age: 32,
            address: `London, Park Lane no. ${count}`,
        }
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        })
    }

    handleSave = row => {
        const { dataSource } = this.state
        const newData = [...dataSource]
        const index = newData.findIndex(item => row.key === item.key)
        const item = newData[index]
        newData.splice(index, 1, {
            ...item,
            ...row,
        })
        this.setState({ dataSource: newData })
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
                    scroll={{ x: 1400 }}
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
