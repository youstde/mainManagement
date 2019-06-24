import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Form, Input, Select, message, Button, Row, Col, Checkbox } from 'antd'

import { createSign } from '@/utils/utils'
import md5 from 'md5'

import UploadImg from '../SpuList/components/UploadImg'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 在展示页面引入css样板文件
import 'braft-editor/dist/output.css'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

// import Button from '@/components/Button'

import { configurationGet, goodsBaseGet, generalGet, goodsPost } from '@/services/common'

const { Option } = Select

@connect(() => ({}))
class SkuListEdit extends PureComponent {
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
        dataSource: {},
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
        console.log(this.props)
        const {
            location: { query },
        } = this.props
        const activeId = query.id
        this.setState(
            {
                activeId,
            },
            () => {
                // 获取详情数据
                this.fetchData()
                // 获取spu列表
                this.fetchSpuList()
                this.fetchPackageAData()
                this.fetchPackageBData()
                this.fetchBrandData()
                this.fetchSpecificationData()
            }
        )
    }

    fetchData = () => {
        const { activeId } = this.state
        goodsBaseGet({
            t: 'sku.info',
            skuid: activeId,
        }).then(res => {
            if (res && res.errcode === 0) {
                const { pictures_same_spu: picturesSameSpu } = res.data
                this.setState({
                    dataSource: res.data,
                    picturesSameSpu,
                    editorState: BraftEditor.createEditorState(res.data.describe),
                })
            }
        })
    }

    fetchSpuList = () => {
        goodsBaseGet({
            t: 'spu.list',
            index: 1,
            size: 100,
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
        const { form } = this.props
        const { editorState, activeId } = this.state
        const htmlContent = editorState.toHTML()
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const params = {
                    t: 'spu.save',
                    spuid: activeId,
                    describe: htmlContent,
                }
                Object.keys(values).forEach(key => {
                    if (key === 'region_arr') {
                        // eslint-disable-next-line prefer-destructuring
                        params.region_id = values[key][2]
                        return
                    }
                    if (key === 'pictures') {
                        params.pictures = JSON.stringify(values[key])
                        return
                    }
                    params[key] = values[key]
                })
                const newOptions = this.createSignOptions(params)
                const formData = new FormData()
                Object.keys(newOptions).forEach(key => {
                    formData.append(key, newOptions[key])
                })
                console.log('Received values of form: ', values, htmlContent)
                goodsPost('', formData).then(res => {
                    if (res && res.errcode === 0) {
                        message.success('操作成功!', 2)
                        this.fetchData()
                    }
                })
            }
        })
    }

    createSignOptions = params => {
        const uuId = localStorage.getItem('uuId')
        if (uuId) {
            params.sk = uuId
        }
        const userInfoStr = localStorage.getItem('user_info')
        let localUk = ''
        if (userInfoStr) {
            const userInfo = JSON.parse(userInfoStr)
            localUk = userInfo.uk
        }
        params.uk = localUk
        params.ver = '1.0.0'
        params.ts = Date.parse(new Date().toUTCString()) / 1000

        params.sign = md5(createSign(params))
        return params
    }

    handleGoBack = () => {
        const { history } = this.props
        history.goBack()
    }

    handleToSamePictureChange = e => {
        const { checked } = e.target
        const {
            dataSource: { spuid },
        } = this.state
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
        const {
            dataSource: { spuid },
        } = this.state
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

    render() {
        const {
            form: { getFieldDecorator },
        } = this.props
        const {
            dataSource,
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
            const arr = data.map(item => {
                return (
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
                    <Option value={item.spuid} key={item.spuid}>
                        {item.name}
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
                    <Form.Item label="spu">
                        {getFieldDecorator('spuid', {
                            initialValue: dataSource.spuid,
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
                    <div style={{ marginBottom: '30px' }}>
                        <span style={{ fontSize: '20px', color: '#1ABC9C' }}>商品属性</span>
                        <span style={{ fontSize: '14px', paddingLeft: '20px' }}>
                            如未找到相关商品规格/包装，请先在规格管理/包装管理添加信息
                        </span>
                    </div>
                    <Row>
                        <Col span={8}>
                            <Form.Item label="外包装">
                                {getFieldDecorator('packing_aid', {
                                    initialValue: dataSource.packing_aid,
                                })(
                                    <Select onChange={this.handleSelectChange}>
                                        {createOption(packageAData)}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="内包装">
                                {getFieldDecorator('packing_bid', {
                                    initialValue: dataSource.packing_bid,
                                })(
                                    <Select onChange={this.handleSelectChange}>
                                        {createOption(packageBData)}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="等级">
                                {getFieldDecorator('levels', {
                                    initialValue: dataSource.levels,
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item label="品牌">
                                {getFieldDecorator('brand_id', {
                                    initialValue: dataSource.brand_id,
                                })(
                                    <Select onChange={this.handleSelectChange}>
                                        {createOption(brandData)}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="规格值">
                                {getFieldDecorator('specification_value', {
                                    initialValue: dataSource.specification_value,
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="规格">
                                {getFieldDecorator('specification_id', {
                                    initialValue: dataSource.specification_id,
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
                                {getFieldDecorator('category_id', {
                                    initialValue: dataSource.category_id,
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="二级门店加价幅度">
                                {getFieldDecorator('category_id', {
                                    initialValue: dataSource.category_id,
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
                        defaultChecked={picturesSameSpu === 1}
                    >
                        商品图片同spu
                    </Checkbox>
                    {picturesSameSpu === 1 ? (
                        <div>{createSpuImage()}</div>
                    ) : (
                        <Form.Item label="图片">
                            {getFieldDecorator('pictures', {
                                initialValue: dataSource.pictures,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ],
                            })(
                                <UploadImg
                                    initPictures={dataSource.pictures}
                                    changeBc={this.handleUploadImg}
                                />
                            )}
                        </Form.Item>
                    )}
                    <div style={{ fontSize: '20px', color: '#1ABC9C', marginBottom: '30px' }}>
                        图文详情
                    </div>
                    <Checkbox
                        style={{ marginBottom: '30px' }}
                        onChange={this.handleToSameDescribeChange}
                        defaultChecked={describeSameSpu === 1}
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
                            />
                        </div>
                    )}
                    <Form.Item {...formItemLayoutWithOutLabel}>
                        <Button type="primary" htmlType="submit">
                            生成商品SPU
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

export default Form.create({ name: 'skuListEdit' })(SkuListEdit)
