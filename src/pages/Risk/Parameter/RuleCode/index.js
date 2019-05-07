import React, { Component } from 'react'
import { connect } from 'dva'
import { Table, Modal, Input, Form, message, Select } from 'antd'
import { saveRuleCode } from './services'
import SearchForm from '@/components/SearchForm'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'

import { pageSize } from '@/utils/dict'

const FormItem = Form.Item
const { Option } = Select

@connect(({ ruleCode }) => ({
    ruleCode,
}))
class RuleCode extends Component {
    state = {
        searchData: {}, // 查询条件

        visible: false,
        editId: 0, //  编辑数据的id
        editType: 'edit', //  编辑类型
        parentId: 0, //  一级节点（0为一级节点，其他值为二级节点）
        current: 1,

        addDisabled: true,
        btnDisabled: false,
    }

    componentDidMount() {
        // const data = {
        //     id: 0,
        //     pageSize,
        //     pageIndex: 1,
        // }
        this.getTypeOneList()
    }

    handleSearchForm = values => {
        const { typeId } = values
        const data = {
            typeId,
        }
        this.setState({
            searchData: data,
            parentId: typeId,
            current: 1,
        })

        const params = {
            pageSize,
            pageIndex: 1,
            ...data,
        }

        this.queryList(params)
    }

    handleChangePage = value => {
        const { searchData, parentId } = this.state
        const data = {
            id: parentId,
            pageSize,
            ...searchData,
            pageIndex: value,
        }
        this.setState({
            current: value,
        })

        this.queryList(data)
    }

    queryList = data => {
        const { dispatch } = this.props
        dispatch({
            type: 'ruleCode/fetchList',
            payload: data,
        })
    }

    getTypeOneList = () => {
        const { dispatch } = this.props
        dispatch({
            type: 'ruleCode/fetchTypeOneList',
            payload: {
                id: 0,
            },
        })
    }

    changeOneType = val => {
        const { dispatch } = this.props
        dispatch({
            type: 'ruleCode/fetchTypeTwoList',
            payload: {
                id: val,
            },
        })
        this.setState({
            addDisabled: true,
        })
    }

    changeTwoType = val => {
        this.setState({
            addDisabled: false,
            parentId: val,
        })
    }

    // 点击编辑按钮
    editRow = record => {
        const { id, paramCode, paramName, paramType } = record
        this.setState({
            visible: true,
            editId: id,
            editType: 'edit',
        })
        const {
            form: { setFieldsValue },
        } = this.props
        setFieldsValue({
            name: paramName,
            code: paramCode,
            type: paramType,
        })
    }

    // 点击新增
    addItem = () => {
        this.setState({
            visible: true,
            editType: 'add',
        })
        const {
            form: { setFieldsValue },
        } = this.props
        setFieldsValue({
            name: '',
            code: '',
            type: null,
        })
    }

    handleOk = () => {
        const { editId, editType, parentId, searchData } = this.state
        const {
            form: { validateFields },
        } = this.props
        validateFields(async (errors, value) => {
            if (!errors) {
                this.setState({
                    btnDisabled: true,
                })
                const { code, name, type } = value
                const params = {
                    id: editType === 'add' ? null : editId,
                    paramTypeId: parentId,
                    paramName: name,
                    paramCode: code,
                    paramType: type,
                }
                const res = await saveRuleCode(params)

                if (res.success) {
                    this.setState({
                        visible: false,
                        btnDisabled: false,
                    })
                    message.success(editType === 'add' ? '新增规则code成功!' : '编辑规则code成功!')
                    const data = {
                        id: 0,
                        pageSize,
                        pageIndex: 1,
                        ...searchData,
                    }
                    this.setState({
                        current: 1,
                    })
                    this.getTypeOneList()
                    this.queryList(data)
                }
            }
        })
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }

    render() {
        const { visible, current, addDisabled, btnDisabled } = this.state
        const {
            form: { getFieldDecorator },
            ruleCode: { list, total, typeOneList, typeTwoList },
        } = this.props

        const paginationProps = {
            showQuickJumper: true,
            pageSize,
            total,
            current,
            onChange: this.handleChangePage,
        }

        const formItemLayout = {
            colon: false,
            labelCol: { span: 6 },
            wrapperCol: { span: 12 },
        }

        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
            },
            {
                title: '规则code',
                dataIndex: 'paramCode',
            },
            {
                title: 'code说明',
                dataIndex: 'paramName',
            },
            {
                title: '能否计算',
                dataIndex: 'paramType',
                render: text => {
                    return text ? '是' : '否'
                },
            },
            {
                title: '操作',
                dataIndex: 'operate',
                render: (_, record) => <a onClick={() => this.editRow(record)}>编辑</a>,
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
                disabled: addDisabled,
                onClick: this.addItem,
            },
        ]

        return (
            <PageHeaderWrapper>
                <div>
                    <SearchForm
                        data={[
                            {
                                label: '一级分类',
                                type: 'select',
                                options: typeOneList,
                                key: 'id',
                                placeholder: '请选择一级分类',
                                onChange: this.changeOneType,
                            },
                            {
                                label: '二级分类',
                                type: 'select',
                                options: typeTwoList,
                                key: 'typeId',
                                onChange: this.changeTwoType,
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
                <Modal
                    title="编辑规则code"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okButtonProps={{
                        disabled: btnDisabled,
                    }}
                >
                    <Form>
                        <FormItem label="规则code" {...formItemLayout}>
                            {getFieldDecorator('code', {
                                rules: [{ required: true, message: '该项必填！' }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="code说明" {...formItemLayout}>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '该项必填！' }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="能否计算" {...formItemLayout}>
                            {getFieldDecorator('type', {
                                rules: [{ required: true, message: '该项必填！' }],
                            })(
                                <Select placeholder="请选择能否计算">
                                    <Option value>能</Option>
                                    <Option value={false}>否</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default Form.create()(RuleCode)
