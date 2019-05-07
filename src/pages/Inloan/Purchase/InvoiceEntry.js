import React, { PureComponent } from 'react'
import { Form, Input, DatePicker, Modal, InputNumber } from 'antd'
import moment from 'moment'

@Form.create()
class InvoiceEntry extends PureComponent {
    handleOk = () => {
        const {
            form: { validateFields },
            onOk = () => {},
        } = this.props
        validateFields((err, vals) => {
            if (!err) {
                vals.invoiceDate = moment(vals.invoiceDate).format('YYYYMMDD')
                vals.invoiceMoney = vals.invoiceMoney.toFixed(2)
                onOk(vals)
            }
        })
    }

    handleCancel = () => {
        const { onCancel = () => {} } = this.props
        onCancel()
    }

    render() {
        const {
            visible,
            form: { getFieldDecorator },
        } = this.props

        const formLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        }

        return (
            <Modal
                title="发票信息录入"
                visible={visible}
                onCancel={this.handleCancel}
                onOk={this.handleOk}
                okText="提交"
                destroyOnClose
            >
                <Form>
                    <Form.Item label="发票代码" {...formLayout}>
                        {getFieldDecorator('invoiceCode', {
                            rules: [{ required: true, message: '该项必填！' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="发票号码" {...formLayout}>
                        {getFieldDecorator('invoiceNo', {
                            rules: [{ required: true, message: '该项必填！' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="发票金额" {...formLayout}>
                        {getFieldDecorator('invoiceMoney', {
                            rules: [{ required: true, message: '该项必填！' }],
                        })(
                            <InputNumber
                                style={{ width: '100%' }}
                                step="0.01"
                                precision={2}
                                placeholder="请输入完整金额：100.20"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="发票时间" {...formLayout}>
                        {getFieldDecorator('invoiceDate', {
                            rules: [{ required: true, message: '该项必填！' }],
                        })(<DatePicker style={{ width: '100%' }} />)}
                    </Form.Item>
                    <Form.Item label="校验码后六位" {...formLayout}>
                        {getFieldDecorator('checkCode', {})(
                            <Input placeholder="普票、电子普票、卷式普票必填" />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default InvoiceEntry
