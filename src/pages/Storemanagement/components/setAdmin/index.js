import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Form, Input, Button, message } from 'antd'

import { storeBaseGet } from '@/services/common'

@connect(() => ({}))
class SetAdmin extends PureComponent {
    state = {
        dataSource: {},
    }

    componentDidMount() {
        this.fetchAdminData()
    }

    fetchAdminData = () => {
        const { storeId } = this.props
        storeBaseGet({
            t: 'manager.get',
            id: storeId,
        }).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    dataSource: res.data,
                })
            }
        })
    }

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
        const { form, handleCancel, storeId } = this.props
        form.validateFields((err, values) => {
            if (!err) {
                storeBaseGet({
                    t: 'manager.set',
                    id: storeId,
                    mobile: values.mobile,
                    name: values.name,
                    pwd: values.password,
                }).then(res => {
                    if (res && res.errcode === 0) {
                        message.success('设置成功!', 2)
                        handleCancel()
                    }
                })
            }
        })
    }

    render() {
        const {
            form: { getFieldDecorator },
        } = this.props
        const { handleSubmit } = this
        const { dataSource } = this.state

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

        return (
            <Fragment>
                <Form {...formItemLayout} onSubmit={handleSubmit}>
                    <Form.Item label="管理员姓名">
                        {getFieldDecorator('name', {
                            initialValue: dataSource.name,
                            rules: [
                                {
                                    required: true,
                                    message: '管理员姓名不能为空!',
                                },
                            ],
                        })(<Input placeholder="姓名" />)}
                    </Form.Item>
                    <Form.Item label="管理员账号">
                        {getFieldDecorator('mobile', {
                            initialValue: dataSource.mobile,
                            rules: [
                                {
                                    required: true,
                                    message: '手机号码不能为空!',
                                },
                                {
                                    validator: this.validateToPhone,
                                },
                            ],
                        })(<Input type="number" placeholder="手机号码" />)}
                    </Form.Item>
                    <Form.Item label="管理员密码">
                        {getFieldDecorator('password', {
                            initialValue: dataSource.password,
                            rules: [
                                {
                                    required: true,
                                    message: '密码不能为空!',
                                },
                            ],
                        })(<Input.Password placeholder="请输入管理员密码" />)}
                    </Form.Item>
                    <Form.Item label="确认密码">
                        {getFieldDecorator('confirPpassword', {
                            initialValue: dataSource.password,
                            rules: [
                                {
                                    required: true,
                                    message: '密码不能为空!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password placeholder="请确认管理员密码" />)}
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

export default Form.create({ name: 'set-admin' })(SetAdmin)
