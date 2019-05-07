import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Form, Select, Input, Row, Col, Button, Modal, Table } from 'antd'
import { saveConfig, getRuleDetail, updateConfig } from './services'
import { getPageQuery } from '@/utils/utils'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'

import styles from './RuleAdd.less'

const FormItem = Form.Item
const { TextArea } = Input
const { Option } = Select

@connect(({ addRule }) => ({
    addRule,
}))
class AddRule extends Component {
    state = {
        riskParamDtoList: [{}],

        listLength: 0,

        ruleDetail: {},
        btnDisabled: false,
    }

    componentDidMount() {
        const { dispatch } = this.props

        const { id } = getPageQuery()

        if (id) {
            getRuleDetail({ id }).then(res => {
                if (res && res.success) {
                    const { data } = res
                    this.setState({
                        ruleDetail: data,
                        riskParamDtoList: data.riskParamDtoList,
                    })
                    this.changeOneType(data.ruleFistId)
                    this.changeOneNode(data.businessFirstId)
                }
            })
        }

        if (id) {
            dispatch({
                type: 'addRule/fetchRuleDetail',
                payload: {
                    id,
                },
            })
        }

        dispatch({
            type: 'addRule/fetchTypeOneList',
            payload: {
                id: 0,
            },
        })
        dispatch({
            type: 'addRule/fetchNodeOneList',
            payload: {
                id: 0,
            },
        })
        dispatch({
            type: 'addRule/fetchStrategyList',
        })
        dispatch({
            type: 'addRule/fetchRuleGroupList',
        })
        dispatch({
            type: 'addRule/fetchRiskOneList',
            payload: {
                id: 0,
            },
        })
    }

