import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Form, Input, Button, Select, message } from 'antd'

import { storeBaseGet, baseGet } from '@/services/common'

const { Option } = Select

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
        const { form, cancelModal, members } = this.props
        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values, members)
                if (values.type === '2' && !values.mch_id) {
                    message.warn('请选择所属门店!', 2)
                    return
                }
                const params = {
                    t: 'member.save',
                    mobile: values.mobile,
                    name: values.name,
                    pwd: values.password,
                    type: values.type,
                }
                if (members) {
                    params.id = members.id
                }
                if (values.mch_id) {
                    params.mch_id = values.mch_id
                }
                baseGet(params).then(res => {
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
        } = this.props
        const { handleSubmit } = this

        const { storeList, dataSource } = this.state

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
                <Form {...formItemLayout} onSubmit={handleSubmit}>
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
                            initialValue: dataSource.type ? dataSource.type.toString() : '',
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
                                    required: false,
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
                        {getFieldDecorator('confirmPassword', {
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
