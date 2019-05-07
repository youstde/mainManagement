import React, { Component } from 'react'
import { connect } from 'dva'
import { Button } from 'antd'
import { routerRedux } from 'dva/router'
// import moment from 'moment'
import SearchForm from '@/components/SearchForm'
import DetailMessage from '@/components/DetailMessage'
import { NumberToThousands } from '@/utils/utils'
// import { useCashDeposit } from '../services/index'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'

@connect(({ company, common }) => ({
    company,
    common,
}))
class Ledger extends Component {
    state = {
        companyId: null, // 企业ID
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch({
            type: 'common/fetchCompanyList',
        })
        dispatch({
            type: 'company/fetchCompanyTotal',
            payload: {
                companyId: null,
            },
        })
    }

    handleSearchForm = values => {
        const { dispatch } = this.props
        const { companyId } = values
        this.setState({
            companyId,
        })
        dispatch({
            type: 'company/fetchCompanyTotal',
            payload: {
                companyId: companyId || null,
            },
        })
    }

    // handleRepayment = () => {
    //     console.log(111)
    // }

    goCashRecord = () => {
        const { dispatch } = this.props
        const { companyId } = this.state

        dispatch(routerRedux.push(`/company/cash-record?companyId=${companyId}`))
    }

    render() {
        const {
            common: { companyList },
            company: { totalMsg },
        } = this.props

        const buttonGroup = [
            {
                onSearch: this.handleSearchForm,
            },
        ]

        const data = [
            {
                title: '企业名称',
                detail: [
                    {
                        msg: totalMsg.companyName,
                    },
                    // {
                    //     msg: (
                    //         <Button type="primary" onClick={this.handleRepayment}>
                    //             立即使用保证金还款
                    //         </Button>
                    //     ),
                    // },
                ],
            },
            {
                title: '企业类型',
                detail: [
                    {
                        msg: totalMsg.coreCompanyLogo,
                    },
                ],
            },
            {
                title: '授信情况',
                detail: [
                    {
                        label: '生效额度',
                        msg: `${NumberToThousands(totalMsg.totalAmount)}元`,
                    },
                    {
                        label: '可用信用额度',
                        msg: `${NumberToThousands(totalMsg.availableAmount)}元`,
                    },
                    {
                        label: '已用信用额度',
                        msg: `${NumberToThousands(totalMsg.usedAmount)}元`,
                    },
                ],
            },
            {
                title: '现金资产情况',
                detail: [
                    {
                        label: '可用余额',
                        msg: `${NumberToThousands(totalMsg.canUseAmount)}元`,
                    },
                    {
                        label: '实缴保证金',
                        msg: `${NumberToThousands(totalMsg.allCashDeposit)}元`,
                    },
                    {
                        msg: (
                            <Button type="primary" onClick={this.goCashRecord}>
                                现金流水记录
                            </Button>
                        ),
                    },
                ],
            },
            {
                title: '锌贝壳情况',
                detail: [
                    {
                        label: '当前持有锌贝壳',
                        msg: `${NumberToThousands(totalMsg.totalZNAmount)}元`,
                    },
                    {
                        label: '可用锌贝壳',
                        msg: `${NumberToThousands(totalMsg.currentZNTotal)}元`,
                    },
                    {
                        label: '冻结锌贝壳',
                        msg: `${NumberToThousands(totalMsg.freezeZNAmount)}元`,
                    },
                ],
            },
            {
                title: '分润情况',
                detail: [
                    {
                        label: '累计分润',
                        msg: `${NumberToThousands(totalMsg.profitTotalAmount)}元`,
                    },
                    {
                        label: '分润已到账',
                        msg: `${NumberToThousands(totalMsg.alreadyCashAmount)}元`,
                    },
                    {
                        label: '冻结分润',
                        msg: `${NumberToThousands(totalMsg.freezeAmount)}元`,
                    },
                    {
                        label: '可转出分润',
                        msg: `${NumberToThousands(totalMsg.canCheckOutAmount)}元`,
                    },
                ],
            },
            {
                title: '还款情况',
                detail: [
                    {
                        label: '待还金额',
                        msg: `${NumberToThousands(totalMsg.allRepaymentAmount)}元`,
                    },
                    {
                        label: '未到期和还款中',
                        msg: `${NumberToThousands(totalMsg.repaymentAmount)}元`,
                    },
                    {
                        label: '已逾期',
                        msg: `${NumberToThousands(totalMsg.overdueAmount)}元`,
                    },
                    {
                        label: '逾期费用',
                        msg: `${NumberToThousands(totalMsg.overdueFeeAmount)}元`,
                    },
                ],
            },
        ]

        return (
            <PageHeaderWrapper>
                <div>
                    <SearchForm
                        data={[
                            {
                                label: '企业名称',
                                type: 'select',
                                options: companyList,
                                key: 'companyId',
                                showSearch: true,
                            },
                        ]}
                        buttonGroup={buttonGroup}
                    />
                </div>
                {Object.keys(totalMsg).length !== 0 && <DetailMessage data={data} />}
            </PageHeaderWrapper>
        )
    }
}

export default Ledger
