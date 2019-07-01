import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Input, Button, message, DatePicker, Select } from 'antd'
import moment from 'moment'

import { configurationGet } from '@/services/common'

const { Option } = Select

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
        const { form, cancelBc, pageConfig, item, fields } = this.props
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                const params = {
                    t: 'save',
                    id: item.id || 0,
                    cid: pageConfig.cid,
                    // name: values.name,
                    // ssid: values.ssid,
                }
                fields.forEach(field => {
                    const key = field.field_name
                    if (values[key] !== undefined) {
                        if (field.field_type === 'date') {
                            params[key] = this.clearDate(values[key])
                        } else {
                            params[key] = values[key]
                        }
                    }
                })
                configurationGet(params).then(res => {
                    if (res && res.errcode === 0) {
                        message.success('操作成功!', 2)
                    }
                    cancelBc()
                })
            }
        })
    }

    clearDate = date => {
        const newDate = new Date(date)
        const year = newDate.getFullYear()
        let month = newDate.getMonth() + 1
        let day = newDate.getDate()
        const hour = newDate.getHours() < 10 ? `0${newDate.getHours()}` : newDate.getHours()
        const minute = newDate.getMinutes() < 10 ? `0${newDate.getMinutes()}` : newDate.getMinutes()
        const second = newDate.getSeconds() < 10 ? `0${newDate.getSeconds()}` : newDate.getSeconds()
        month = month < 10 ? `0${month}` : month
        day = day < 10 ? `0${day}` : day

        return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    }

    onDateOk = (value, fieldName) => {
        const { form } = this.props
        form.setFieldsValue({
            [fieldName]: value,
        })
    }

    handleSelectChange = () => {}

    render() {
        const {
            form: { getFieldDecorator },
            fields,
        } = this.props
        const { item } = this.state
        const { onDateOk, handleSelectChange } = this

        console.log('teim:', item)

        const dateFormat = 'YYYY-MM-DD hh:mm:ss'

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

        function createSelectOption(selects) {
            const arr = selects.map(one => {
                return (
                    <Option value={one.value} key={one.value}>
                        {one.text}
                    </Option>
                )
            })
            return arr
        }
        function createFormItem() {
            const arr = fields.map(field => {
                switch (field.field_type) {
                    case 'date':
                        return (
                            <Form.Item label={field.show_name}>
                                {getFieldDecorator(field.field_name, {
                                    initialValue: item[field.field_name]
                                        ? moment(item[field.field_name], dateFormat)
                                        : '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '此项不能为空!',
                                        },
                                    ],
                                })(
                                    <DatePicker
                                        showTime
                                        placeholder={field.placeholder || '请选择时间'}
                                        onOk={value => {
                                            onDateOk(value, field.field_name)
                                        }}
                                    />
                                )}
                            </Form.Item>
                        )
                    case 'select':
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
                                })(
                                    <Select onChange={handleSelectChange}>
                                        {createSelectOption(field.selects || [])}
                                    </Select>
                                )}
                            </Form.Item>
                        )
                    default:
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
                                })(
                                    <Input
                                        disabled={
                                            item[field.field_name] !== undefined &&
                                            field.unmodifiable === 1
                                        }
                                        placeholder={field.placeholder}
                                    />
                                )}
                            </Form.Item>
                        )
                }
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
