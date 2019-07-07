/* eslint-disable camelcase */
import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Input, DatePicker, Row, Col, Select, Upload, Modal, Icon, message } from 'antd'
import { createSignOptions, clearDate } from '@/utils/utils'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import EditableTable from './components/editTabel'

import { goodsBaseGet, configurationGet, generalPost, purchasePost } from '@/services/common'

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
class PurchaseCreateOrder extends Component {
    state = {
        tabelData: [],
        previewVisible: false,
        previewImage: '',
        fileList: [],
        providerCid: 'A2CDF5CDE38BEFEB3E',
        providerData: [],
        ids: '',
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        },
    }

    componentDidMount() {
        // this.fetchData()
        const {
            location: { query },
        } = this.props
        this.fetchProvierData()
        let newIds = ''
        query.ids.split('_').forEach(item => {
            newIds += `${item},`
        })
        newIds = newIds.replace(/,$/, '')
        this.setState(
            {
                ids: newIds,
            },
            () => {
                this.fetchData(newIds)
            }
        )
    }

    // 请求表格的数据
    fetchData = ids => {
        const { form } = this.props
        const { pagination } = this.state
        goodsBaseGet({
            args: ids,
            t: 'purchase.skus',
            size: pagination.pageSize,
            index: pagination.current,
        }).then(res => {
            if (res && res.errcode === 0) {
                const { cost_total, quantity_total } = res.additional
                form.setFieldsValue({
                    cost_total: cost_total || 0,
                    quantity_total: quantity_total || 0,
                })
                this.setState({
                    tabelData: res.data,
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

    handleSubmit = () => {
        const { form, history } = this.props
        const { fileList, ids } = this.state
        /**
         * imgList为上传的图片地址
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
                    supplier_address: values.providerAdress,
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

    clearImgs = imgs => {
        let str = ''
        imgs.forEach(img => {
            str += `${img.url},`
        })
        str = str.replace(/,$/, '')
        return str
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

    handleEditInputChange = params => {
        const { form } = this.props
        form.setFieldsValue(params)
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
        form.setFieldsValue({
            providerAdress: adress,
        })
    }

    render() {
        const {
            form: { getFieldDecorator },
        } = this.props
        // 供应商列表Mock
        const { previewVisible, previewImage, fileList, tabelData, ids, providerData } = this.state
        console.log('tabelData:', tabelData)

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
                title: '规格',
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

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        )

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
                                        disabled
                                        type="number"
                                        placeholder="该字段为动态生成，无需填写"
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
                                            message: '请输入采购人员',
                                        },
                                    ],
                                })(<Input />)}
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
                                        disabled
                                        type="number"
                                        placeholder="该字段为动态生成，无需填写"
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
                                            message: '请选择供应商!',
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
                        <Col span={8}>
                            <Form.Item label="供应商地址">
                                {getFieldDecorator('providerAdress')(
                                    <Input
                                        readOnly
                                        disabled
                                        placeholder="该字段为动态生成，无需填写"
                                    />
                                )}
                            </Form.Item>
                        </Col>
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
                {tabelData.length ? (
                    <EditableTable
                        tabelLocalType={0}
                        tabelColumns={columns}
                        tabelData={tabelData}
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

export default Form.create({ name: 'PurchaseCreateOrder' })(PurchaseCreateOrder)
