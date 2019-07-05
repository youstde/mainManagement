import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Form, Input, Select, message, Button, Row, Col, Checkbox } from 'antd'

import { createSignOptions } from '@/utils/utils'

import UploadImg from '../SpuList/components/UploadImg'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 在展示页面引入css样板文件
import 'braft-editor/dist/output.css'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

// import Button from '@/components/Button'

import {
    configurationGet,
    goodsBaseGet,
    generalGet,
    goodsPost,
    generalPost,
} from '@/services/common'

const { Option } = Select

@connect(() => ({}))
class SkuListAdd extends PureComponent {
    state = {
        packageACid: '103204C3AD09E23037',
        packageAData: [],
        packageBCid: '399D02C81F277D4438',
        packageBData: [],
        brandCid: '6C27926E0F06E0C439',
        brandData: [],
        specificationCid: 'ABBF4E7B52C66C5D36',
        specificationData: [],
        classData: [],
        CascaderOptions: [],
        spuLists: [],
        areaIdArr: [],
        activeId: '',
        editorState: BraftEditor.createEditorState(null),
        picturesSameSpu: 0,
        describeSameSpu: 0,
        spuPictures: [],
        spuDescribe: '',
    }

    componentDidMount() {
        this.fetchSpuList()
        this.fetchPackageAData()
        this.fetchPackageBData()
        this.fetchBrandData()
        this.fetchSpecificationData()
    }

