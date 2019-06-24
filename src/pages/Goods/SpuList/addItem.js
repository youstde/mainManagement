import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Form, Input, Select, Cascader, message, Button } from 'antd'

import { createSign } from '@/utils/utils'
import md5 from 'md5'

import UploadImg from './components/UploadImg'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

// import Button from '@/components/Button'

import { configurationGet, goodsBaseGet, generalGet, goodsPost } from '@/services/common'

const { Option } = Select

@connect(() => ({}))
class SpuListEdit extends PureComponent {
    state = {
        areaLevel: 1, // 暂时是只到3
        classCid: '29C5FB2722EE750E35',
        varietyCid: '161EE93CEC677F6E3C',
        storageCid: 'D8F218B612A79C753A',
        processCid: 'B28CD084BC37E1D13B',
        classData: [],
        varietyData: [],
        storageData: [],
        processData: [],
        dataSource: {},
        CascaderOptions: [],
        areaIdArr: [],
        activeId: '',
        editorState: BraftEditor.createEditorState(null),
    }

    componentDidMount() {
        // 获取品类
        this.fetchClassData()
        // 获取品种
        this.fetchVarietyData()
        // 获取存储情况
        this.fetchStorageData()
        // 获取加工情况
        this.fetchProcessData()
        // 获取地区
        this.fetchAreaData()
    }

    fetchClassData = () => {
        const { classCid } = this.state
        configurationGet({
            t: 'values',
            cid: classCid,
        }).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    classData: res.data[classCid],
                })
            }
        })
    }

    fetchVarietyData = () => {
        const { varietyCid } = this.state
        configurationGet({
            t: 'values',
            cid: varietyCid,
        }).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    varietyData: res.data[varietyCid],
                })
            }
        })
    }

    fetchStorageData = () => {
        const { storageCid } = this.state
        configurationGet({
            t: 'values',
            cid: storageCid,
        }).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    storageData: res.data[storageCid],
                })
            }
        })
    }

    fetchProcessData = () => {
        const { processCid } = this.state
        configurationGet({
            t: 'values',
            cid: processCid,
        }).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    processData: res.data[processCid],
                })
            }
        })
    }

    fetchAreaData = (code, cb) => {
        const params = {
            t: 'regions',
        }
        if (code) params.code = code
        generalGet(params).then(res => {
            if (res && res.errcode === 0) {
                if (code) {
                    cb(this.clearAreaData(res.data))
                } else {
                    this.setState({
                        CascaderOptions: this.clearAreaData(res.data),
                    })
                }
            }
        })
    }

    // 清洗area的数据（格式化）
    clearAreaData = data => {
        const { areaLevel } = this.state
        console.log('areaLevel:', areaLevel)
        const arr = data.map(item => {
            return {
                code: item.code,
                value: item.id,
                label: item.name,
                isLeaf: areaLevel === 3,
            }
        })
        return arr
    }

    onAreaChange = (value, selectedOptions) => {
        console.log(value, selectedOptions)
        this.setState({
            areaLevel: value.length + 1,
            areaIdArr: value,
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

    render() {
        const {
            form: { getFieldDecorator },
        } = this.props
        const {
            classData,
            dataSource,
            varietyData,
            storageData,
            processData,
            CascaderOptions,
            editorState,
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

        return (
            <Fragment>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="spu品名">
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="品类">
                        {getFieldDecorator('category_id', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(
                            <Select onChange={this.handleSelectChange}>
                                {createOption(classData)}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="品种">
                        {getFieldDecorator('variety_id', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(
                            <Select onChange={this.handleSelectChange}>
                                {createOption(varietyData)}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="产区">
                        {getFieldDecorator('region_arr', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择产地',
                                },
                            ],
                        })(
                            <Cascader
                                options={CascaderOptions}
                                loadData={this.loadData}
                                onChange={this.onAreaChange}
                                changeOnSelect
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="存储情况">
                        {getFieldDecorator('storage_id', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(
                            <Select onChange={this.handleSelectChange}>
                                {createOption(storageData)}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="加工情况">
                        {getFieldDecorator('process_id', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(
                            <Select onChange={this.handleSelectChange}>
                                {createOption(processData)}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="图片">
                        {getFieldDecorator('pictures', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(<UploadImg initPictures={[]} changeBc={this.handleUploadImg} />)}
                    </Form.Item>
                    <div style={{ border: '1px solid #f1f1f1', marginBottom: '30px' }}>
                        <BraftEditor
                            value={editorState}
                            onChange={this.handleEditorChange}
                            onSave={this.submitContent}
                        />
                    </div>
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

export default Form.create({ name: 'spuListEdit' })(SpuListEdit)