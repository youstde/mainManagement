import React, { Component } from 'react'
import { Modal, Form, Alert, Select, Input } from 'antd'

import { getAuditUsers } from '@/services/common'
import { AUDIT_TYPE } from '@/utils/dict'

const TYPE_KEY_MAP = {
    '/inloan/purchase': 'order',
    '/inloan/financing': 'discount',
    '/inloan/withdraw': 'withdraw',
}

@Form.create()
class ChangeSignModal extends Component {
    state = {
        auditUsers: [],
    }

    componentDidMount() {
        const typeKey = TYPE_KEY_MAP[window.location.pathname]

        if (!typeKey) {
            console.warn('在 changeSign 上，配置 TYPE_KEY_MAP ，路由对应 dict 中的 AUDIT_TYPE')
        } else {
            const type = AUDIT_TYPE[typeKey]

            getAuditUsers(type).then(res => {
                if (res && res.success) {
                    this.setState({
                        auditUsers: res.data,
                    })
                }
            })
        }
    }

    handleOk = () => {
        const {
            onOk = () => {},
            form: { validateFields },
        } = this.props

        validateFields((errors, values) => {
            if (!errors) {
                onOk(values)
            }
        })
    }

    handleCancel = () => {
        const { onCancel = () => {} } = this.props

        onCancel()
    }

    render() {
        const { auditUsers } = this.state
        const {
            visible,
            form: { getFieldDecorator },
        } = this.props

        return (
            <Modal
                title="选择转签对象"
                destroyOnClose
                visible={visible}
                okText="转签"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Alert message="以下是转签给另一位审批人员" type="info" />
                <br />
                <Form>
                    <Form.Item label="选择用户">
                        {getFieldDecorator('changeUserId', {
                            rules: [{ required: true, message: '该项必填！' }],
                        })(
                            <Select>
                                {auditUsers.map(item => (
                                    <Select.Option value={item.userId} key={item.userId}>
                                        {item.userName}
                                    </Select.Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="意见">
                        {getFieldDecorator('remark', {
                            rules: [{ required: true, message: '该项必填！' }],
                        })(<Input.TextArea rows={4} />)}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default ChangeSignModal
