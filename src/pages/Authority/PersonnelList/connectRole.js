import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Checkbox, Button, message } from 'antd'

import { baseGet } from '@/services/common'

@connect(() => ({}))
class ConnectRole extends PureComponent {
    state = {
        roles: [],
        ischeckedValues: null,
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        const { numberId } = this.props
        baseGet({
            t: 'member.roles',
            id: numberId,
        }).then(res => {
            if (res && res.errcode === 0) {
                const { roles, values } = res.data
                this.setState({
                    roles,
                    ischeckedValues: values,
                })
            }
        })
    }

    onChange = values => {
        this.setState({
            ischeckedValues: values,
        })
    }

    handlesubmit = () => {
        const { numberId, cancelModal } = this.props
        const { ischeckedValues } = this.state
        baseGet({
            t: 'member.auth',
            id: numberId,
            roles: ischeckedValues.join(','),
        }).then(res => {
            if (res && res.errcode === 0) {
                message.success('操作成功!', 2)
                this.fetchData()
            }
            cancelModal()
        })
    }

    render() {
        const { roles, ischeckedValues } = this.state
        const { onChange } = this

        function createGroup() {
            const groupArr = []
            const options = []
            roles.forEach(item => {
                options.push({
                    key: item.id,
                    label: `${item.name}-${item.type === 1 ? '平台' : '门店'}`,
                    value: item.id,
                })
            })
            groupArr.push(
                <Checkbox.Group
                    options={options}
                    defaultValue={ischeckedValues}
                    onChange={onChange}
                />
            )
            return groupArr
        }

        return (
            <Fragment>
                {ischeckedValues ? createGroup() : ''}
                <div style={{ textAlign: 'center', paddingTop: '20px' }}>
                    <Button type="primary" onClick={this.handlesubmit}>
                        确定
                    </Button>
                </div>
            </Fragment>
        )
    }
}

export default ConnectRole
