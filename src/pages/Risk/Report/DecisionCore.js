import React, { Component } from 'react'
import { connect } from 'dva'
import SearchForm from '@/components/SearchForm'
import DetailMessage from '@/components/DetailMessage'
import { NumberToThousands } from '@/utils/utils'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'

@connect(({ report }) => ({
    report,
}))
class DecisionCore extends Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch({
            type: 'report/fetchCompanyList',
            payload: {
                type: 1,
            },
        })
    }

    handleSearchForm = values => {
        const { dispatch } = this.props
        const { companyId } = values
        dispatch({
            type: 'report/fetchDecisionCore',
            payload: {
                companyId,
            },
        })
    }

    render() {
        const {
            report: { decisionCore, companyList },
        } = this.props

        const data = [
            {
                title: '',
                detail: [
                    {
                        label: '核心企业名称',
                        msg: decisionCore.companyName,
                    },
                    {
                        label: '授信额度',
                        msg: `${NumberToThousands(decisionCore.sxe)}元`,
                    },
                    {
                        label: '可用额度',
                        msg: `${NumberToThousands(decisionCore.kye)}元`,
                    },
                    {
                        label: '可用额度占比',
                        msg: decisionCore.kyezb,
                    },
                    {
                        label: '总供应商户数',
                        msg: decisionCore.gics,
                    },
                    {
                        label: '1级供应商户数',
                        msg: decisionCore.yjgics,
                    },
                    {
                        label: '1级供应商占比',
                        msg: decisionCore.yjgiczb,
                    },
                    {
                        label: '2级供应商户数',
                        msg: decisionCore.ejgics,
                    },
                    {
                        label: '2级供应商占比',
                        msg: decisionCore.ejgiczb,
                    },
                    {
                        label: '3级及以上供应商户数',
                        msg: decisionCore.sjgics,
                    },
                    {
                        label: '3级及以上供应商占比 ',
                        msg: decisionCore.sjgiczb,
                    },
                    {
                        label: '累计流转额',
                        msg: `${NumberToThousands(decisionCore.byljlze)}元`,
                    },
                    {
                        label: '累计流转笔数',
                        msg: decisionCore.lzbs,
                    },
                    {
                        label: '1级供应商流转额',
                        msg: `${NumberToThousands(decisionCore.yjlze)}元`,
                    },
                    {
                        label: '1级流转额占比',
                        msg: decisionCore.yjlzezb,
                    },
                    {
                        label: '1级供应商流转笔数',
                        msg: decisionCore.yjlzbs,
                    },
                    {
                        label: '1级流转笔数占比',
                        msg: decisionCore.yjlzbszb,
                    },
                    {
                        label: '2级供应商流转额',
                        msg: `${NumberToThousands(decisionCore.ejlze)}元`,
                    },
                    {
                        label: '2级流转额占比',
                        msg: decisionCore.ejlzezb,
                    },
                    {
                        label: '2级供应商流转笔数',
                        msg: decisionCore.ejlzbs,
                    },
                    {
                        label: '2级流转笔数占比',
                        msg: decisionCore.ejlzbszb,
                    },
                    {
                        label: '3级及以上供应商流转额',
                        msg: `${NumberToThousands(decisionCore.sjlze)}元`,
                    },
                    {
                        label: '3级及以上流转额占比',
                        msg: decisionCore.sjlzezb,
                    },
                    {
                        label: '3级及以上供应商流转笔数',
                        msg: decisionCore.sjlzbs,
                    },
                    {
                        label: '3级及以上流转笔数占比',
                        msg: decisionCore.sjlzbszb,
                    },
                    {
                        label: '累计签发额度',
                        msg: `${NumberToThousands(decisionCore.ljqfe)}元`,
                    },
                    {
                        label: '累计签发额度笔数',
                        msg: decisionCore.ljqfbs,
                    },
                    {
                        label: '累计还款额',
                        msg: `${NumberToThousands(decisionCore.ljhke)}元`,
                    },
                    {
                        label: '累计还款笔数',
                        msg: decisionCore.ljhkbs,
                    },
                    {
                        label: '累计逾期额',
                        msg: `${NumberToThousands(decisionCore.ljyqe)}元`,
                    },
                    {
                        label: '累计逾期笔数',
                        msg: decisionCore.ljyqbs,
                    },
                    {
                        label: '供应商累计融资额',
                        msg: `${NumberToThousands(decisionCore.rze)}元`,
                    },
                    {
                        label: '供应商累计融资笔数',
                        msg: decisionCore.rzbs,
                    },
                    {
                        label: '流转arpu值',
                        msg: decisionCore.lzarpu,
                    },
                    {
                        label: '1级流转arpu值',
                        msg: decisionCore.yjlzarpu,
                    },
                    {
                        label: '2级流转arpu值',
                        msg: decisionCore.ejlzarpu,
                    },
                    {
                        label: '3级及以上流转arpu值',
                        msg: decisionCore.sjlzarpu,
                    },
                    {
                        label: '签发额度arpu值',
                        msg: decisionCore.ljqfarpu,
                    },
                    {
                        label: '还款arpu值',
                        msg: decisionCore.ljhkarpu,
                    },
                    {
                        label: '逾期arpu值',
                        msg: decisionCore.ljyqarpu,
                    },
                    {
                        label: '供应商融资arpu值',
                        msg: decisionCore.rzarpu,
                    },
                ],
            },
        ]

        const buttonGroup = [
            {
                onSearch: this.handleSearchForm,
            },
        ]

        return (
            <PageHeaderWrapper>
                <div>
                    <SearchForm
                        data={[
                            {
                                label: '核心企业名称',
                                type: 'select',
                                options: companyList,
                                key: 'companyId',
                                placeholder: '请选择核心企业',
                                showSearch: true,
                                allowClear: true,
                            },
                        ]}
                        buttonGroup={buttonGroup}
                    />
                </div>
                {Object.keys(decisionCore).length !== 0 && <DetailMessage data={data} />}
            </PageHeaderWrapper>
        )
    }
}

export default DecisionCore
