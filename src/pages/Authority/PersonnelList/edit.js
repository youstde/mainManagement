import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Form, Input, Select, Button, message } from 'antd'

import { storeBaseGet } from '@/services/common'

const { Option } = Select
// const { TextArea } = Input

@connect(() => ({}))
class EditPerson extends PureComponent {
    state = {
        storeList: [],
        dataSource: {},
    }

    componentDidMount() {
        const { members } = this.props
        this.setState({
            dataSource: members || {},
        })
        this.fetchStoreList()
    }

    fetchStoreList = () => {
        storeBaseGet({
            t: 'list',
            index: 1,
            size: 100,
        }).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    storeList: res.data,
                })
            }
        })
    }

    handlesubmit = e => {
        alert(1)
        e.preventDefault()
        const { form } = this.props
        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
            }
        })
    }

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致,请检查密码!')
        } else {
            callback()
        }
    }

    render() {
        const {
            form: { getFieldDecorator },
        } = this.props
        const { storeList, dataSource } = this.state

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

        function createStoreOptions() {
            const options = storeList.map(item => {
                return (
                    <Option key={item.id} value={item.id}>
                        {item.name}
                    </Option>
                )
            })
            return options
        }

        return (
            <Fragment>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="成员姓名">
                        {getFieldDecorator('name', {
                            initialValue: dataSource.name || '',
                            rules: [
                                {
                                    required: true,
                                    message: '成员姓名不能为空!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="手机号码">
                        {getFieldDecorator('mobile', {
                            initialValue: dataSource.mobile || '',
                            rules: [
                                {
                                    required: true,
                                    message: '手机号码不能为空!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="管理员类型">
                        {getFieldDecorator('type', {
                            initialValue: dataSource.type || '',
                            rules: [
                                {
                                    required: true,
                                    message: '管理员类型不能为空!',
                                },
                            ],
                        })(
                            <Select>
                                <Option value="1">平台</Option>
                                <Option value="2">门店</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="所属门店">
                        {getFieldDecorator('mch_id', {
                            initialValue: dataSource.mch_id || '',
                            rules: [
                                {
                                    required: true,
                                    message: '所属门店不能为空!',
                                },
                            ],
                        })(<Select>{createStoreOptions()}</Select>)}
                    </Form.Item>
                    <Form.Item label="登录密码">
                        {getFieldDecorator('password', {
                            initialValue: dataSource.password || '',
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item label="确认密码">
                        {getFieldDecorator('password', {
                            initialValue: dataSource.password || '',
                            rules: [
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                    </Form.Item>
                    {/* <Form.Item label="备注信息">
                        {getFieldDecorator('confirm', {
                            initialValue: dataSource.confirm || '',
                        })(<TextArea rows={4} />)}
                    </Form.Item> */}
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

export default Form.create({ name: 'edit-person' })(EditPerson)
