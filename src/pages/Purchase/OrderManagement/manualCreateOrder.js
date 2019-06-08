import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Input, DatePicker, Row, Col, Select, Upload, Modal, Icon } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import EditableTable from './components/editTabel'
import CreateTabelItem from './createTabelItem'
import Button from '@/components/Button'

import { uploadImg } from './services/index'

const { Option } = Select

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}

// import { fetchFunction } from '@/services'
const fetchFunction = async () => ({ data: { list: [], count: 0 }, success: true })

@connect(() => ({}))
class PurchaseManualCreateOrder extends Component {
    state = {
        providers: [
            {
                label: '南京鲜果批发',
                id: 1,
            },
            {
                label: '海南鲜果批发',
                id: 2,
            },
            {
                label: '杭州古荡批发市场',
                id: 3,
            },
        ],
        showCreateOrderItem: false,
        previewVisible: false,
        previewImage: '',
        imgList: [],
        fileList: [],
    }

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

    handleUploadImg = file => {
        const { imgList } = this.state
        const formData = new FormData()
        formData.append('file', file)
        uploadImg(formData).then(res => {
            // ===tip===>对接口的时候以接口为准
            imgList.push(res.url)
            this.setState({
                imgList,
            })
        })
    }

    handleSubmit = () => {
        const { form } = this.props
        const { imgList } = this.state
        /**
         * imgList为上传的图片地址
         * values为form表单中填入的数据（要筛选一下）
         */
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                console.log('imgList: ', imgList)
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
    }

    handleShowCreateOrder = () => {
        this.setState({
            showCreateOrderItem: true,
        })
    }

    render() {
        const {
            form: { getFieldDecorator },
        } = this.props
        // 供应商列表Mock
        const {
            providers,
            previewVisible,
            previewImage,
            fileList,
            showCreateOrderItem,
        } = this.state

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

        const providerOptionsArr = []
        // eslint-disable-next-line array-callback-return
        providers.some(item => {
            providerOptionsArr.push(
                <Option key={item.id} value={item.id}>
                    {item.label}
                </Option>
            )
        })

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
                        <Col span={8}>
                            <Form.Item label="采购供应商">
                                {getFieldDecorator('provider', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ],
                                })(<Select onChange={() => {}}>{providerOptionsArr}</Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="供应商地址">
                                {getFieldDecorator('providerAdress', {
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
                </Form>
                <Row gutter={24}>
                    <Col span={3}>采购单图片: </Col>
                    <Col span={21}>
                        <div className="clearfix">
                            <Upload
                                action={this.handleUploadImg}
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
                    <CreateTabelItem handleCancelCreateItem={this.handleCancelCreateItem} />
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
                <EditableTable
                    rowKey={record => record.id}
                    tabelLocalType={0}
                    tabelData={null}
                    tabelColumns={columns}
                    handleSubmit={this.handleSubmit}
                />
            </PageHeaderWrapper>
        )
    }
}

export default Form.create({ name: 'PurchaseManualCreateOrder' })(PurchaseManualCreateOrder)
