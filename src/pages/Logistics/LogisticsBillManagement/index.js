import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'

// import { fetchFunction } from '@/services'
const fetchFunction = async () => ({ data: { list: [], count: 0 }, success: true })

@connect(() => ({}))
class LogisticsBillManagement extends Component {
    state = {
        searchCondition: {}, // 搜索条件
        dataSrouce: [], // 表格数据
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        }, // 表格分页
    }

    componentDidMount() {
        this.fetchData()
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

    render() {
        const { dataSrouce, pagination } = this.state

        return (
            <PageHeaderWrapper>
                <SearchForm
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
                />
                <BasicTable
                    columns={[
                        {
                            title: '批次号',
                            dataIndex: 'col1',
                        },
                        {
                            title: '物流单号',
                            dataIndex: 'col2',
                        },
                        {
                            title: '发货日期',
                            dataIndex: 'amount',
                            type: 'amount',
                        },
                        {
                            title: '物流公司',
                            dataIndex: 'datecol',
                            type: 'date',
                        },
                        {
                            dataIndex: 'key-0',
                            title: '物流成本',
                        },
                        {
                            dataIndex: 'key-1',
                            title: '车辆类型',
                        },
                        {
                            dataIndex: 'key-2',
                            title: '车牌号码',
                        },
                        {
                            dataIndex: 'key-3',
                            title: '驾驶员姓名',
                        },
                        {
                            dataIndex: 'key-4',
                            title: '驾驶员联系方式',
                        },
                        {
                            dataIndex: 'key-5',
                            title: '发货地',
                        },
                        {
                            dataIndex: 'key-6',
                            title: '收货地',
                        },
                        {
                            dataIndex: 'key-7',
                            title: 'skuID',
                        },
                        {
                            dataIndex: 'key-8',
                            title: ' sku品名',
                        },
                        {
                            dataIndex: 'key-9',
                            title: '品类',
                        },
                        {
                            dataIndex: 'key-10',
                            title: '产区',
                        },
                        {
                            dataIndex: 'key-11',
                            title: '品种',
                        },
                        {
                            dataIndex: 'key-12',
                            title: '存储情况',
                        },
                        {
                            dataIndex: 'key-13',
                            title: '加工情况',
                        },
                        {
                            dataIndex: 'key-14',
                            title: '内包装',
                        },
                        {
                            dataIndex: 'key-15',
                        },
                        {
                            dataIndex: 'key-16',
                            title: '外包装',
                        },
                        {
                            dataIndex: 'key-17',
                            title: '实际规格值',
                        },
                        {
                            dataIndex: 'key-18',
                            title: '净重',
                        },
                        {
                            dataIndex: 'key-19',
                            title: '订货数量',
                        },
                        {
                            dataIndex: 'key-20',
                            title: '实际采购数量',
                        },
                        {
                            dataIndex: 'key-21',
                            title: '预计到达时间',
                        },
                        {
                            dataIndex: 'key-22',
                            title: '采购日期',
                        },
                        {
                            dataIndex: 'key-23',
                            title: '采购人员',
                        },
                        {
                            fixed: 'right',
                            type: 'oprate',
                            buttons: [{ text: '查看详情' }, { text: '编辑' }],
                        },
                    ]}
                    scroll={{ x: 2800 }}
                    dataSource={dataSrouce}
                    pagination={{
                        ...pagination,
                        onChange: this.handleChangePage,
                    }}
                />
            </PageHeaderWrapper>
        )
    }
}

export default LogisticsBillManagement
