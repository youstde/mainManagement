import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Input, Button } from 'antd'

@connect(() => ({}))
class EditItem extends Component {
    state = {}

    componentDidMount() {
        // this.fetchData()
    }

    handleSubmit = e => {
        e.preventDefault()
        const { form, cancelBc } = this.props
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                cancelBc()
            }
        })
    }

    render() {
        const {
            form: { getFieldDecorator },
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

        return (
            <div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="品种名称">
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: '品种名称不能为空!',
                                },
                            ],
                        })(<Input placeholder="请输入品种" />)}
                    </Form.Item>
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
