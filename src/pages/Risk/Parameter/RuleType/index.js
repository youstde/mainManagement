import React, { Component } from 'react'
import { connect } from 'dva'
import { Table, Modal, Input, Form, message } from 'antd'
import { saveRuleType } from './services'
import SearchForm from '@/components/SearchForm'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'

import { pageSize } from '@/utils/dict'

const FormItem = Form.Item

@connect(({ ruleType }) => ({
    ruleType,
}))
class RuleType extends Component {
    state = {
        searchData: {}, // 查询条件

        visible: false,
        editId: 0, //  编辑数据的id
        editType: 'edit', //  编辑类型
        parentId: 0, //  一级节点（0为一级节点，其他值为二级节点）
        current: 1,
        btnDisabled: false,
    }

    componentDidMount() {
        const data = {
            id: 0,
            pageSize,
            pageIndex: 1,
        }
        this.getTypeList()
        this.queryList(data)
    }

    handleSearchForm = values => {
        const { id } = values
        const data = {
            id: id || 0,
        }
        this.setState({
            searchData: data,
            parentId: id,
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
            type: 'ruleType/fetchList',
            payload: data,
        })
    }

    getTypeList = () => {
        const { dispatch } = this.props
        dispatch({
            type: 'ruleType/fetchTypeList',
        })
    }

    // 点击编辑按钮
    editRow = (id, name) => {
        this.setState({
            visible: true,
            editId: id,
            editType: 'edit',
        })
        const {
            form: { setFieldsValue },
        } = this.props
        setFieldsValue({
            name,
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
                const { name } = value
                const params = {
                    id: editType === 'add' ? null : editId,
                    parentId,
                    ruleTypeName: name,
                }
                const res = await saveRuleType(params)

                if (res.success) {
                    this.setState({
                        visible: false,
                        btnDisabled: false,
                    })
                    message.success(editType === 'add' ? '新增规则分类成功!' : '编辑规则分类成功!')
                    const data = {
                        id: 0,
                        pageSize,
                        pageIndex: 1,
                        ...searchData,
                    }
                    this.setState({
                        current: 1,
                    })
                    this.getTypeList()
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
        const { visible, parentId, current, btnDisabled } = this.state
        const {
            form: { getFieldDecorator },
            ruleType: { list, total, typeList },
        } = this.props

        const paginationProps = {
            showQuickJumper: true,
            pageSize,
            total,
            current,
            onChange: this.handleChangePage,
        }

        const labelName = parentId === 0 ? '一级分类名称' : '二级分类名称'

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
                title: '名称',
                dataIndex: 'ruleTypeName',
            },
            {
                title: '操作',
                dataIndex: 'operate',
                render: (_, record) => (
                    <a onClick={() => this.editRow(record.id, record.ruleTypeName, record)}>编辑</a>
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
                                options: typeList,
                                key: 'id',
                                placeholder: '请选择一级分类',
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
                    title="编辑分类"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okButtonProps={{
                        disabled: btnDisabled,
                    }}
                >
                    <Form>
                        <FormItem label={labelName} {...formItemLayout}>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '该项必填！' }],
                            })(<Input />)}
                        </FormItem>
                    </Form>
                </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default Form.create()(RuleType)
