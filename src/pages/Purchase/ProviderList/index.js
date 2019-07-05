import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal, Popconfirm, message } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import BasicTable from '@/components/BasicTable'
import SearchForm from '@/components/SearchForm'
import Button from '@/components/Button'
import AddProvider from './addProvider'

import { configurationGet } from '@/services/common'

@connect(() => ({}))
class PurchaseProviderList extends Component {
    state = {
        cid: 'A2CDF5CDE38BEFEB3E',
        editItem: null,
        showEdit: false,
        dataSrouce: [], // 表格数据
        fields: [],
        classList: [],
        searchCondition: {}, // 搜索条件
    }

    componentDidMount() {
        this.fetchData()
        this.handleClassData()
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
                })
            }
        })
    }

    handleClassData = () => {
        const classCid = '29C5FB2722EE750E35'
        configurationGet({
            t: 'values',
            cid: classCid,
        }).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    classList: res.data[classCid],
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

    handleHideEdit = () => {
        this.setState({
            showEdit: false,
            editItem: null,
        })
        this.fetchData()
    }

    editSome = data => {
        if (data) {
            // 此时有数据回填
            this.setState({
                showEdit: true,
                editItem: data,
            })
        } else {
            this.setState({
                showEdit: true,
                editItem: null,
            })
        }
    }

    // 删除某个供应商
    deleteItem = dataItem => {
        const { cid } = this.state
        configurationGet({
            t: 'status',
            id: dataItem.id,
            cid,
            action: 'delete',
        }).then(res => {
            if (res && res.errcode === 0) {
                message.success('删除成功!', 2)
                this.fetchData()
            }
        })
    }

    render() {
        const { dataSrouce, showEdit, editItem, fields, cid, classList } = this.state

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
                    <Button onClick={() => this.editSome()} size="small" type="default">
                        新增供应商
                    </Button>
                </div>
                <BasicTable
                    columns={[
                        {
                            title: '供应商ID',
                            dataIndex: 'ssid',
                        },
                        {
                            title: '供应商名称',
                            dataIndex: 'name',
                        },
                        {
                            title: '供应品类',
                            render: (_, { category_id: categoryId }) => {
                                const providerClassArr = categoryId.split(',')
                                const arr = providerClassArr.map(item => {
                                    let label = ''
                                    // eslint-disable-next-line array-callback-return
                                    classList.forEach(itemClass => {
                                        if (itemClass.id === item) label = itemClass.name
                                    })
                                    return <p key={item}>{label}</p>
                                })
                                return <div>{arr}</div>
                            },
                        },
                        {
                            title: '供应商地址',
                            dataIndex: 'address',
                            type: 'longText',
                        },
                        {
                            title: '供应商联系人',
                            dataIndex: 'contacts',
                        },
                        {
                            dataIndex: 'mobile',
                            title: '供应商联系电话',
                        },
                        {
                            dataIndex: 'settlement',
                            title: '结算周期',
                        },
                        {
                            dataIndex: 'bank_name',
                            title: '银行账户',
                        },
                        {
                            dataIndex: 'bank_info',
                            title: '开户行',
                        },
                        {
                            dataIndex: 'bank_account',
                            title: '银行账号',
                        },
                        {
                            type: 'oprate',
                            fixed: 'right',
                            render: (_, dataItem) => {
                                return (
                                    <div style={{ lineHeight: 2 }}>
                                        <Button
                                            onClick={() => this.editSome(dataItem)}
                                            size="small"
                                            type="default"
                                        >
                                            编辑
                                        </Button>
                                        <span>&nbsp;</span>
                                        <Popconfirm
                                            title="确定删除该供应商吗?"
                                            onConfirm={() => this.deleteItem(dataItem)}
                                            okText="确定"
                                            cancelText="取消"
                                        >
                                            <Button size="small" type="danger">
                                                删除
                                            </Button>
                                        </Popconfirm>
                                    </div>
                                )
                            },
                        },
                    ]}
                    scroll={{ x: 1700 }}
                    dataSource={dataSrouce}
                />
                <Modal
                    title={editItem ? '编辑供应商信息' : '添加供应商'}
                    footer={null}
                    width={680}
                    destroyOnClose
                    visible={showEdit}
                    onCancel={this.handleHideEdit}
                >
                    <AddProvider
                        data={editItem || {}}
                        fields={fields}
                        cid={cid}
                        cancelModal={this.handleHideEdit}
                    />
                </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default PurchaseProviderList
