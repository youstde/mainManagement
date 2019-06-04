import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Input, DatePicker, Row, Col } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import EditableTable from './components/editTabel'

// import { fetchFunction } from '@/services'
const fetchFunction = async () => ({ data: { list: [], count: 0 }, success: true })

@connect(() => ({}))
class PurchaseCreateOrder extends Component {
    state = {}

    componentDidMount() {
        // this.fetchData()
    }

    // 请求表格的数据
    fetchData = (parmas = {}) => {
        const { pageNum, ...params } = parmas
        const { pagination, searchCondition } = this.state

        fetchFunction({
            pageSize: pagination.pageSize,
            pageNum: pageNum || pagination.current,
            ...searchCondition,
            ...params,
        }).then(res => {
            if (res && res.success) {
                this.setState({
                    dataSrouce: res.data.list,
                    pagination: {
                        ...pagination,
                        total: res.data.count,
                    },
                })
            }
        })
    }

    handleSubmit = () => {
        const { form } = this.props
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
            }
        })
    }

    render() {
        const {
            form: { getFieldDecorator },
        } = this.props
        const columns = [
            {
                title: 'skuid',
                dataIndex: 'skuId',
            },
            {
                title: 'sku品名',
                dataIndex: 'skuName',
            },
            {
                title: '品类',
                dataIndex: 'goodsClass',
            },
            {
                title: '品种',
                dataIndex: 'goodsType',
            },
            {
                title: '产区',
                dataIndex: 'area',
            },
            {
                title: '存储情况',
                dataIndex: 'storecase',
            },
            {
                title: '加工情况',
                dataIndex: 'processcase',
            },
            {
                title: '外包装',
                dataIndex: 'outpackage',
            },
            {
                title: '内包装',
                dataIndex: 'innerpackage',
            },
            {
                title: '等级',
                dataIndex: 'level',
            },
            {
                title: '品牌',
                dataIndex: 'brand',
            },
            {
                title: '规格',
                dataIndex: 'size',
            },
            {
                title: '规格值',
                dataIndex: 'sizeNum',
            },
            {
                title: '订货门店名称',
                dataIndex: 'orderStore',
            },
            {
                title: '实际规格值',
                dataIndex: 'factSize',
                editable: true,
            },
            {
                title: '净重',
                dataIndex: 'clearWeight',
                editable: true,
            },
            {
                title: '实际采购数量',
                dataIndex: 'faceOrderNum',
                editable: true,
            },
            {
                title: '采购单价',
                dataIndex: 'buySinglePrice',
                editable: true,
            },
            {
                title: '订货数量',
                dataIndex: 'orderNum',
                editable: true,
            },
            {
                title: '采购成本',
                dataIndex: 'buyBeforePrice',
                editable: true,
            },
        ]

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

        return (
            <PageHeaderWrapper>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item label="采购日期">
                                {getFieldDecorator('orderDate', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ],
                                })(<DatePicker />)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="采购总成本">
                                {getFieldDecorator('orderAllPrice', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ],
                                })(<Input type="number" />)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="采购人员">
                                {getFieldDecorator('orderPeople', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ],
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item label="采购总件数">
                                {getFieldDecorator('orderAllNum', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ],
                                })(<Input type="number" />)}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <EditableTable
                    tabelLocalType={0}
                    tabelColumns={columns}
                    handleSubmit={this.handleSubmit}
                />
            </PageHeaderWrapper>
        )
    }
}

export default Form.create({ name: 'PurchaseCreateOrder' })(PurchaseCreateOrder)
