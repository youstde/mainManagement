import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import Link from 'umi/link'
import { Icon } from 'antd'
import GlobalFooter from '@/components/GlobalFooter'
import DocumentTitle from 'react-document-title'
import SelectLang from '@/components/SelectLang'
import styles from './UserLayout.less'
import logo from '../assets/logo.svg'
import getPageTitle from '@/utils/getPageTitle'

const copyright = (
    <Fragment>
        Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品
    </Fragment>
)

class UserLayout extends Component {
    componentDidMount() {
        const {
            dispatch,
            route: { routes, authority },
        } = this.props
        dispatch({
            type: 'menu/getMenuData',
            payload: { routes, authority },
        })
    }

    render() {
        const {
            children,
            location: { pathname },
            breadcrumbNameMap,
        } = this.props
        return (
            <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
                <div className={styles.container}>
                {/* 国际化 */}
                    {/* <div className={styles.lang}>
                        <SelectLang />
                    </div> */}
                    <div className={styles.content}>
                        {children}
                    </div>
                    <GlobalFooter copyright={copyright} />
                </div>
            </DocumentTitle>
        )
    }
}

export default connect(({ menu: menuModel }) => ({
    menuData: menuModel.menuData,
    breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))(UserLayout)
