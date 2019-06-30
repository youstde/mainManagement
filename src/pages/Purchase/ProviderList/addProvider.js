import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Form, Input, Select, Button, message } from 'antd'

import { filterFormItemValue } from '@/utils/utils'

import { configurationGet } from '@/services/common'

const { Option } = Select

// import Button from '@/components/Button'

@connect(() => ({}))
class AddProvider extends PureComponent {
    state = {}

    componentDidMount() {
        const { data } = this.props
        console.log('data:', data)
        // this.fetchOrderDetail()
    }

    handleSubmit = e => {
        e.preventDefault()
        // ===tip==>通过判断通过props传过来的data中有没有id从而确定是编辑还是新建
        const { form, cancelModal, data, cid } = this.props
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const newValues = filterFormItemValue(values, ['providerClass'])
                console.log('Received values of form: ', newValues)
                configurationGet({
                    t: 'save',
                    cid,
                    id: data.id || 0,
                    ...newValues,
                }).then(res => {
                    if (res && res.errcode === 0) {
                        message.success('操作成功!', 2)
                    }
                    cancelModal()
                })
            }
        })
    }

    render() {
        const {
            form: { getFieldDecorator },
            data,
            fields,
        } = this.props

        const { handleChange } = this

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

        function createFormItem() {
            console.log('data.ssid:', data.ssid)
            const arr = fields.map(field => {
                if (field.selects.length) {
                    return (
                        <Form.Item label={field.show_name}>
                            {getFieldDecorator(field.field_name, {
                                initialValue: data[field.field_name]
                                    ? data[field.field_name].split(',')
                                    : [],
                                rules: [
                                    {
                                        required: true,
                                        message: '此项不能为空!',
                                    },
                                ],
                            })(
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="请选择(可多选)"
                                    onChange={handleChange}
                                >
                                    {field.selects.map(item => (
                                        <Option
                                            value={item.value}
                                            label={item.text}
                                            key={item.value}
                                        >
                                            {item.text}
                                        </Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                    )
                }

                return (
                    <Form.Item label={field.show_name}>
                        {getFieldDecorator(field.field_name, {
                            initialValue: data[field.field_name] || field.default_value,
                            rules: [
                                {
                                    required: true,
                                    message: '此项不能为空!',
                                },
                            ],
                        })(<Input disabled={field.unmodifiable === 1} />)}
                    </Form.Item>
                )
            })
            return arr
        }

        return (
            <Fragment>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    {createFormItem()}
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

export default Form.create({ name: 'AddProvider' })(AddProvider)
