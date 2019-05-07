import React, { PureComponent } from 'react'
import { Icon } from 'antd'
import styles from './index.less'

class GlobalLoading extends PureComponent {
    state = {}

    render() {
        const { fetching } = this.props

        return (
            <div className={`${styles.globalLoading} ${fetching ? styles.loading : null}`}>
                <Icon className={styles.globalSpin} type="loading" style={{ fontSize: 50 }} spin />
            </div>
        )
    }
}

export default GlobalLoading
