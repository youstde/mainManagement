import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Form, Row, Col, Select, Button } from 'antd'

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
    }

    componentDidMount() {
        // this.fetchOrderDetail()
    }

    // 获取详情
    fetchOrderDetail = () => {}

    handleCreateOrder = e => {
        e.preventDefault()
        const { form, handleCancelCreateItem } = this.props
        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                window.sendMessage('update:dataSource', values)
            }
            handleCancelCreateItem()
        })
    }

    render() {
        const {
            form: { getFieldDecorator },
        } = this.props
        const { mockArr } = this.state

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
                        {item.label}
                    </Option>
                )
            })
            return OptionsArr.concat()
        }

        const skuArrOptionsArr = createOption(mockArr)
        const skuNameArrOptionsArr = createOption(mockArr)
        const goodsClassOptionsArr = createOption(mockArr)
        const goodsTypeArrOptionsArr = createOption(mockArr)
        const areaOptionsArr = createOption(mockArr)
        const storecaseOptionsArr = createOption(mockArr)
        const processcaseOptionsArr = createOption(mockArr)
        const outpackageOptionsArr = createOption(mockArr)
        const innerpackageOptionsArr = createOption(mockArr)
        const levelOptionsArr = createOption(mockArr)
        const brandOptionsArr = createOption(mockArr)
        const sizeOptionsArr = createOption(mockArr)
        const sizeNumOptionsArr = createOption(mockArr)
        const orderStoreOptionsArr = createOption(mockArr)

        return (
            <Fragment>
                <div>
                    <Form {...formItemLayout} onSubmit={this.handleCreateOrder}>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="skuId">
                                    {getFieldDecorator('skuId', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'skuId不能为空!',
                                            },
                                        ],
                                    })(<Select onChange={() => {}}>{skuArrOptionsArr}</Select>)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="sku品名">
                                    {getFieldDecorator('skuName', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'skuId不能为空!',
                                            },
                                        ],
                                    })(<Select onChange={() => {}}>{skuNameArrOptionsArr}</Select>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="品类">
                                    {getFieldDecorator('goodsClass', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'skuId不能为空!',
                                            },
                                        ],
                                    })(<Select onChange={() => {}}>{goodsClassOptionsArr}</Select>)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="品种">
                                    {getFieldDecorator('goodsType', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'skuId不能为空!',
                                            },
                                        ],
                                    })(
                                        <Select onChange={() => {}}>
                                            {goodsTypeArrOptionsArr}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="产区">
                                    {getFieldDecorator('area', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'skuId不能为空!',
                                            },
                                        ],
                                    })(<Select onChange={() => {}}>{areaOptionsArr}</Select>)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="存储情况">
                                    {getFieldDecorator('storecase', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'skuId不能为空!',
                                            },
                                        ],
                                    })(<Select onChange={() => {}}>{storecaseOptionsArr}</Select>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="加工情况">
                                    {getFieldDecorator('processcase', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'skuId不能为空!',
                                            },
                                        ],
                                    })(
                                        <Select onChange={() => {}}>{processcaseOptionsArr}</Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="外包装">
                                    {getFieldDecorator('outpackage', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'skuId不能为空!',
                                            },
                                        ],
                                    })(<Select onChange={() => {}}>{outpackageOptionsArr}</Select>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="内包装">
                                    {getFieldDecorator('innerpackage', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'skuId不能为空!',
                                            },
                                        ],
                                    })(
                                        <Select onChange={() => {}}>
                                            {innerpackageOptionsArr}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="等级">
                                    {getFieldDecorator('level', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'skuId不能为空!',
                                            },
                                        ],
                                    })(<Select onChange={() => {}}>{levelOptionsArr}</Select>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="品牌">
                                    {getFieldDecorator('brand', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'skuId不能为空!',
                                            },
                                        ],
                                    })(<Select onChange={() => {}}>{brandOptionsArr}</Select>)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="规格">
                                    {getFieldDecorator('size', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'skuId不能为空!',
                                            },
                                        ],
                                    })(<Select onChange={() => {}}>{sizeOptionsArr}</Select>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="规格值">
                                    {getFieldDecorator('sizeNum', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'skuId不能为空!',
                                            },
                                        ],
                                    })(<Select onChange={() => {}}>{sizeNumOptionsArr}</Select>)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="订货门店">
                                    {getFieldDecorator('orderStore', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'skuId不能为空!',
                                            },
                                        ],
                                    })(<Select onChange={() => {}}>{orderStoreOptionsArr}</Select>)}
                                </Form.Item>
                            </Col>
                        </Row>
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
