/* eslint-disable camelcase */
import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Input, DatePicker, Row, Col, Select, Upload, Modal, Icon, message } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import EditableTable from './components/editTabel'
import CreateTabelItem from './createTabelItem'
import Button from '@/components/Button'

import { goodsPost, generalPost, configurationGet, purchasePost } from '@/services/common'
import { createSignOptions, clearDate } from '@/utils/utils'

const { Option } = Select

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}

@connect(() => ({}))
class PurchaseManualCreateOrder extends Component {
    state = {
        providerCid: 'A2CDF5CDE38BEFEB3E',
        showCreateOrderItem: false,
        previewVisible: false,
        previewImage: '',
        ids: '',
        fileList: [],
        dataSrouce: [],
        providerData: [],
        pagination: {
            current: 1,
            pageSize: 50,
            total: 0,
        },
    }

    componentDidMount() {
        this.fetchData()
        this.fetchProvierData()
    }

    // 请求表格的数据
    fetchData = () => {
        const { pagination } = this.state
        const { form } = this.props
        const params = {
            t: 'purchase.skus',
            args: 1,
            size: pagination.pageSize,
            index: pagination.current,
        }
        createSignOptions(params)
        const formData = new FormData()
        Object.keys(params).forEach(key => {
            formData.append(key, params[key])
        })

        goodsPost('', formData).then(res => {
            if (res && res.errcode === 0) {
                const { cost_total, quantity_total } = res.additional
                form.setFieldsValue({
                    cost_total: cost_total || 0,
                    quantity_total: quantity_total || 0,
                })
                let str = ''
                res.data.forEach(item => {
                    str += `${item.id},`
                })
                str = str.replace(/,$/, '')

                this.setState({
                    dataSrouce: res.data,
                    ids: str,
                    pagination: {
                        ...pagination,
                        total: res.pages.count,
                    },
                })
            }
        })
    }

