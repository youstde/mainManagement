import React, { Component } from 'react'
import { connect } from 'dva'
import { formatMessage, FormattedMessage } from 'umi/locale'
import { Alert, message } from 'antd'
import md5 from 'md5'

import Login from '@/components/Login'
import styles from './Login.less'

import { login } from './services/index'

const { UserName, Password, Submit } = Login

@connect(({ loading }) => ({
    login,
    submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
    state = {
        type: 'account',
        isLoading: false,
    }

    componentDidMount() {
        const { history } = this.props
        const userInfoStr = localStorage.getItem('user_info')
        if (userInfoStr) {
            history.replace('/')
        }
    }

    handleSubmit = (error, value) => {
        this.setState({
            isLoading: true,
        })
        if (!error) {
            const { mobile, password } = value
            login({
                t: 'login',
                mobile,
                password: md5(password),
                type: 1,
            }).then(res => {
                if (res && res.errcode === 0) {
                    const { data: userInfo } = res
                    const { history } = this.props
                    localStorage.setItem('user_info', JSON.stringify(userInfo.user))
                    message.success('登录成功!', 2, () => {
                        this.setState({
                            isLoading: false,
                        })
                        history.push('/')
                    })
                } else {
                    this.setState({
                        isLoading: false,
                    })
                    message.error(res.message || '')
                }
            })
        } else {
            this.setState({
                isLoading: false,
            })
        }
    }

    onTabChange = type => {
        this.setState({ type })
    }

    onGetCaptcha = () =>
        new Promise((resolve, reject) => {
            this.loginForm.validateFields(['mobile'], {}, (err, values) => {
                if (err) {
                    reject(err)
                } else {
                    const { dispatch } = this.props
                    dispatch({
                        type: 'login/getCaptcha',
                        payload: values.mobile,
                    })
                        .then(resolve)
                        .catch(reject)
                }
            })
        })

    renderMessage = content => (
        <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    )

    render() {
        const { submitting } = this.props
        const { type, isLoading } = this.state
        return (
            <div className={styles.main}>
                <div className={styles.topTitle}>后台业务管理系统</div>
                <Login
                    defaultActiveKey={type}
                    onTabChange={this.onTabChange}
                    onSubmit={this.handleSubmit}
                    ref={form => {
                        this.loginForm = form
                    }}
                >
                    {login.status === 'error' &&
                        login.type === 'account' &&
                        !submitting &&
                        this.renderMessage(
                            formatMessage({ id: 'app.login.message-invalid-credentials' })
                        )}
                    <UserName
                        name="mobile"
                        placeholder="请输入用户名"
                        rules={[
                            {
                                message: formatMessage({ id: 'validation.userName.required' }),
                                required: true,
                            },
                        ]}
                    />
                    <Password
                        name="password"
                        placeholder="请输入登录密码"
                        rules={[
                            {
                                required: true,
                                message: formatMessage({ id: 'validation.password.required' }),
                            },
                        ]}
                        onPressEnter={e => {
                            e.preventDefault()
                            this.loginForm.validateFields(this.handleSubmit)
                        }}
                    />
                    <Submit loading={isLoading}>
                        <FormattedMessage id="app.login.login" />
                    </Submit>
                </Login>
            </div>
        )
    }
}

export default LoginPage
