import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Form, Input, Select, Button } from 'antd'

import { storeBaseGet, purchaseGet } from '@/services/common'

const { Option } = Select

// import Button from '@/components/Button'

@connect(() => ({}))
class CreateTabelItem extends PureComponent {
    state = {
        mockArr: [
            {
                label: 's1',
                id: 1,
            },
            {
                label: 's2',
                id: 2,
            },
            {
                label: 's3',
                id: 3,
            },
        ],
        storeList: [],
    }

    componentDidMount() {
        // this.fetchOrderDetail()
        this.fetchStoreData()
    }

    // 获取详情
    fetchOrderDetail = () => {}

    fetchStoreData = () => {
        storeBaseGet({
            t: 'list',
        }).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    storeList: res.data,
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
                purchaseGet({
                    t: 'sku.save',
                    args: ids,
                    skuid: values.skuid,
                    mch_id: values.mch_id,
                    quantity_real: values.quantity_real,
                }).then(res => {
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
        const { storeList } = this.state

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

        function createOption(arr) {
            const OptionsArr = []
            // eslint-disable-next-line array-callback-return
            arr.some(item => {
                OptionsArr.push(
                    <Option key={item.id} value={item.id}>
                        {item.name}
                    </Option>
                )
            })
            return OptionsArr.concat()
        }

        const skuArrOptionsArr = createOption(storeList)

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
                            })(<Input placeholder="请输入skuId" />)}
                        </Form.Item>
                        <Form.Item label="门店">
                            {getFieldDecorator('mch_id', {
                                rules: [
                                    {
                                        required: true,
                                        message: '门店不能为空!',
                                    },
                                ],
                            })(<Select onChange={() => {}}>{skuArrOptionsArr}</Select>)}
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