    fetchProvierData = () => {
        const { providerCid } = this.state
        configurationGet({
            t: 'values',
            cid: providerCid,
        }).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    providerData: res.data[providerCid],
                })
            }
        })
    }

    clearImgs = imgs => {
        let str = ''
        imgs.forEach(img => {
            str += `${img.url},`
        })
        str = str.replace(/,$/, '')
        return str
    }

    handleSubmit = () => {
        const { form, history } = this.props
        const { fileList, ids } = this.state
        /**
         * fileList
         * values为form表单中填入的数据（要筛选一下）
         */
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const params = {
                    t: 'order.make',
                    args: ids,
                    cost_total: values.cost_total,
                    buyer: values.buyer,
                    buy_date: clearDate(values.buyDate),
                    quantity_total: values.quantity_total,
                    supplier_id: values.provider,
                    // supplier_address: values.providerAdress,
                }
                if (fileList.length) params.pictures = this.clearImgs(fileList)
                createSignOptions(params)
                const formData = new FormData()
                Object.keys(params).forEach(key => {
                    formData.append(key, params[key])
                })
                purchasePost('', formData).then(res => {
                    if (res && res.errcode === 0) {
                        message.success('生成成功!', 1, () => {
                            history.push('/purchase/purchasebill/list')
                        })
                    }
                })
            }
        })
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        })
    }

    handleImgChange = ({ fileList }) => this.setState({ fileList })

    handleCreateOrder = () => {}

    handleCancelCreateItem = () => {
        this.setState({
            showCreateOrderItem: false,
        })
        this.fetchData()
    }

    handleShowCreateOrder = () => {
        this.setState({
            showCreateOrderItem: true,
        })
    }

    handleEditInputChange = params => {
        const { form } = this.props
        form.setFieldsValue(params)
    }

    handleImgSubmit = file => {
        const { fileList } = this.state
        const formData = new FormData()
        formData.append('files[]', file)
        generalPost(
            {
                t: 'upload',
            },
            formData
        ).then(res => {
            if (res && res.errcode === 0) {
                const newItem = {
                    url: res.data.path,
                    uid: res.request_id,
                }
                this.setState({
                    fileList: [...fileList, newItem],
                })
            }
        })
    }

    handleProviderChange = id => {
        const { form } = this.props
        const { providerData } = this.state
        let adress = ''
        providerData.forEach(item => {
            if (item.id === id) {
                adress = item.address
            }
        })
        // form.setFieldsValue({
        //     providerAdress: adress,
        // })
    }

    render() {
        const {
            form: { getFieldDecorator },
        } = this.props
        // 供应商列表Mock
        const {
            previewVisible,
            previewImage,
            fileList,
            showCreateOrderItem,
            dataSrouce,
            ids,
            providerData,
        } = this.state

        const columns = [
            {
                title: 'skuid',
                dataIndex: 'skuid',
            },
            {
                title: 'sku品名',
                dataIndex: 'name',
            },
            {
                title: '品类',
                dataIndex: 'category_name',
            },
            {
                title: '品种',
                dataIndex: 'variety_name',
            },
            {
                title: '产区',
                dataIndex: 'region_name',
            },
            {
                title: '存储情况',
                dataIndex: 'storage_name',
            },
            {
                title: '加工情况',
                dataIndex: 'process_name',
            },
            {
                title: '外包装',
                dataIndex: 'packing_name_a',
            },
            {
                title: '内包装',
                dataIndex: 'packing_name_b',
            },
            {
                title: '等级',
                dataIndex: 'levels',
            },
            {
                title: '品牌',
                dataIndex: 'brand_name',
            },
            {
                title: '单位',
                dataIndex: 'specification_name',
            },
            {
                title: '规格值',
                dataIndex: 'specification_value',
            },
            {
                title: '订货门店',
                dataIndex: 'merchant_name',
            },
            {
                title: '订货数量',
                dataIndex: 'quantity',
            },
            {
                title: '实际规格值',
                dataIndex: 'specification_real',
                editable: true,
            },
            {
                title: '净重',
                dataIndex: 'weight_net',
                editable: true,
            },
            {
                title: '实际采购数量',
                dataIndex: 'quantity_real',
                editable: true,
            },
            {
                title: '采购单价',
                dataIndex: 'price_unit',
                editable: true,
            },
            {
                title: '采购成本',
                dataIndex: 'price_total',
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

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        )

        function createProviderOption() {
            const arr = providerData.map(item => {
                return (
                    <Option key={item.id} value={item.id}>
                        {item.name}
                    </Option>
                )
            })
            return arr
        }

        return (
            <PageHeaderWrapper>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item label="采购日期">
                                {getFieldDecorator('buyDate', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择采购日期!',
                                        },
                                    ],
                                })(<DatePicker />)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="采购总成本">
                                {getFieldDecorator('cost_total', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请在表格中填写采购成本!',
                                        },
                                    ],
                                })(
                                    <Input
                                        readOnly
                                        type="number"
                                        placeholder="此项为动态生成，无需填写"
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="采购人员">
                                {getFieldDecorator('buyer', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '采购人员不能为空!',
                                        },
                                    ],
                                })(<Input placeholder="请输入采购人员" />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item label="采购总件数">
                                {getFieldDecorator('quantity_total', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请在表格中填写采购件数!',
                                        },
                                    ],
                                })(
                                    <Input
                                        readOnly
                                        type="number"
                                        placeholder="此项为动态生成，无需填写"
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="采购供应商">
                                {getFieldDecorator('provider', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择采购供应商!',
                                        },
                                    ],
                                })(
                                    <Select
                                        onChange={value => {
                                            this.handleProviderChange(value)
                                        }}
                                    >
                                        {createProviderOption()}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        {/* <Col span={8}>
                            <Form.Item label="供应商地址">
                                {getFieldDecorator('providerAdress')(
                                    <Input readOnly placeholder="此项为动态生成，无需填写" />
                                )}
                            </Form.Item>
                        </Col> */}
                    </Row>
                </Form>
                <Row gutter={24}>
                    <Col span={3}>采购单图片: </Col>
                    <Col span={21}>
                        <div className="clearfix">
                            <Upload
                                action={file => {
                                    this.handleImgSubmit(file)
                                }}
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleImgChange}
                            >
                                {uploadButton}
                            </Upload>
                            <Modal
                                visible={previewVisible}
                                footer={null}
                                onCancel={this.handleCancel}
                            >
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </div>
                    </Col>
                </Row>
                <Modal
                    title="填写订单数据"
                    visible={showCreateOrderItem}
                    footer={null}
                    onCancel={this.handleCancelCreateItem}
                    destroyOnClose
                >
                    <CreateTabelItem
                        ids={ids}
                        handleCancelCreateItem={this.handleCancelCreateItem}
                    />
                </Modal>
                <div style={{ textAlign: 'right', padding: '20px 0' }}>
                    <Button
                        onClick={() => this.handleShowCreateOrder()}
                        size="small"
                        type="default"
                    >
                        创建订单
                    </Button>
                </div>
                {dataSrouce.length ? (
                    <EditableTable
                        rowKey={record => record.id}
                        tabelLocalType={0}
                        tabelData={dataSrouce}
                        tabelColumns={columns}
                        handleSubmit={this.handleSubmit}
                        inputChangeBc={this.handleEditInputChange}
                        ids={ids}
                    />
                ) : (
                    ''
                )}
            </PageHeaderWrapper>
        )
    }
}

export default Form.create({ name: 'PurchaseManualCreateOrder' })(PurchaseManualCreateOrder)
