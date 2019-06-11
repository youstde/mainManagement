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
        const { toggleStateBc, dataSource } = this.props

        this.setState(
            {
                isToLoading: true,
            },
            () => {
                toggleStateBc(checked, dataSource.id)
            }
        )
    }

    render() {
        const { isToLoading } = this.state
        const { handleClick } = this
        const { dataSource } = this.props
        console.log('dataSource:', dataSource)
        return (
            <div>
                <Switch
                    onClick={handleClick}
                    loading={isToLoading}
                    checked={dataSource.status === 0}
                    checkedChildren="启用"
                    unCheckedChildren="停用"
                    defaultChecked={dataSource.status === 0}
                />
            </div>
        )
    }
}

export default BaseSwitch
