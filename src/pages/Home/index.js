import React, { PureComponent } from 'react'
// import { connect } from 'dva'
import { Route } from 'react-router-dom'
import styles from './index.less'
// import SearchForm from '@/components/SearchForm'
// import PageHeaderWrapper from '@/components/PageHeaderWrapper'


// @connect(() => {})
class HomePage extends PureComponent {
    componentDidMount() {
        
    }

    toGoodNumber = () => {
        this.props.history.push("/home/detail")
    }

    render() {
        return (
            <div className={styles.main}>
                <span>欢迎使用本系统，查询所有编号规则，</span>
                <a herf='javaScript:void()' onClick={this.toGoodNumber}>请点击</a>
            </div>
        )
    }
}

export default HomePage
