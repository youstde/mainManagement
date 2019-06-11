import React, { Fragment } from 'react'
import { Layout, Icon } from 'antd'
import GlobalFooter from '@/components/GlobalFooter'

const { Footer } = Layout
const FooterView = () => (
    <Footer style={{ padding: 0, background: '#fff' }}>
        <GlobalFooter
            copyright={
                <Fragment>
                    Copyright <Icon type="copyright" /> 2019 管理后台
                </Fragment>
            }
        />
    </Footer>
)
export default FooterView
