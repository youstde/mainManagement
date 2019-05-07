import React, { Component } from 'react'
import { connect } from 'dva'
import { Table, Modal, Input, Form, message } from 'antd'
import { saveRuleGroup } from './services'
import SearchForm from '@/components/SearchForm'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'

import { pageSize } from '@/utils/dict'

const FormItem = Form.Item

@connect(({ ruleGroup }) => ({
    ruleGroup,
}))
class RuleGroup extends Component {
    state = {
        visible: false,
        editId: 0, //  编辑数据的id
        editType: 'edit', //  编辑类型
        current: 1,
        btnDisabled: false,
    }

    componentDidMount() {
        const data = {
            id: 0,
            pageSize,
            pageIndex: 1,
        }
        this.queryList(data)
    }

    handleChangePage = value => {
        const data = {
            pageSize,
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
            type: 'ruleGroup/fetchList',
            payload: data,
        })
    }

    // 点击编辑按钮
    editRow = (id, name, number) => {
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
            number,
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
            number: '',
        })
    }

    handleOk = () => {
        const { editId, editType } = this.state
        const {
            form: { validateFields },
        } = this.props
        validateFields(async (errors, value) => {
            if (!errors) {
                this.setState({
                    btnDisabled: true,
                })
                const { name, number } = value
                const params = {
                    id: editType === 'add' ? null : editId,
                    ruleGroupName: name,
                    ruleGroupNumber: number,
                }
                const res = await saveRuleGroup(params)

                if (res.success) {
                    this.setState({
                        visible: false,
                        btnDisabled: false,
                    })
                    message.success(editType === 'add' ? '新增规则组成功!' : '编辑规则组成功!')
                    const data = {
                        id: 0,
                        pageSize,
                        pageIndex: 1,
                    }
                    this.setState({
                        current: 1,
                    })
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
        const { visible, current, btnDisabled } = this.state
        const {
            form: { getFieldDecorator },
            ruleGroup: { list, total },
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
                title: '名称',
                dataIndex: 'ruleGroupName',
            },
            {
                title: '规则组编号',
                dataIndex: 'ruleGroupNumber',
            },
            {
                title: '操作',
                dataIndex: 'operate',
                render: (_, record) => (
                    <a
                        onClick={() =>
                            this.editRow(
                                record.id,
                                record.ruleGroupName,
                                record.ruleGroupNumber,
                                record
                            )
                        }
                    >
                        编辑
                    </a>
                ),
            },
        ]

        const buttonGroup = [
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
                    <SearchForm buttonGroup={buttonGroup} />
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
                        <FormItem label="规则组编号" {...formItemLayout}>
                            {getFieldDecorator('number', {
                                rules: [{ required: true, message: '该项必填！' }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="规则组名" {...formItemLayout}>
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

export default Form.create()(RuleGroup)
