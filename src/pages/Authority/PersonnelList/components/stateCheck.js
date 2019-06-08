import React, { Component } from 'react'
import { Switch } from 'antd'

class PersonnelStateSwitch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isToLoading: false,
        }
    }

    componentDidMount() {
        window.onMessage('toggle:authority/personnelmanagement/list:switch', () => {
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
        const { toggleStateBc, id } = this.props

        this.setState(
            {
                isToLoading: true,
            },
            () => {
                toggleStateBc(checked, id)
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
                    checked={state === 0}
                    checkedChildren="启用"
                    unCheckedChildren="停用"
                    defaultChecked={state === 0}
                />
            </div>
        )
    }
}

export default PersonnelStateSwitch
