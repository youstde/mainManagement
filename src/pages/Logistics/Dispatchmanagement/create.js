import React, { Component } from 'react'
import { connect } from 'dva'
import {
    message,
    Form,
    Input,
    Row,
    Col,
    DatePicker,
    Select,
    Upload,
    Icon,
    Modal,
    Button,
} from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'

import { configurationGet, generalPost, logisticsPost } from '@/services/common'
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
class LogisticsDispatchmanagement extends Component {
    state = {
        ids: '',
        logisticsCompanysCid: 'F5622922B41DB0C13D',
        logisticsCompanys: [], // 物流公司列表
        previewVisible: false,
        previewImage: '',
        fileList: [],
    }

    componentDidMount() {
        const {
            location: { query },
        } = this.props
        let newIds = ''
        if (query.ids) {
            newIds = query.ids.replace(/_/, ',')
        }
        this.fetchLogistCompanyData(newIds)
    }

    fetchLogistCompanyData = newIds => {
        const { logisticsCompanysCid } = this.state
        configurationGet({
            t: 'values',
            cid: logisticsCompanysCid,
        }).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    logisticsCompanys: res.data[logisticsCompanysCid],
                    ids: newIds,
                })
            }
        })
    }

    onDateChange = date => {
        const { form } = this.props
        form.setFieldsValue({
            ship_date: date,
        })
    }

    onArriveDateChange = date => {
        const { form } = this.props
        form.setFieldsValue({
            arrive_date: date,
        })
    }

    handleLogisticsSelectChange = () => {}

    handleSubmit = e => {
        e.preventDefault()
        const { fileList, ids } = this.state
        const { form, history } = this.props
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                console.log(fileList)
                let imgStr = ''
                fileList.forEach(item => {
                    imgStr += `${item.url},`
                })
                imgStr = imgStr.replace(/,$/, '')
                const params = {
                    t: 'order.make',
                    ids,
                    logistics_id: values.logistics_id,
                    cost_total: values.cost_total,
                    vehicle_type: values.vehicle_type,
                    vehicle_no: values.vehicle_no,
                    arrive_date: clearDate(values.arrive_date),
                    ship_date: clearDate(values.ship_date),
                    driver_name: values.driver_name,
                    driver_mobile: values.driver_mobile,
                    pictures: imgStr,
                }
                createSignOptions(params)
                const formData = new FormData()
                Object.keys(params).forEach(key => {
                    formData.append(key, params[key])
                })
                logisticsPost('', formData).then(res => {
                    if (res && res.errcode === 0) {
                        message.success('生成成功!', 2, () => {
                            history.replace('/logistics/logisticsbillmanagement/list')
                        })
                    }
                })
            }
        })
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handleImgChange = ({ fileList }) => this.setState({ fileList })

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
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

    render() {
        const {
            form: { getFieldDecorator },
        } = this.props
        const { logisticsCompanys, previewVisible, previewImage, fileList } = this.state
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
                    offset: 8,
                },
            },
        }

        function createSelectOption() {
            const arr = logisticsCompanys.map(item => {
                return (
                    <Option value={item.id} key={item.id}>
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
                    <Row>
                        <Col span={8}>
                            <Form.Item label="发货日期">
                                {getFieldDecorator('ship_date', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择发货日期!',
                                        },
                                    ],
                                })(<DatePicker onChange={this.onDateChange} />)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="物流公司">
                                {getFieldDecorator('logistics_id', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择物流公司!',
                                        },
                                    ],
                                })(
                                    <Select onChange={this.handleLogisticsSelectChange}>
                                        {createSelectOption()}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="物流成本">
                                {getFieldDecorator('cost_total', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '物流成本不能为空!',
                                        },
                                    ],
                                })(<Input placeholder="请输入物流成本" />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item label="车辆类型">
                                {getFieldDecorator('vehicle_type', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '车辆类型不能为空!',
                                        },
                                    ],
                                })(<Input placeholder="请输入车辆类型" />)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="车牌号码">
                                {getFieldDecorator('vehicle_no', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '车牌号码不能为空!',
                                        },
                                    ],
                                })(<Input placeholder="请输入车牌号码" />)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="驾驶员姓名">
                                {getFieldDecorator('driver_name', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '驾驶员姓名不能为空!',
                                        },
                                    ],
                                })(<Input placeholder="请输入驾驶员姓名" />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item label="联系方式">
                                {getFieldDecorator('driver_mobile', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '联系方式不能为空!',
                                        },
                                    ],
                                })(<Input placeholder="请输入联系方式" />)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="预计送达时间">
                                {getFieldDecorator('arrive_date', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '预计送达时间不能为空!',
                                        },
                                    ],
                                })(<DatePicker onChange={this.onArriveDateChange} />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3}>物流单图片：</Col>
                        <Col span={21}>
                            <div className="clearfix">
                                <Upload
                                    action={file => {
                                        this.handleImgSubmit(file)
                                    }}
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                >
                                    {uploadButton}
                                </Upload>
                                <Modal
                                    visible={previewVisible}
                                    footer={null}
                                    onCancel={this.handleCancel}
                                >
                                    <img
                                        alt="example"
                                        style={{ width: '100%' }}
                                        src={previewImage}
                                    />
                                </Modal>
                            </div>
                        </Col>
                    </Row>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            生成物流单
                        </Button>
                    </Form.Item>
                </Form>
            </PageHeaderWrapper>
        )
    }
}

export default Form.create({ name: 'logistics-dispatchmanagement' })(LogisticsDispatchmanagement)
