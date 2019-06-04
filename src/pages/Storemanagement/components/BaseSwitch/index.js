import React, { Component } from 'react'
import { Switch } from 'antd'

class BaseSwitch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isToLoading: false,
        }
    }

    componentDidMount() {
        window.onMessage('toggle:switch', () => {
            this.closeLoading()
        })
    }

    componentWillUnmount() {}

    closeLoading = () => {
        this.setState({
            isToLoading: false,
        })
    }

    handleClick = checked => {
        const { toggleStateBc } = this.props

        this.setState(
            {
                isToLoading: true,
            },
            () => {
                toggleStateBc(checked)
            }
        )
    }

    render() {
        const { isToLoading } = this.state
        const { handleClick } = this
        const { state } = this.props

        return (
            <div>
                <Switch
                    onClick={handleClick}
                    loading={isToLoading}
                    checked={state === 1}
                    checkedChildren="启用"
                    unCheckedChildren="停用"
                    defaultChecked={state === 1}
                />
            </div>
        )
    }
}

export default BaseSwitch
