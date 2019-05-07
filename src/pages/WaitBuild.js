import React from 'react'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import { mainSite } from '@/utils/utils'

const WaitBuild = () => (
    <PageHeaderWrapper>
        <div
            style={{
                fontSize: '36px',
                textAlign: 'center',
                marginTop: '200px',
                marginBottom: '20px',
            }}
        >
            开发中...
        </div>
        <div
            style={{
                fontSize: '16px',
                textAlign: 'center',
            }}
        >
            <a href={mainSite()}>回到旧版后台管理</a>
        </div>
    </PageHeaderWrapper>
)

export default WaitBuild
