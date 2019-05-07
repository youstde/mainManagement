import React, { Component } from 'react'
import { connect } from 'dva'
import DetailMessage from '@/components/DetailMessage'
import { NumberToThousands } from '@/utils/utils'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'

@connect(({ report }) => ({
    report,
}))
class DecisionGrail extends Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch({
            type: 'report/fetchDecisionGrail',
        })
    }

    render() {
        const {
            report: { decisionGrail },
        } = this.props

        const data = [
            {
                title: '',
                detail: [
                    {
                        label: '截止日期',
                        msg: decisionGrail.dt,
                    },
                    {
                        label: '注册企业数',
                        msg: decisionGrail.zcis,
                    },
                    {
                        label: '认证企业数',
                        msg: decisionGrail.renzcis,
                    },
                    {
                        label: '核心企业户数',
                        msg: decisionGrail.hcis,
                    },
                    {
                        label: '供应商户数',
                        msg: decisionGrail.gcis,
                    },
                    {
                        label: '授信额度',
                        msg: `${NumberToThousands(decisionGrail.sxe)}元`,
                    },
                    {
                        label: '可用额度',
                        msg: `${NumberToThousands(decisionGrail.kye)}元`,
                    },
                    {
                        label: '可用额度占比',
                        msg: decisionGrail.kyezb,
                    },
                    {
                        label: '冻结额度',
                        msg: `${NumberToThousands(decisionGrail.dje)}元`,
                    },
                    {
                        label: '冻结额度占比',
                        msg: decisionGrail.djezb,
                    },
                    {
                        label: '已使用额度',
                        msg: `${NumberToThousands(decisionGrail.usede)}元`,
                    },
                    {
                        label: '已使用额度占比',
                        msg: decisionGrail.usedezb,
                    },
                    {
                        label: '锌贝壳总额',
                        msg: `${NumberToThousands(decisionGrail.xbkze)}元`,
                    },
                    {
                        label: '锌贝壳总额占比',
                        msg: decisionGrail.xbkzezb,
                    },
                    {
                        label: '融资余额',
                        msg: `${NumberToThousands(decisionGrail.rzye)}元`,
                    },
                    {
                        label: '融资余额占比',
                        msg: decisionGrail.rzyezb,
                    },
                    {
                        label: '累计使用额度',
                        msg: `${NumberToThousands(decisionGrail.ljusede)}元`,
                    },
                    {
                        label: '累计融资费用',
                        msg: `${NumberToThousands(decisionGrail.rzfye)}元`,
                    },
                    {
                        label: '融资总额',
                        msg: `${NumberToThousands(decisionGrail.rzze)}元`,
                    },
                    {
                        label: '融资占比',
                        msg: decisionGrail.rzzezb,
                    },
                    {
                        label: '承兑总额',
                        msg: `${NumberToThousands(decisionGrail.cde)}元`,
                    },
                    {
                        label: '承兑占比',
                        msg: decisionGrail.cdezb,
                    },
                    {
                        label: '保兑总额',
                        msg: `${NumberToThousands(decisionGrail.bde)}元`,
                    },
                    {
                        label: '保兑总额占比',
                        msg: decisionGrail.bdezb,
                    },
                    {
                        label: '未到期未融资总额',
                        msg: `${NumberToThousands(decisionGrail.zclze)}元`,
                    },
                    {
                        label: '未到期未融资总额占比',
                        msg: decisionGrail.zclzezb,
                    },
                    {
                        label: '累计流转总额',
                        msg: `${NumberToThousands(decisionGrail.ljlze)}元`,
                    },
                    {
                        label: '1级供应商流转总额',
                        msg: `${NumberToThousands(decisionGrail.yjglze)}元`,
                    },
                    {
                        label: '1级占比',
                        msg: decisionGrail.yjglzzb,
                    },
                    {
                        label: '2级供应商流转总额',
                        msg: `${NumberToThousands(decisionGrail.ejglze)}元`,
                    },
                    {
                        label: '2级占比',
                        msg: decisionGrail.ejglzzb,
                    },
                    {
                        label: '3级及以上供应商流转总额',
                        msg: `${NumberToThousands(decisionGrail.sjglze)}元`,
                    },
                    {
                        label: '3级及以上占比',
                        msg: decisionGrail.sjglzzb,
                    },
                ],
            },
        ]

        return (
            <PageHeaderWrapper>
                <DetailMessage data={data} />
            </PageHeaderWrapper>
        )
    }
}

export default DecisionGrail
