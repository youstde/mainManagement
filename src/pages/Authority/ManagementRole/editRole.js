import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Form, Input, message, Radio, Button } from 'antd'

import { baseGet } from '@/services/common'

const { TextArea } = Input

@connect(() => ({}))
class EditRole extends PureComponent {
    state = {}

    componentDidMount() {}

    handleSubmit = e => {
        e.preventDefault()
        const {
            form,
            roleData: { id = '' },
            onCancel,
        } = this.props
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                baseGet({
                    t: 'role.save',
                    id,
                    ...values,
                }).then(res => {
                    if (res && res.errcode === 0) {
                        message.success('编辑成功!', 2)
                        onCancel()
                    }
                })
            }
        })
    }

    render() {
        const {
            form: { getFieldDecorator },
            roleData: { name, intro, type },
        } = this.props

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }

        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 10 },
                sm: { span: 20, offset: 10 },
            },
        }

        return (
            <Fragment>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="角色名称">
                        {getFieldDecorator('name', {
                            initialValue: name || '',
                            rules: [
                                {
                                    required: true,
                                    message: '角色名称不能为空!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="角色描述">
                        {getFieldDecorator('intro', {
                            initialValue: intro || '',
                            rules: [
                                {
                                    required: true,
                                    message: '角色描述不能为空!',
                                },
                            ],
                        })(<TextArea rows={4} />)}
                    </Form.Item>
                    <Form.Item label="管理员类型">
                        {getFieldDecorator('type', {
                            initialValue: type || '',
                            rules: [
                                {
                                    required: true,
                                    message: '管理员类型不能为空!',
                                },
                            ],
                        })(
                            <Radio.Group>
                                <Radio value={1}>总店</Radio>
                                <Radio value={2}>门店</Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayoutWithOutLabel}>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Form.Item>
                </Form>
            </Fragment>
        )
    }
}

export default Form.create({ name: 'Edit_role' })(EditRole)
