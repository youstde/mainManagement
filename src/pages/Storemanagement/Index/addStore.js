import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Form, Input, Button, message, Select } from 'antd'

import { storeBaseGet } from '@/services/common'
import { baseConfig } from '@/utils/baseConfig'

const { Option } = Select

@connect(() => ({}))
class AddStore extends PureComponent {
    state = {}

    componentDidMount() {}

    validateToPhone = (rule, value, callback) => {
        if (value && /^[1]([3-9])[0-9]{9}$/.test(value)) {
            callback()
        } else {
            callback('请输入正确格式的手机号!')
        }
    }

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致!')
        } else {
            callback()
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        const { storeItemData } = this.props
        const { form, handleCancel } = this.props
        form.validateFields((err, values) => {
            console.log('values:', values)
            if (!err) {
                const params = {
                    t: 'save',
                    mobile: values.mobile,
                    name: values.name,
                    level: values.level,
                    contacter: values.contacter,
                    address: values.address,
                }
                if (storeItemData.name) params.id = storeItemData.id
                storeBaseGet(params).then(res => {
                    if (res && res.errcode === 0) {
                        message.success('操作成功!', 2)
                        handleCancel()
                    }
                })
            }
        })
    }

    render() {
        const {
            form: { getFieldDecorator },
            storeItemData,
        } = this.props
        const { handleSubmit } = this
        console.log('storeItemData:', storeItemData)
        const formItemLayout = {
            labelCol: {
                xs: { span: 16 },
                sm: { span: 6 },
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

        function createOptions() {
            const options = Object.keys(baseConfig.mch_levels).map(key => {
                return <Option value={key}>{baseConfig.mch_levels[key]}</Option>
            })
            return options
        }

        return (
            <Fragment>
                <Form {...formItemLayout} onSubmit={handleSubmit}>
                    <Form.Item label="门店名称">
                        {getFieldDecorator('name', {
                            initialValue: storeItemData.name || '',
                            rules: [
                                {
                                    required: true,
                                    message: '门店名称不能为空!',
                                },
                            ],
                        })(<Input placeholder="请输入门店名称" />)}
                    </Form.Item>
                    <Form.Item label="门店地址">
                        {getFieldDecorator('address', {
                            initialValue: storeItemData.address || '',
                            rules: [
                                {
                                    required: true,
                                    message: '门店地址不能为空!',
                                },
                            ],
                        })(<Input placeholder="请输入门店地址" />)}
                    </Form.Item>
                    <Form.Item label="门店负责人">
                        {getFieldDecorator('contacter', {
                            initialValue: storeItemData.contacter || '',
                            rules: [
                                {
                                    required: true,
                                    message: '门店负责人不能为空!',
                                },
                            ],
                        })(<Input placeholder="请输入门店负责人" />)}
                    </Form.Item>
                    <Form.Item label="门店负责人手机">
                        {getFieldDecorator('mobile', {
                            initialValue: storeItemData.mobile || '',
                            rules: [
                                {
                                    required: true,
                                    message: '手机号码不能为空!',
                                },
                                {
                                    validator: this.validateToPhone,
                                },
                            ],
                        })(<Input type="number" placeholder="请输入门店负责人手机" />)}
                    </Form.Item>
                    <Form.Item label="门店类型">
                        {getFieldDecorator('level', {
                            initialValue: storeItemData.level ? `${storeItemData.level}` : '',
                            rules: [
                                {
                                    required: true,
                                    message: '门店类型不能为空!',
                                },
                            ],
                        })(<Select>{createOptions()}</Select>)}
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

export default Form.create({ name: 'add-store' })(AddStore)
