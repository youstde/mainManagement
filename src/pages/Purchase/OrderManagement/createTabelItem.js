import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Form, Input, Select, Button } from 'antd'

import { storeBaseGet, purchaseGet, generalGet } from '@/services/common'

const { Option } = Select

// import Button from '@/components/Button'

@connect(() => ({}))
class CreateTabelItem extends PureComponent {
    state = {
        storeList: [],
        skuData: [],
    }

    componentDidMount() {
        // this.fetchOrderDetail()
        this.fetchStoreData()
        this.fetchSkuData()
    }

    // 获取详情
    fetchOrderDetail = () => {}

    fetchStoreData = () => {
        generalGet({
            t: 'merchants',
        }).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    storeList: res.data,
                })
            }
        })
    }

    fetchSkuData = () => {
        generalGet({
            t: 'skus',
        }).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    skuData: res.data,
                })
            }
        })
    }

    handleCreateOrder = e => {
        const { ids } = this.props
        e.preventDefault()
        const { form, handleCancelCreateItem } = this.props
        form.validateFields((err, values) => {
            if (!err) {
                const params = {
                    t: 'sku.save',
                    skuid: values.skuid,
                    mch_id: values.mch_id,
                    quantity_real: values.quantity_real,
                }
                if (ids) params.args = ids
                purchaseGet(params).then(res => {
                    if (res && res.errcode === 0) {
                        handleCancelCreateItem()
                        window.sendMessage('update:dataSource', res.data)
                    }
                })
            }
        })
    }

    render() {
        const {
            form: { getFieldDecorator },
        } = this.props
        const { storeList, skuData } = this.state

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

        function createSkuOptions(data) {
            const arr = data.map(item => {
                return (
                    <Option key={item.value} value={item.value}>
                        {item.text}
                    </Option>
                )
            })
            return arr
        }

        return (
            <Fragment>
                <div>
                    <Form {...formItemLayout} onSubmit={this.handleCreateOrder}>
                        <Form.Item label="skuId">
                            {getFieldDecorator('skuid', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'skuId不能为空!',
                                    },
                                ],
                            })(<Select onChange={() => {}}>{createSkuOptions(skuData)}</Select>)}
                        </Form.Item>
                        <Form.Item label="门店">
                            {getFieldDecorator('mch_id', {
                                rules: [
                                    {
                                        required: true,
                                        message: '门店不能为空!',
                                    },
                                ],
                            })(<Select onChange={() => {}}>{createSkuOptions(storeList)}</Select>)}
                        </Form.Item>
                        <Form.Item label="实际采购数量">
                            {getFieldDecorator('quantity_real', {
                                rules: [
                                    {
                                        required: true,
                                        message: '采购数量不能为空!',
                                    },
                                ],
                            })(<Input placeholder="请输入实际采购数量" />)}
                        </Form.Item>
                        <Form.Item {...formItemLayoutWithOutLabel}>
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        )
    }
}

export default Form.create({ name: 'CreateTabelItem' })(CreateTabelItem)
