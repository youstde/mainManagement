import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal, message } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import BasicTable from '@/components/BasicTable'
import SearchForm from '@/components/SearchForm'
import Button from '@/components/Button'
import EditItem from './edit'

import { configurationGet } from '@/services/common'

@connect(() => ({}))
class PropertyClassManagement extends Component {
    state = {
        activeItem: {},
        cid: '',
        pageConfig: {},
        fields: [],
        modelTitle: '编辑',
        visibleModal: false,
        searchCondition: {}, // 搜索条件
        dataSrouce: [], // 表格数据
    }

    componentDidMount() {
        const {
            match: { path },
        } = this.props
        this.setState(
            {
                cid: path.split('/')[3],
            },
            () => {
                this.fetchData()
            }
        )
    }

    // 请求表格的数据
    fetchData = () => {
        const { cid, searchCondition } = this.state
        const params = {
            t: 'list',
            cid,
            // ...searchCondition
        }
        const keys = Object.keys(searchCondition)
        if (keys.length) params.q = JSON.stringify(searchCondition)
        configurationGet(params).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    dataSrouce: res.data.values,
                    fields: res.data.fields,
                    pageConfig: res.data.config,
                })
            }
        })
    }

    // 查询表单搜索
    handleFormSearch = values => {
        console.log('values:', values)
        const newObj = {}
        Object.keys(values).forEach(key => {
            if (values[key] !== '' && values[key] !== undefined)
                newObj[key] = values[key].replace(/\s/g, '')
        })
        this.setState(
            {
                searchCondition: newObj,
            },
            () => {
                this.fetchData()
            }
        )
    }

    handleShowEdit = item => {
        if (item) {
            this.setState({
                activeItem: item,
                visibleModal: true,
                modelTitle: '编辑',
            })
        } else {
            this.setState({
                visibleModal: true,
                modelTitle: '新增',
            })
        }
    }

    handleCancel = () => {
        this.setState({
            visibleModal: false,
            activeItem: {},
        })
        this.fetchData()
    }

    render() {
        const { dataSrouce, visibleModal, modelTitle, activeItem, fields, pageConfig } = this.state

        const stabelColumns = [
            {
                title: '添加日期',
                dataIndex: 'last_time',
            },
            {
                type: 'oprate',
                render: (_, item) => {
                    return (
                        <div>
                            <Button
                                onClick={() => this.handleShowEdit(item)}
                                size="small"
                                type="default"
                            >
                                编辑
                            </Button>
                        </div>
                    )
                },
            },
        ]

        function createColumns() {
            const newArr = []
            fields.forEach(item => {
                if (!item.hidden) {
                    if (item.field_type === 'file') {
                        newArr.push({
                            title: item.show_name,
                            render: (_, dataItem) => {
                                const key = item.field_name
                                const imgArr = dataItem[key].split(',')
                                const imgStr = imgArr.map(img => {
                                    return <img style={{ width: '100px' }} src={img} alt="" />
                                })
                                return <div>{imgStr}</div>
                            },
                        })
                    } else {
                        newArr.push({
                            title: item.show_name,
                            dataIndex: item.field_name,
                        })
                    }
                }
            })
            return [...newArr, ...stabelColumns]
        }

        const searchDataArr = []
        function createSearchForm() {
            fields.forEach(field => {
                if (field.search) {
                    if (field.field_type === 'select') {
                        const optionsArr = field.selects.map(item => {
                            return {
                                key: item.value,
                                value: item.text,
                            }
                        })
                        searchDataArr.push({
                            label: field.show_name,
                            type: 'select',
                            options: optionsArr,
                            key: field.field_name,
                        })
                    } else {
                        searchDataArr.push({
                            label: field.show_name,
                            type: 'input',
                            key: field.field_name,
                        })
                    }
                }
            })
        }
        createSearchForm()

        return (
            <PageHeaderWrapper>
                {searchDataArr.length ? (
                    <SearchForm
                        data={searchDataArr}
                        buttonGroup={[{ onSearch: this.handleFormSearch }]}
                    />
                ) : (
                    ''
                )}
                <div style={{ textAlign: 'right', paddingBottom: '10px' }}>
                    <Button onClick={() => this.handleShowEdit()} size="small" type="default">
                        新增
                    </Button>
                </div>
                <BasicTable columns={createColumns()} dataSource={dataSrouce} />
                <Modal
                    title={modelTitle}
                    destroyOnClose
                    visible={visibleModal}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <EditItem
                        item={activeItem}
                        fields={fields}
                        pageConfig={pageConfig}
                        cancelBc={this.handleCancel}
                    />
                </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default PropertyClassManagement
