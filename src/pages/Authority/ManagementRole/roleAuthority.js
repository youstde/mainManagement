import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Checkbox, Button, message } from 'antd'

import { baseGet } from '@/services/common'

@connect(() => ({}))
class RoleAuthority extends PureComponent {
    state = {
        roleId: '',
        authorits: [],
        ischeckedValues: [],
    }

    componentDidMount() {
        const {
            location: { query },
        } = this.props
        this.setState(
            {
                roleId: query.id,
            },
            () => {
                this.fetchData()
            }
        )
    }

    fetchData = () => {
        const { roleId } = this.state
        baseGet({
            t: 'role.events',
            id: roleId,
        }).then(res => {
            if (res && res.errcode === 0) {
                const { events, values } = res.data
                this.setState({
                    authorits: events,
                    ischeckedValues: values,
                })
            }
        })
    }

    onChange = e => {
        const { ischeckedValues } = this.state
        const { checked, value } = e.target
        console.log('checked:', checked)
        console.log('value = ', value)
        if (checked) {
            this.setState({
                ischeckedValues: [...ischeckedValues, value],
            })
        } else {
            const index = ischeckedValues.indexOf(value)
            ischeckedValues.splice(index, 1)
            this.setState({
                ischeckedValues,
            })
        }
    }

    handlesubmit = () => {
        const { roleId, ischeckedValues } = this.state
        console.log('handle:', ischeckedValues)
        baseGet({
            t: 'role.auth',
            id: roleId,
            events: ischeckedValues.join(','),
        }).then(res => {
            if (res && res.errcode === 0) {
                message.success('操作成功!', 2, () => {
                    window.location.reload()
                })
            }
        })
    }

    goBack = () => {
        const { history } = this.props
        history.goBack()
    }

    render() {
        const { authorits, ischeckedValues } = this.state
        const { onChange } = this

        function createGroup() {
            const groupArr = []
            authorits.forEach(auth => {
                const options = []
                auth.list.forEach(item => {
                    options.push(
                        <Checkbox
                            key={item.id}
                            onChange={onChange}
                            value={item.id}
                            defaultChecked={ischeckedValues.indexOf(item.id) !== -1}
                        >
                            {item.name}
                        </Checkbox>
                    )
                })

                groupArr.push(
                    <div>
                        <p
                            style={{
                                fontSize: '18px',
                                fontWeight: 700,
                                padding: '20px 0 10px',
                                marginBottom: 0,
                            }}
                        >
                            {auth.name}
                        </p>
                        {options}
                    </div>
                )
            })
            return groupArr
        }

        return (
            <Fragment>
                {createGroup()}
                <div style={{ textAlign: 'center', paddingTop: '20px' }}>
                    <Button type="primary" ghost onClick={this.goBack}>
                        返回
                    </Button>
                    &nbsp;
                    <Button type="primary" onClick={this.handlesubmit}>
                        确定
                    </Button>
                </div>
            </Fragment>
        )
    }
}

export default RoleAuthority
