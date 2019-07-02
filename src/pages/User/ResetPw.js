import React, { PureComponent } from 'react'
import { Input, Icon, Button, message } from 'antd'
import styles from './Login.less'

import { login } from './services/index'
import md5 from 'md5'

// @connect(() => {})
class Register extends PureComponent {
    state = {
        value: '',
    }
    componentDidMount() {
        // window.location = mainSite()
    }

    handleInputChange = e => {
        console.log('handleInputChange:', e.target.value)
        const { value } = e.target
        this.setState({
            value,
        })
    }

    handleSubmit = e => {
        const { value } = this.state
        const { history } = this.props
        console.log('handleSubmit:', e.target.value, value)
        if (value) {
            login({
                t: 'member.setpwd',
                password: md5(value),
            }).then(res => {
                if (res && res.errcode === 0) {
                    message.success('修改成功!', 1, () => {
                        history.replace('/')
                    })
                }
            })
        } else {
            message.warn('请输入新密码!', 2)
        }
    }

    render() {
        return (
            <div className={styles.resetBx}>
                <div className={styles.title}>重置密码</div>
                <Input.Password
                    placeholder="请输入新密码"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    onPressEnter={e => {
                        this.handleSubmit(e)
                    }}
                    onChange={this.handleInputChange}
                />
                <div className={styles.btnBx}>
                    <Button type="primary" onClick={this.handleSubmit}>
                        重置密码
                    </Button>
                </div>
            </div>
        )
    }
}

export default Register
