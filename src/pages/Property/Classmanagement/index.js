import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal, message } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import BasicTable from '@/components/BasicTable'
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
        const { cid } = this.state

        configurationGet({
            t: 'list',
            cid,
            // ...searchCondition
        }).then(res => {
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
        this.setState(
            {
                searchCondition: values,
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
            const newArr = fields.map(item => {
                console.log('item:', item.field_type)
                if (item.field_type === 'file') {
                    return {
                        title: item.show_name,
                        render: (_, dataItem) => {
                            const key = item.field_name
                            const imgArr = dataItem[key].split(',')
                            console.log('imgArr:', imgArr)
                            const imgStr = imgArr.map(img => {
                                return <img style={{ width: '100px' }} src={img} alt="" />
                            })
                            return <div>{imgStr}</div>
                        },
                    }
                }
                return {
                    title: item.show_name,
                    dataIndex: item.field_name,
                }
            })
            return [...newArr, ...stabelColumns]
        }

        return (
            <PageHeaderWrapper>
                {/* <SearchForm
                    data={[
                        {
                            label: '品类名称',
                            type: 'input',
                            key: 'q',
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                /> */}
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
