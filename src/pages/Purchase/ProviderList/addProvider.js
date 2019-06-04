import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Form, Input, Select, Button } from 'antd'

import { filterFormItemValue } from '@/utils/utils'

const { Option } = Select

// import Button from '@/components/Button'

@connect(() => ({}))
class AddProvider extends PureComponent {
    state = {
        selectArr: [
            {
                key: 1,
                label: '厨具',
            },
            {
                key: 2,
                label: '家具',
            },
            {
                key: 3,
                label: 'test3',
            },
            {
                key: 4,
                label: 'test4',
            },
        ],
    }

    componentDidMount() {
        const { data } = this.props
        console.log(data)
        // this.fetchOrderDetail()
    }

    handleSubmit = e => {
        e.preventDefault()
        // ===tip==>通过判断通过props传过来的data中有没有id从而确定是编辑还是新建
        const { form, cancelModal } = this.props
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const newValues = filterFormItemValue(values, ['providerClass'])
                console.log('Received values of form: ', newValues)
                cancelModal()
            }
        })
    }

    render() {
        const {
            form: { getFieldDecorator },
            data: {
                providerName,
                providerAdress,
                providerClass,
                providerLinkPeople,
                providerPhone,
                settleTimer,
                bankAccount,
                bank,
                bankNum,
            },
        } = this.props

        const { selectArr } = this.state

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
                    <Form.Item label="供应商公司名称">
                        {getFieldDecorator('providerName', {
                            initialValue: providerName,
                            rules: [
                                {
                                    required: true,
                                    message: '供应商名称不能为空!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="供应品类">
                        {getFieldDecorator('providerClass', {
                            initialValue: providerClass,
                            rules: [
                                {
                                    required: true,
                                    message: '供应品类不能为空!',
                                },
                            ],
                        })(
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="请选择品类(可多选)"
                                onChange={this.handleChange}
                            >
                                {selectArr.map(item => (
                                    <Option value={item.key} label={item.label} key={item.key}>
                                        {item.label}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="供应商地址">
                        {getFieldDecorator('providerAdress', {
                            initialValue: providerAdress,
                            rules: [
                                {
                                    required: true,
                                    message: '供应商地址不能为空!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="供应商联系人">
                        {getFieldDecorator('providerLinkPeople', {
                            initialValue: providerLinkPeople,
                            rules: [
                                {
                                    required: true,
                                    message: '供应商联系人不能为空!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="供应商联系电话">
                        {getFieldDecorator('providerPhone', {
                            initialValue: providerPhone,
                            rules: [
                                {
                                    required: true,
                                    message: '供应商联系电话不能为空!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="供应商结算周期">
                        {getFieldDecorator('settleTimer', {
                            initialValue: settleTimer,
                            rules: [
                                {
                                    required: true,
                                    message: '供应商结算周期不能为空!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="供应商银行账户">
                        {getFieldDecorator('bankAccount', {
                            initialValue: bankAccount,
                            rules: [
                                {
                                    required: true,
                                    message: '供应商银行账户不能为空!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="供应商开户行">
                        {getFieldDecorator('bank', {
                            initialValue: bank,
                            rules: [
                                {
                                    required: true,
                                    message: '供应商开户行不能为空!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="银行账号">
                        {getFieldDecorator('bankNum', {
                            initialValue: bankNum,
                            rules: [
                                {
                                    required: true,
                                    message: '银行账号不能为空!',
                                },
                            ],
                        })(<Input type="number" />)}
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

export default Form.create({ name: 'AddProvider' })(AddProvider)
