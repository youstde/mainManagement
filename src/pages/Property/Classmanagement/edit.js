import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Input, Button, message } from 'antd'

import { configurationGet } from '@/services/common'

@connect(() => ({}))
class EditItem extends Component {
    state = {
        item: {},
    }

    componentDidMount() {
        const { item } = this.props
        this.setState({
            item,
        })
        // this.fetchData()
    }

    handleSubmit = e => {
        e.preventDefault()
        const { form, cancelBc, pageConfig, item } = this.props
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                configurationGet({
                    t: 'save',
                    id: item.id || 0,
                    cid: pageConfig.cid,
                    name: values.name,
                    ssid: values.ssid,
                }).then(res => {
                    if (res && res.errcode === 0) {
                        message.success('操作成功!', 2)
                    }
                    cancelBc()
                })
            }
        })
    }

    render() {
        const {
            form: { getFieldDecorator },
            fields,
        } = this.props
        const { item } = this.state

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
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 10,
                },
            },
        }

        function createFormItem() {
            const arr = fields.map(field => {
                return (
                    <Form.Item label={field.show_name}>
                        {getFieldDecorator(field.field_name, {
                            initialValue: item[field.field_name] || field.default_value,
                            rules: [
                                {
                                    required: true,
                                    message: '此项不能为空!',
                                },
                            ],
                        })(<Input placeholder={field.placeholder} />)}
                    </Form.Item>
                )
            })
            return arr
        }

        return (
            <div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    {createFormItem()}
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Form.create({ name: 'edit-item' })(EditItem)