    editForm = (e, type) => {
        const { riskParamDtoList, listLength } = this.state
        const newParam = riskParamDtoList.concat({})
        if (type === 'add') {
            this.setState({
                riskParamDtoList: newParam,
                listLength: listLength + 1,
            })
        } else {
            this.setState({
                riskParamDtoList: riskParamDtoList.splice(-1, 1),
                listLength: listLength - 1,
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        const {
            form: { validateFields },
        } = this.props
        const { listLength } = this.state

        const { id } = getPageQuery()

        validateFields((err, value) => {
            if (!err) {
                this.setState({
                    btnDisabled: true,
                })
                let riskParamDtoList
                Object.keys(value).forEach(() => {
                    if (listLength === 0) {
                        riskParamDtoList = [
                            {
                                firstParamId: value.firstParamId0,
                                secondParamId: value.secondParamId0,
                                id: value.id0,
                                sort: 0,
                            },
                        ]
                    } else if (listLength === 1) {
                        riskParamDtoList = [
                            {
                                firstParamId: value.firstParamId0,
                                secondParamId: value.secondParamId0,
                                id: value.id0,
                                sort: 0,
                            },
                            {
                                firstParamId: value.firstParamId1,
                                secondParamId: value.secondParamId1,
                                id: value.id1,
                                sort: 1,
                            },
                        ]
                    }
                })
                const params = {
                    ...value,
                    riskParamDtoList,
                    ruleId: id || null,
                }
                if (id) {
                    updateConfig(params).then(res => {
                        if (res && res.success) {
                            this.setState({
                                btnDisabled: false,
                            })
                            Modal.success({
                                title: '风控参数配置成功!',
                                onOk: () => {
                                    const { dispatch } = this.props
                                    dispatch(routerRedux.push('/risk-manage/rule'))
                                },
                            })
                        }
                    })
                } else {
                    saveConfig(params).then(res => {
                        if (res && res.success) {
                            this.setState({
                                btnDisabled: false,
                            })
                            Modal.success({
                                title: '风控参数配置成功!',
                                onOk: () => {
                                    const { dispatch } = this.props
                                    dispatch(routerRedux.push('/risk-manage/rule'))
                                },
                            })
                        }
                    })
                }
            }
        })
    }

    // handleReset = () => {
    //     const {
    //         form: { resetFields },
    //     } = this.props
    //     resetFields()
    // }

    changeOneType = val => {
        const {
            dispatch,
            form: { setFields },
        } = this.props
        dispatch({
            type: 'addRule/fetchTypeTwoList',
            payload: {
                id: val,
            },
        })
        setFields({ ruleTypeId: '' })
    }

    changeOneNode = val => {
        const {
            dispatch,
            form: { setFields },
        } = this.props
        dispatch({
            type: 'addRule/fetchNodeTwoList',
            payload: {
                id: val,
            },
        })
        setFields({ ruleBusinessTypeId: '' })
    }

    changeOneRisk = val => {
        const { dispatch } = this.props
        dispatch({
            type: 'addRule/fetchRiskTwoList',
            payload: {
                id: val,
            },
        })
    }

    changeTwoRisk = val => {
        const { dispatch } = this.props
        dispatch({
            type: 'addRule/fetchParamList',
            payload: {
                id: val,
            },
        })
    }

    render() {
        const { riskParamDtoList, ruleDetail, btnDisabled } = this.state
        const { id } = getPageQuery()
        const {
            form: { getFieldDecorator },
            addRule: {
                strategyList,
                ruleGroupList,
                typeOneList,
                typeTwoList,
                nodeOneList,
                nodeTwoList,
                riskOneList,
                riskTwoList,
                paramList,
            },
        } = this.props

        const formItemLayout = {
            colon: false,
            labelCol: { span: 6 },
            wrapperCol: { span: 12 },
        }

        const formItemLayoutOut = {
            colon: false,
            labelCol: { span: 2 },
            wrapperCol: { span: 12 },
        }

        const columns = [
            {
                title: '一级策略',
                dataIndex: 'firstParamName',
            },
            {
                title: '二级策略',
                dataIndex: 'secondParmaName',
            },
            {
                title: '规则参数',
                dataIndex: 'paramName',
            },
        ]

        return (
            <PageHeaderWrapper>
                <Form onSubmit={this.handleSubmit}>
                    <Row gutter={24}>
                        {!id && (
                            <Col span={8}>
                                <FormItem label="规则组" {...formItemLayout}>
                                    {getFieldDecorator('groupId', {
                                        rules: [{ required: true, message: '该项必填！' }],
                                    })(
                                        <Select placeholder="请选择规则组">
                                            {ruleGroupList.map(item => (
                                                <Option key={item.key}>{item.value}</Option>
                                            ))}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        )}
                        <Col span={8}>
                            <FormItem label="规则名称" {...formItemLayout}>
                                {getFieldDecorator('ruleName', {
                                    initialValue:
                                        id && ruleDetail.ruleName ? ruleDetail.ruleName : '',
                                    rules: [{ required: true, message: '该项必填！' }],
                                })(<Input placeholder="请输入规则名称" />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}>
                            <FormItem label="一级分类" {...formItemLayout}>
                                {getFieldDecorator('ruleTypeOneId', {
                                    initialValue:
                                        id && ruleDetail.ruleFistId
                                            ? `${ruleDetail.ruleFistId}`
                                            : null,
                                    rules: [{ required: true, message: '该项必填！' }],
                                })(
                                    <Select
                                        placeholder="请选择一级分类"
                                        onChange={this.changeOneType}
                                    >
                                        {typeOneList.map(item => (
                                            <Option key={item.key}>{item.value}</Option>
                                        ))}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="二级分类" {...formItemLayout}>
                                {getFieldDecorator('ruleTypeId', {
                                    initialValue:
                                        id && ruleDetail.ruleSecondId
                                            ? `${ruleDetail.ruleSecondId}`
                                            : null,
                                    rules: [{ required: true, message: '该项必填！' }],
                                })(
                                    <Select placeholder="请选择二级分类">
                                        {typeTwoList.map(item => (
                                            <Option key={item.key}>{item.value}</Option>
                                        ))}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}>
                            <FormItem label="一级业务节点" {...formItemLayout}>
                                {getFieldDecorator('ruleBusinessTypeOneId', {
                                    initialValue:
                                        id && ruleDetail.businessFirstId
                                            ? `${ruleDetail.businessFirstId}`
                                            : null,
                                    rules: [{ required: true, message: '该项必填！' }],
                                })(
                                    <Select
                                        placeholder="请选择一级业务节点"
                                        onChange={this.changeOneNode}
                                    >
                                        {nodeOneList.map(item => (
                                            <Option key={item.key}>{item.value}</Option>
                                        ))}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="二级业务节点" {...formItemLayout}>
                                {getFieldDecorator('ruleBusinessTypeId', {
                                    initialValue:
                                        id && ruleDetail.businessSecondId
                                            ? `${ruleDetail.businessSecondId}`
                                            : null,
                                    rules: [{ required: true, message: '该项必填！' }],
                                })(
                                    <Select placeholder="请选择二级业务节点">
                                        {nodeTwoList.map(item => (
                                            <Option key={item.key}>{item.value}</Option>
                                        ))}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}>
                            <FormItem label="严重等级" {...formItemLayout}>
                                {getFieldDecorator('ruleLevel', {
                                    initialValue:
                                        id && ruleDetail.ruleLevel ? ruleDetail.ruleLevel : null,
                                    rules: [{ required: true, message: '该项必填！' }],
                                })(
                                    <Select
                                        placeholder="请选择严重等级"
                                        onChange={this.handleSelectChange}
                                    >
                                        <Option value={2}>轻度</Option>
                                        <Option value={5}>中度</Option>
                                        <Option value={8}>重度</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="处置策略" {...formItemLayout}>
                                {getFieldDecorator('strategicCode', {
                                    initialValue:
                                        id && ruleDetail.strategyCode
                                            ? `${ruleDetail.strategyCode}`
                                            : null,
                                    rules: [{ required: true, message: '该项必填！' }],
                                })(
                                    <Select placeholder="请选择处置策略">
                                        {strategyList.map(item => (
                                            <Option key={item.key}>{item.value}</Option>
                                        ))}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    {id && (
                        <Row>
                            <FormItem label="已选规则参数" {...formItemLayoutOut}>
                                {getFieldDecorator('codeTable')(
                                    <Table
                                        columns={columns}
                                        dataSource={riskParamDtoList}
                                        pagination={false}
                                        rowKey={record => record.sort}
                                    />
                                )}
                            </FormItem>
                        </Row>
                    )}
                    <Row>
                        <Col>
                            <FormItem label="规则参数" {...formItemLayoutOut}>
                                <div className={styles.ruleParam}>
                                    {riskParamDtoList.map((element, index) => (
                                        <span className={styles.ruleParamSpan} key={index}>
                                            <FormItem>
                                                {getFieldDecorator(`firstParamId${index}`, {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: '该项必填！',
                                                        },
                                                    ],
                                                })(
                                                    <Select
                                                        style={{ width: '200px' }}
                                                        placeholder="请选择所属一级策略"
                                                        onChange={this.changeOneRisk}
                                                    >
                                                        {riskOneList.map(item => (
                                                            <Option key={item.key}>
                                                                {item.value}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                )}
                                            </FormItem>
                                            <FormItem>
                                                {getFieldDecorator(`secondParamId${index}`, {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: '该项必填!',
                                                        },
                                                    ],
                                                })(
                                                    <Select
                                                        style={{ width: '200px' }}
                                                        placeholder="请选择所属二级策略"
                                                        onChange={this.changeTwoRisk}
                                                    >
                                                        {riskTwoList.map(item => (
                                                            <Option key={item.key}>
                                                                {item.value}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                )}
                                            </FormItem>
                                            <FormItem>
                                                {getFieldDecorator(`id${index}`, {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: '该项必填!',
                                                        },
                                                    ],
                                                })(
                                                    <Select
                                                        style={{ width: '300px' }}
                                                        placeholder="请选择参数名"
                                                        showSearch
                                                        filterOption={(input, option) =>
                                                            option.props.children
                                                                .toLowerCase()
                                                                .indexOf(input.toLowerCase()) >= 0
                                                        }
                                                    >
                                                        {paramList.map(item => (
                                                            <Option key={item.key}>
                                                                {item.value}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                )}
                                            </FormItem>
                                            {index < 1 && (
                                                <Button
                                                    shape="circle"
                                                    size="small"
                                                    icon="plus"
                                                    type="primary"
                                                    onClick={() => this.editForm(index, 'add')}
                                                />
                                            )}
                                            {index > 0 && (
                                                <Button
                                                    shape="circle"
                                                    size="small"
                                                    icon="minus"
                                                    type="default"
                                                    onClick={() => this.editForm(index, 'minus')}
                                                />
                                            )}
                                        </span>
                                    ))}
                                </div>
                            </FormItem>
                        </Col>
                    </Row>

                    {riskParamDtoList.length > 1 && (
                        <Row gutter={24}>
                            <Col span={8}>
                                <FormItem label="运算符" {...formItemLayout}>
                                    {getFieldDecorator('commonSignOperation', {
                                        initialValue:
                                            id && ruleDetail.commonSignOperation
                                                ? `${ruleDetail.commonSignOperation}`
                                                : null,
                                        rules: [{ required: true, message: '该项必填！' }],
                                    })(
                                        <Select
                                            placeholder="请选择运算符"
                                            onChange={this.handleSelectChange}
                                        >
                                            <Option value="+">加</Option>
                                            <Option value="-">减</Option>
                                            <Option value="*">乘</Option>
                                            <Option value="/">除</Option>
                                            <Option value=">">大于</Option>
                                            <Option value="<">小于</Option>
                                            <Option value="=">等于</Option>
                                            <Option value="!=">不等于</Option>
                                            <Option value=">=">大于等于</Option>
                                            <Option value="<=">小于等于</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    )}
                    <Row gutter={24}>
                        <Col span={8}>
                            <FormItem label="比较符" {...formItemLayout}>
                                {getFieldDecorator('compareSignOperation', {
                                    initialValue:
                                        id && ruleDetail.compareSignOperation
                                            ? `${ruleDetail.compareSignOperation}`
                                            : null,
                                    rules: [{ required: true, message: '该项必填！' }],
                                })(
                                    <Select
                                        placeholder="请选择比较符"
                                        onChange={this.handleSelectChange}
                                    >
                                        <Option value=">">大于</Option>
                                        <Option value="<">小于</Option>
                                        <Option value="=">等于</Option>
                                        <Option value="!=">不等于</Option>
                                        <Option value=">=">大于等于</Option>
                                        <Option value="<=">小于等于</Option>
                                        <Option value="INCLUDE">包含</Option>
                                        <Option value="EXCLUDE">不包含</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="比较值" {...formItemLayout}>
                                {getFieldDecorator('compareValue', {
                                    initialValue:
                                        id && ruleDetail.compareValue
                                            ? ruleDetail.compareValue
                                            : '',
                                    rules: [{ required: true, message: '该项必填！' }],
                                })(<Input placeholder="请输入比较值" />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}>
                            <FormItem label="规则说明" {...formItemLayout}>
                                {getFieldDecorator('ruleDetails', {
                                    initialValue:
                                        id && ruleDetail.ruleDetails ? ruleDetail.ruleDetails : '',
                                    rules: [{ required: true, message: '该项必填！' }],
                                })(<TextArea rows={4} />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}>
                            <FormItem label="风控解除规则" {...formItemLayout}>
                                {getFieldDecorator('removeRule', {
                                    initialValue:
                                        id && ruleDetail.removeRule ? ruleDetail.removeRule : null,
                                    rules: [{ required: true, message: '该项必填！' }],
                                })(
                                    <Select
                                        placeholder="请选择风控解除规则"
                                        onChange={this.handleSelectChange}
                                    >
                                        <Option value={1}>人工解除</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="触发类型" {...formItemLayout}>
                                {getFieldDecorator('triggerType', {
                                    initialValue:
                                        id && ruleDetail.triggerType
                                            ? ruleDetail.triggerType
                                            : null,
                                    rules: [{ required: true, message: '该项必填！' }],
                                })(
                                    <Select
                                        placeholder="请选择触发类型"
                                        onChange={this.handleSelectChange}
                                    >
                                        <Option value={1}>主动通知</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}>
                            <FormItem label="策略响应周期" {...formItemLayout}>
                                {getFieldDecorator('strategyResponse', {
                                    initialValue:
                                        id && ruleDetail.strategyResponse
                                            ? ruleDetail.strategyResponse
                                            : null,
                                    rules: [{ required: true, message: '该项必填！' }],
                                })(
                                    <Select
                                        placeholder="请选择策略响应周期"
                                        onChange={this.handleSelectChange}
                                    >
                                        <Option value={1}>实时</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={26} style={{ textAlign: 'right' }}>
                            <Form.Item {...formItemLayout}>
                                <Button type="primary" htmlType="submit" disabled={btnDisabled}>
                                    提交
                                </Button>
                                {/* <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                    取消
                                </Button> */}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </PageHeaderWrapper>
        )
    }
}

export default Form.create()(AddRule)
