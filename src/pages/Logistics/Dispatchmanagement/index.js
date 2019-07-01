/* eslint-disable camelcase */
/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react'
import { connect } from 'dva'
import { message } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import Button from '@/components/Button'

import { deliversPost, goodsBaseGet, storeBaseGet, generalGet } from '@/services/common'
import { createSignOptions, clearDate } from '@/utils/utils'

function inject_unount(target) {
    // 改装componentWillUnmount，销毁的时候记录一下
    const next = target.prototype.componentWillUnmount
    target.prototype.componentWillUnmount = function() {
        // eslint-disable-next-line prefer-rest-params
        if (next) next.call(this, ...arguments)
        this.unmount = true
    }
    // 对setState的改装，setState查看目前是否已经销毁
    const { setState } = target.prototype
    target.prototype.setState = function() {
        console.log(this.unmount)
        if (this.unmount) return
        // eslint-disable-next-line prefer-rest-params
        setState.call(this, ...arguments)
    }
}

@inject_unount
class LogisticsDispatchmanagement extends Component {
    state = {
        selectedRowKeys: [],
        searchCondition: {}, // 搜索条件
        dataSrouce: [], // 表格数据
        skuData: [],
        storeData: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        }, // 表格分页
    }

    componentDidMount() {
        this.fetchData()
        this.fetchSkuData()
        this.fetchStoreData()
    }

    componentWillUnmount() {}

    // 请求表格的数据
    fetchData = () => {
        const { pagination, searchCondition } = this.state
        const params = {
            t: 'orders',
            index: pagination.current,
            size: pagination.pageSize,
        }
        if (searchCondition.skuid) params.skuid = searchCondition.skuid
        if (searchCondition.date) params.date = clearDate(searchCondition.date)
        if (searchCondition.mch_id) params.mch_id = searchCondition.mch_id
        createSignOptions(params)
        const formData = new FormData()
        Object.keys(params).forEach(key => {
            formData.append(key, params[key])
        })
        deliversPost('', formData).then(res => {
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

    fetchSkuData = () => {
        generalGet({
            t: 'skus',
        }).then(res => {
            this.setState({
                skuData: res.data,
            })
        })
    }

    fetchStoreData = () => {
        generalGet({
            t: 'merchants',
        }).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    storeData: res.data,
                })
            }
        })
    }

    // 查询表单搜索
    handleFormSearch = values => {
        const { pagination } = this.state

        this.setState(
            {
                searchCondition: values,
                pagination: {
                    ...pagination,
                    current: 1,
                },
            },
            () => {
                this.fetchData()
            }
        )
    }

    // 查询表单下载
    handleFromDownload = values => {}

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

    onSelectChange = selectedRowKeys => {
        const { dataSrouce } = this.state
        let tag = true
        const index = selectedRowKeys.length - 1
        dataSrouce.forEach(item => {
            if (item.id === selectedRowKeys[index]) {
                if (item.status !== 0) tag = false
            }
        })
        if (tag) {
            this.setState({ selectedRowKeys })
        }
        console.log(selectedRowKeys)
    }

    handleShowDetail = serialNo => {
        const { history } = this.props
        history.push(`/logistics/dispatchmanagement/detail?serialNo=${serialNo}`)
    }

    handleShowcreate = () => {
        const { selectedRowKeys } = this.state
        const { history } = this.props
        if (selectedRowKeys.length) {
            let str = ''
            selectedRowKeys.forEach(item => {
                str += `${item}_`
            })
            str = str.replace(/_$/, '')
            history.push(`/logistics/dispatchmanagement/create?ids=${str}`)
        } else {
            message.warning('请勾选需要生成物流单的发货订单!')
        }
    }

    render() {
        const { dataSrouce, pagination, selectedRowKeys, skuData, storeData } = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        }

        function createSkuOptions() {
            const data = skuData || []
            const arr = data.map(item => {
                return {
                    key: item.value,
                    value: item.text,
                }
            })
            return arr
        }

        function createStoreOptions() {
            const arr = storeData.map(item => {
                return {
                    key: item.value,
                    value: item.text,
                }
            })
            return arr
        }

        return (
            <PageHeaderWrapper>
                <SearchForm
                    data={[
                        {
                            label: ' sku品名',
                            type: 'select',
                            key: 'skuid',
                            options: createSkuOptions(),
                        },
                        {
                            label: '日期',
                            type: 'datepicker',
                            key: 'date',
                        },
                        {
                            label: '门店',
                            type: 'select',
                            key: 'mch_id',
                            options: createStoreOptions(),
                        },
                    ]}
                    buttonGroup={[
                        { onSearch: this.handleFormSearch },
                        { onDownload: this.handleFromDownload },
                    ]}
                />
                <div style={{ textAlign: 'right', paddingBottom: '10px' }}>
                    <Button onClick={() => this.handleShowcreate()} size="small" type="default">
                        生成物流单
                    </Button>
                </div>
                <BasicTable
                    columns={[
                        {
                            title: '采购供应商',
                            dataIndex: 'supplier_name',
                        },
                        {
                            title: '订货门店名称',
                            dataIndex: 'mch_name',
                        },
                        {
                            dataIndex: 'buy_date',
                            title: '采购日期',
                        },
                        {
                            dataIndex: 'buyer',
                            title: '采购人员',
                        },
                        {
                            title: '物流状态',
                            render: (_, { status }) => {
                                let text = '未处理'
                                if (status) text = '已处理'
                                return <span>{text}</span>
                            },
                        },
                        {
                            // fixed: 'right',
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
                    // scroll={{ x: 2100 }}
                    rowKey={record => record.id}
                    dataSource={dataSrouce}
                    rowSelection={rowSelection}
                    pagination={{
                        ...pagination,
                        onChange: this.handleChangePage,
                    }}
                />
            </PageHeaderWrapper>
        )
    }
}

export default LogisticsDispatchmanagement