    fetchSpuList = () => {
        generalGet({
            t: 'spus',
        }).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    spuLists: res.data,
                })
            }
        })
    }

    fetchPackageAData = () => {
        const { packageACid } = this.state
        this.fetchConfigurateData(packageACid, res => {
            this.setState({
                packageAData: res.data[packageACid],
            })
        })
    }

    fetchPackageBData = () => {
        const { packageBCid } = this.state
        this.fetchConfigurateData(packageBCid, res => {
            this.setState({
                packageBData: res.data[packageBCid],
            })
        })
    }

    fetchSpecificationData = () => {
        const { specificationCid } = this.state
        this.fetchConfigurateData(specificationCid, res => {
            this.setState({
                specificationData: res.data[specificationCid],
            })
        })
    }

    fetchBrandData = () => {
        const { brandCid } = this.state
        this.fetchConfigurateData(brandCid, res => {
            this.setState({
                brandData: res.data[brandCid],
            })
        })
    }

    fetchConfigurateData = (cid, cb) => {
        configurationGet({
            t: 'values',
            cid,
        }).then(res => {
            if (res && res.errcode === 0) {
                cb(res)
            }
        })
    }

    loadData = selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1]
        targetOption.loading = true

        const { code } = targetOption
        this.fetchAreaData(code, data => {
            targetOption.loading = false
            targetOption.children = data
            const { CascaderOptions } = this.state
            this.setState({
                CascaderOptions: [...CascaderOptions],
            })
        })
    }

    handleUploadImg = lists => {
        console.log('list:', lists)
        const { form } = this.props
        form.setFieldsValue({ pictures: lists })
    }

    handleEditorChange = editorState => {
        this.setState({ editorState })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { form, history } = this.props
        const { editorState, picturesSameSpu, describeSameSpu } = this.state
        const htmlContent = editorState.toHTML()
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const params = {
                    t: 'sku.save',
                    spuid: values.spuid,
                    specification_id: values.specification_id,
                    specification_value: values.specification_value,
                    pictures_same_spu: picturesSameSpu,
                    describe_same_spu: describeSameSpu,
                    premiums: JSON.stringify([
                        { level: 1, value: values.priceLevel1 },
                        { level: 2, value: values.priceLevel2 },
                    ]),
                }
                if (!picturesSameSpu) params.pictures = JSON.stringify(values.pictures)
                if (!describeSameSpu) params.describe = htmlContent
                if (values.packing_aid) params.packing_aid = values.packing_aid
                if (values.packing_bid) params.packing_bid = values.packing_bid
                if (values.levels) params.levels = values.levels
                if (values.brand_id) params.brand_id = values.brand_id

                createSignOptions(params)
                const formData = new FormData()
                Object.keys(params).forEach(key => {
                    formData.append(key, params[key])
                })
                // console.log('Received values of form: ', values, htmlContent)
                goodsPost('', formData).then(res => {
                    if (res && res.errcode === 0) {
                        message.success('操作成功!', 1, () => {
                            history.replace('/goods/skulist')
                        })
                    }
                })
            }
        })
    }

    handleGoBack = () => {
        const { history } = this.props
        history.goBack()
    }

    handleToSamePictureChange = e => {
        const { form } = this.props
        const { checked } = e.target
        const spuid = form.getFieldValue('spuid')
        if (!spuid) {
            message.warn('请选择SPU', 2)
            return
        }
        if (checked) {
            goodsBaseGet({
                t: 'spu.info',
                spuid,
            }).then(res => {
                if (res && res.errcode === 0) {
                    const { pictures } = res.data
                    this.setState({
                        picturesSameSpu: 1,
                        spuPictures: pictures,
                    })
                }
            })
        } else {
            this.setState({
                picturesSameSpu: 0,
            })
        }
    }

    handleToSameDescribeChange = e => {
        const { checked } = e.target
        const { form } = this.props
        const spuid = form.getFieldValue('spuid')
        if (!spuid) {
            message.warn('请选择SPU', 2)
            return
        }
        if (checked) {
            goodsBaseGet({
                t: 'spu.info',
                spuid,
            }).then(res => {
                if (res && res.errcode === 0) {
                    const { describe } = res.data
                    this.setState({
                        describeSameSpu: 1,
                        spuDescribe: describe,
                    })
                }
            })
        } else {
            this.setState({
                describeSameSpu: 0,
            })
        }
    }

    myUploadFn = param => {
        const formData = new FormData()
        formData.append('files[]', param.file)
        generalPost(
            {
                t: 'upload',
            },
            formData
        ).then(res => {
            if (res && res.errcode === 0) {
                param.success({
                    url: `${res.data.path}?x-oss-process=style/m`,
                    meta: {
                        id: res.request_id,
                    },
                })
                param.progress(100)
            }
        })
    }

    render() {
        const {
            form: { getFieldDecorator },
        } = this.props
        const {
            editorState,
            spuLists,
            packageAData,
            packageBData,
            brandData,
            specificationData,
            picturesSameSpu,
            describeSameSpu,
            spuPictures,
            spuDescribe,
        } = this.state

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        }

        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 10 },
                sm: { span: 20, offset: 10 },
            },
        }

        function createOption(data) {
            const arr = []
            arr.push(
                <Option value={undefined} key={Date.now()}>
                    重置
                </Option>
            )
            data.forEach(item => {
                arr.push(
                    <Option value={item.id} key={item.id}>
                        {item.name}
                    </Option>
                )
            })
            return arr
        }

        function createSpuOption(data) {
            const arr = data.map(item => {
                return (
                    <Option value={item.value} key={item.value}>
                        {item.text}
                    </Option>
                )
            })
            return arr
        }

        function createSpuImage() {
            const arr = spuPictures.map((item, i) => {
                return (
                    <img style={{ width: '150px', margin: '20px' }} src={item.url} alt="" key={i} />
                )
            })
            return arr
        }

        return (
            <Fragment>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <div style={{ fontSize: '20px', color: '#1ABC9C', marginBottom: '30px' }}>
                        关联SPU
                    </div>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="spu">
                                {getFieldDecorator('spuid', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请关联spu!',
                                        },
                                    ],
                                })(
                                    <Select onChange={this.handleSelectChange}>
                                        {createSpuOption(spuLists)}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <div style={{ marginBottom: '30px' }}>
                        <span style={{ fontSize: '20px', color: '#1ABC9C' }}>商品属性</span>
                        <span style={{ fontSize: '14px', paddingLeft: '20px' }}>
                            如未找到相关商品规格/包装，请先在规格管理/包装管理添加信息
                        </span>
                    </div>
                    <Row>
                        <Col span={8}>
                            <Form.Item label="外包装">
                                {getFieldDecorator('packing_aid')(
                                    <Select onChange={this.handleSelectChange}>
                                        {createOption(packageAData)}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="内包装">
                                {getFieldDecorator('packing_bid')(
                                    <Select onChange={this.handleSelectChange}>
                                        {createOption(packageBData)}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="等级">
                                {getFieldDecorator('levels')(<Input />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item label="品牌">
                                {getFieldDecorator('brand_id')(
                                    <Select onChange={this.handleSelectChange}>
                                        {createOption(brandData)}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="规格值">
                                {getFieldDecorator('specification_value', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '该项不能为空!',
                                        },
                                    ],
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="规格">
                                {getFieldDecorator('specification_id', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '该项不能为空!',
                                        },
                                    ],
                                })(
                                    <Select onChange={this.handleSelectChange}>
                                        {createOption(specificationData)}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="一级门店加价幅度">
                                {getFieldDecorator('priceLevel1', {
                                    initialValue: 0,
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="二级门店加价幅度">
                                {getFieldDecorator('priceLevel2', {
                                    initialValue: 0,
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <div style={{ fontSize: '20px', color: '#1ABC9C', marginBottom: '30px' }}>
                        商品图片
                    </div>
                    <Checkbox
                        style={{ marginBottom: '30px' }}
                        onChange={this.handleToSamePictureChange}
                        checked={picturesSameSpu === 1}
                    >
                        商品图片同spu
                    </Checkbox>
                    {picturesSameSpu === 1 ? (
                        <div>{createSpuImage()}</div>
                    ) : (
                        <Form.Item label="图片">
                            {getFieldDecorator('pictures', {
                                rules: [
                                    {
                                        required: true,
                                        message: '该项不能为空!',
                                    },
                                ],
                            })(<UploadImg initPictures={[]} changeBc={this.handleUploadImg} />)}
                        </Form.Item>
                    )}
                    <div style={{ fontSize: '20px', color: '#1ABC9C', marginBottom: '30px' }}>
                        图文详情
                    </div>
                    <Checkbox
                        style={{ marginBottom: '30px' }}
                        onChange={this.handleToSameDescribeChange}
                        checked={describeSameSpu === 1}
                    >
                        图文详情同spu
                    </Checkbox>
                    {describeSameSpu === 1 ? (
                        <div
                            style={{
                                border: '1px solid #f1f1f1',
                                padding: '20px',
                                margin: '40px 0',
                            }}
                        >
                            <div
                                className="braft-output-content"
                                dangerouslySetInnerHTML={{ __html: spuDescribe }}
                            />
                        </div>
                    ) : (
                        <div style={{ border: '1px solid #f1f1f1', marginBottom: '30px' }}>
                            <BraftEditor
                                value={editorState}
                                onChange={this.handleEditorChange}
                                onSave={this.submitContent}
                                media={{ uploadFn: this.myUploadFn }}
                            />
                        </div>
                    )}
                    <Form.Item {...formItemLayoutWithOutLabel}>
                        <Button type="primary" htmlType="submit">
                            生成商品SKU
                        </Button>
                        &nbsp;
                        <Button onClick={this.handleGoBack} type="primary">
                            返回
                        </Button>
                    </Form.Item>
                </Form>
            </Fragment>
        )
    }
}

export default Form.create({ name: 'skuListAdd' })(SkuListAdd)
