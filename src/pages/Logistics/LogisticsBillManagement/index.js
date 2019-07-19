import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal, Input, Form, message } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
// import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import Button from '@/components/Button'

import { logisticsPost, logisticsGet } from '@/services/common'
import { createSignOptions } from '@/utils/utils'

@connect(() => ({}))
class LogisticsBillManagement extends Component {
    state = {
        editAdressItem: {},
        showEditAdress: false,
        // searchCondition: {}, // 搜索条件
        dataSrouce: [], // 表格数据
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        }, // 表格分页
    }

    componentDidMount() {
        console.log(111)
        this.fetchData()
    }

    // 请求表格的数据
    fetchData = () => {
        const { pagination } = this.state
        const params = {
            t: 'orders',
            index: pagination.current,
            size: pagination.pageSize,
        }
        createSignOptions(params)
        const formData = new FormData()
        Object.keys(params).forEach(key => {
            formData.append(key, params[key])
        })
        logisticsPost('', formData).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    dataSrouce: res.data,
                    pagination: {
                        ...pagination,
                        total: res.pages.count,
                    },
                })
            }
        })
    }

    // 查询表单搜索
    // handleFormSearch = values => {
    //     const { pagination } = this.state

    //     this.setState(
    //         {
    //             searchCondition: values,
    //             pagination: {
    //                 ...pagination,
    //                 current: 1,
    //             },
    //         },
    //         () => {
    //             this.fetchData()
    //         }
    //     )
    // }

    // 查询表单下载
    // handleFromDownload = values => {}

    // 切换分页
    handleChangePage = page => {
        const { pagination } = this.state

        this.setState(
            {
                pagination: {
                    ...pagination,
                    current: page,
                },
            },
            () => {
                this.fetchData({
                    pageNum: page,
                })
            }
        )
    }

    handleShowDetail = serialNo => {
        const { history } = this.props
        history.push(`/logistics/logisticsbillmanagement/detail?serialNo=${serialNo}`)
    }

    handleEditAdress = item => {
        this.setState({
            showEditAdress: true,
            editAdressItem: item,
        })
    }

    handleHideEdit = () => {
        this.setState({
            showEditAdress: false,
            editAdressItem: {},
        })
    }

    handleEditAdressSubmit = e => {
        e.preventDefault()
        const { editAdressItem } = this.state
        console.log('activeItem:', editAdressItem)
        const { form } = this.props
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                logisticsGet({
                    t: 'update.supplier.address',
                    id: editAdressItem.id,
                    adr: values.adr,
                }).then(res => {
                    if (res && res.errcode === 0) {
                        message.success('操作成功!')
                        this.handleHideEdit()
                        this.fetchData()
                    }
                })
            }
        })
    }

    render() {
        const { dataSrouce, pagination, showEditAdress, editAdressItem } = this.state
        const {
            form: { getFieldDecorator },
        } = this.props

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
                    offset: 10,
                },
            },
        }

        return (
            <PageHeaderWrapper>
                {/* <SearchForm
                    data={[
                        {
                            label: '发货日期',
                            type: 'datepicker',
                            key: 'inputKey',
                        },
                        {
                            label: '发货地',
                            type: 'input',
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                            key: 'selectKey',
                        },
                        {
                            label: '收货地',
                            type: 'input',
                            key: 'dateKey',
                        },
                        {
                            label: '车牌号码',
                            type: 'input',
                            key: 'rangedateKey',
                        },
                    ]}
                    buttonGroup={[
                        { onSearch: this.handleFormSearch },
                        { onDownload: this.handleFromDownload },
                    ]}
                /> */}
                <BasicTable
                    columns={[
                        {
                            title: '物流单号',
                            dataIndex: 'serial_no',
                        },
                        {
                            title: '发货日期',
                            dataIndex: 'ship_date',
                        },
                        {
                            title: '物流公司',
                            dataIndex: 'logistics_name',
                        },
                        {
                            dataIndex: 'cost_total',
                            title: '物流成本',
                        },
                        {
                            dataIndex: 'vehicle_type',
                            title: '车辆类型',
                        },
                        {
                            dataIndex: 'vehicle_no',
                            title: '车牌号码',
                        },
                        {
                            dataIndex: 'driver_name',
                            title: '驾驶员姓名',
                        },
                        {
                            dataIndex: 'driver_mobile',
                            title: '驾驶员联系方式',
                        },
                        {
                            dataIndex: 'supplier_address',
                            title: '发货地',
                            render: (_, labelActiveItem) => {
                                return (
                                    <div>
                                        <span>{labelActiveItem.supplier_address}</span>
                                        <Button
                                            onClick={() => this.handleEditAdress(labelActiveItem)}
                                            size="small"
                                            type="default"
                                        >
                                            编辑
                                        </Button>
                                    </div>
                                )
                            },
                        },
                        {
                            dataIndex: 'mch_address',
                            title: '收货地',
                        },
                        {
                            dataIndex: 'arrive_date',
                            title: '预计到达时间',
                        },
                        {
                            fixed: 'right',
                            type: 'oprate',
                            render: (_, { serial_no: serialNo }) => {
                                return (
                                    <div>
                                        <Button
                                            onClick={() => this.handleShowDetail(serialNo)}
                                            size="small"
                                            type="default"
                                        >
                                            查看详情
                                        </Button>
                                    </div>
                                )
                            },
                        },
                    ]}
                    scroll={{ x: 2100 }}
                    dataSource={dataSrouce}
                    pagination={{
                        ...pagination,
                        onChange: this.handleChangePage,
                    }}
                />
                <Modal
                    title="编辑发货地址"
                    footer={null}
                    width={680}
                    destroyOnClose
                    visible={showEditAdress}
                    onCancel={this.handleHideEdit}
                >
                    <Form {...formItemLayout} onSubmit={this.handleEditAdressSubmit}>
                        <Form.Item label="收货地址">
                            {getFieldDecorator('adr', {
                                initialValue: editAdressItem.supplier_address,
                                rules: [{ required: true, message: '收货地址不能为空!' }],
                            })(<Input placeholder="请输入收货地址" />)}
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default Form.create({ name: 'Logistics_bill_management' })(LogisticsBillManagement)
