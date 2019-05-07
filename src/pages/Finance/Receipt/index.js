import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Table, Modal } from 'antd'
import moment from 'moment'
import SearchForm from '@/components/SearchForm'
import { downloadList } from '../services/receipt'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'

// import { pageSize } from '../../utils/dict'

@connect(({ receipt, common }) => ({
    receipt,
    common,
}))
class Receipt extends Component {
    state = {
        selectedData: [], // 选中列数据
        selectedRowKeys: [],

        disableDownload: true, // 下载按钮是否可点击
        searchData: {}, // 查询条件

        current: 1, // 表格当前页数
        pageSize: 20, // 表格页数
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch({
            type: 'common/fetchCompanyList',
        })
        this.queryList()
    }

    componentWillUnmount() {
        const { dispatch } = this.props
        dispatch({
            type: 'receipt/clear',
        })
    }

    handleSearchForm = values => {
        const { companyId, rangedate } = values
        const { pageSize } = this.state

        const data = {
            companyId,
            startDate: rangedate ? rangedate[0] : '',
            endDate: rangedate ? rangedate[1] : '',
            size: pageSize,
            startPage: 1,
        }
        this.setState({
            searchData: values,
            selectedRowKeys: [],
            current: 1,
        })

        this.queryList(data)
    }

    handleChangePage = (current, size) => {
        const {
            searchData: { companyId, rangedate },
        } = this.state
        const data = {
            startPage: current,
            size,
            companyId,
            startDate: rangedate ? rangedate[0] : '',
            endDate: rangedate ? rangedate[1] : '',
        }
        this.setState({
            current,
        })
        this.queryList(data)
    }

    onShowSizeChange = (_, size) => {
        const {
            searchData: { companyId, rangedate },
        } = this.state

        this.setState({
            current: 1,
            pageSize: size,
        })
        const data = {
            startPage: 1,
            size,
            companyId,
            startDate: rangedate ? rangedate[0] : '',
            endDate: rangedate ? rangedate[1] : '',
        }
        this.queryList(data)
    }

    handleDownload = () => {
        const { selectedData } = this.state
        downloadList(selectedData).then(res => {
            if (res.success) {
                Modal.confirm({
                    title: '提示',
                    content: '已添加到下载队列，请前往下载管理页面查看。',
                    okText: '前往查看',
                    onOk: () => {
                        const { dispatch } = this.props
                        dispatch(routerRedux.push('/finance/receipt/download'))
                    },
                    cancelText: '取消',
                    onCancel() {},
                })
            }
        })
    }

    handleGoDownload = () => {
        const { dispatch } = this.props
        dispatch(routerRedux.push('/finance/receipt/download'))
    }

    queryList = data => {
        const { dispatch } = this.props
        dispatch({
            type: 'receipt/fetchList',
            payload: data,
        })
    }

    changeRowSelection = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedData: selectedRows,
            disableDownload: selectedRows.length === 0,
            selectedRowKeys,
        })
    }

    render() {
        const {
            receipt: { receiptList, total },
            common: { companyList },
        } = this.props

        const { disableDownload, current, pageSize, selectedRowKeys } = this.state

        const paginationProps = {
            showQuickJumper: true,
            pageSize,
            total,
            current,
            showTotal: () => `当前页${receiptList.length}条数据，共${total}条`,
            showSizeChanger: true,
            onChange: this.handleChangePage,
            onShowSizeChange: this.onShowSizeChange,
        }

        const columns = [
            {
                title: '发起方',
                dataIndex: 'paymentCompanyName',
            },
            {
                title: '接收方',
                dataIndex: 'payeeCompanyName',
            },
            {
                title: '金额',
                dataIndex: 'amount',
            },
            {
                title: '时间',
                dataIndex: 'tradeDate',
                render: text => (
                    <span>{text ? moment(text).format('YYYY.MM.DD HH:mm:ss') : ''}</span>
                ),
            },
        ]

        const rowSelection = {
            selectedRowKeys,
            onChange: this.changeRowSelection,
        }

        const buttonGroup = [
            {
                onSearch: this.handleSearchForm,
            },
            {
                onDownload: this.handleDownload,
                disabled: disableDownload,
            },
            {
                text: '下载管理',
                onClick: this.handleGoDownload,
            },
        ]

        return (
            <PageHeaderWrapper>
                <div>
                    <SearchForm
                        data={[
                            {
                                label: '企业名称',
                                type: 'select',
                                options: companyList,
                                key: 'companyId',
                                placeholder: '请选择企业',
                                showSearch: true,
                            },
                            {
                                label: '时间范围',
                                type: 'rangepicker',
                                key: 'rangedate',
                            },
                        ]}
                        buttonGroup={buttonGroup}
                    />
                </div>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={receiptList}
                    pagination={paginationProps}
                    rowKey={record => record.tradeId}
                />
            </PageHeaderWrapper>
        )
    }
}

export default Receipt
