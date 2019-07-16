import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Form, Input, Select, DatePicker, Button } from 'antd'
import styles from './index.less'
import { getPageQuery } from '@/utils/utils'

const { RangePicker } = DatePicker

@Form.create()
class SearchForm extends Component {
    // 生成input
    createInput = ({ label, key, ...props }) => {
        const {
            form: { getFieldDecorator },
        } = this.props
        return (
            <Form.Item label={label} key={key}>
                {getFieldDecorator(key)(<Input style={{ width: 200 }} {...props} />)}
            </Form.Item>
        )
    }

    // 生成select
    createSelect = ({ label, key, options = [], initValue = '', ...props }) => {
        const {
            form: { getFieldDecorator },
        } = this.props
        const custom = {
            allowClear: true,
        }
        if (props.showSearch && !props.filterOption) {
            Object.assign(custom, {
                showSearch: true,
                filterOption: (input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
            })
        }

        return (
            <Form.Item label={label} key={key}>
                {getFieldDecorator(key, {
                    initialValue: initValue,
                })(
                    <Select style={{ width: 200 }} {...custom} {...props}>
                        {options.map(option => (
                            <Select.Option key={option.key}>{option.value}</Select.Option>
                        ))}
                    </Select>
                )}
            </Form.Item>
        )
    }

    // 生成DatePicker
    createDatePicker = ({ label, key, ...props }) => {
        const {
            form: { getFieldDecorator },
        } = this.props
        return (
            <Form.Item label={label} key={key}>
                {getFieldDecorator(key)(<DatePicker {...props} />)}
            </Form.Item>
        )
    }

    // 生成RangePicker
    createRangePicker = ({ label, key, ...props }) => {
        const {
            form: { getFieldDecorator },
        } = this.props
        return (
            <Form.Item label={label} key={key}>
                {getFieldDecorator(key)(<RangePicker {...props} />)}
            </Form.Item>
        )
    }

    createForm = data => {
        const formEl = data.map(item => {
            let formElement = null

            switch (item.type.toLocaleLowerCase()) {
                case 'input':
                    formElement = this.createInput(item)
                    break
                case 'select':
                    formElement = this.createSelect(item)
                    break
                case 'datepicker':
                    formElement = this.createDatePicker(item)
                    break
                case 'rangepicker':
                    formElement = this.createRangePicker(item)
                    break
                default:
                    formElement = null
            }

            return formElement
        })
        return formEl
    }

    handleSearch = () => {
        const { onSearch } = this.props
        const values = this.getFormValues()

        onSearch(values)
    }

    handleDownload = () => {
        const { onDownload } = this.props

        const values = this.getFormValues()

        onDownload(values)
    }

    // 点击按钮
    handleCustomClick = (callback = () => {}) => {
        const values = this.getFormValues()
        const newStr = this.handleQuery(values)
        callback(values, newStr)
    }

    handleQuery = values => {
        const queryObj = getPageQuery()
        const newObj = {
            ...values,
            ...queryObj,
        }
        let str = '?'
        Object.keys(newObj).forEach(key => {
            str += `${key}=${newObj[key]}&`
        })
        str = str.replace(/&$/, '')
        return str
    }

    generateButton = ({ type, onClick, icon, disabled, text, key }) => (
        <Button
            type={type || 'default'}
            onClick={() => this.handleCustomClick(onClick)}
            icon={icon || null}
            disabled={disabled}
            key={key}
        >
            {text}
        </Button>
    )

    // 获取表单的数据
    getFormValues = () => {
        const {
            data,
            form: { getFieldsValue },
        } = this.props

        const values = getFieldsValue()

        // 对日期进行格式转换
        data.forEach(item => {
            const { type, key, dateFormat } = item
            const curVal = values[key]

            if (type.toLocaleLowerCase() === 'datepicker' && curVal != null) {
                values[key] = moment(curVal).format(dateFormat || 'YYYY-MM-DD')
            }

            if (type.toLocaleLowerCase() === 'rangepicker' && curVal != null) {
                values[key] = curVal.map(v => moment(v).format(dateFormat || 'YYYY-MM-DD'))
            }
        })

        return values
    }

    render() {
        const { data, buttonGroup } = this.props

        return (
            <Form className={styles.container} layout="inline">
                {this.createForm(data)}
                {buttonGroup.map((button, index) => {
                    if (button.onSearch) {
                        return this.generateButton({
                            type: 'primary',
                            onClick: button.onSearch,
                            disabled: button.disabled,
                            icon: 'search',
                            text: '搜索',
                            key: index,
                        })
                    }
                    if (button.onDownload) {
                        return this.generateButton({
                            type: 'default',
                            onClick: button.onDownload,
                            disabled: button.disabled,
                            icon: 'download',
                            text: '下载',
                            key: index,
                        })
                    }

                    return this.generateButton({
                        type: button.type || 'default',
                        onClick: button.onClick,
                        disabled: button.disabled,
                        icon: button.icon || null,
                        text: button.text,
                        key: index,
                    })
                })}
            </Form>
        )
    }
}

SearchForm.defaultProps = {
    data: [],
    buttonGroup: [],
}

SearchForm.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired,
        })
    ),
    buttonGroup: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string,
            onSearch: PropTypes.func,
            onDownload: PropTypes.func,
            onClick: PropTypes.func,
            disabled: PropTypes.bool,
            icon: PropTypes.string,
            text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        })
    ),
}

export default SearchForm
