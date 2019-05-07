import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Modal } from 'antd'
import moment from 'moment'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import ButtonGroup from '@/components/ButtonGroup'

import { NumberToThousands, getPageQuery } from '@/utils/utils'
import styles from './detail.less'

const MessageBlock = ({ label, value }) => (
    <div className={styles.messageBlock}>
        <span className={styles.messageLabel}>{label}</span>
        <span className={styles.messageValue}>{value}</span>
    </div>
)

@connect(({ company }) => ({
    company,
}))
class ReconcileDetail extends PureComponent {
    state = {
        // a: 1
    }

    componentDidMount() {
        const { financialAccessId } = getPageQuery()
        const { dispatch } = this.props

        if (financialAccessId) {
            dispatch({
                type: 'company/fetchCashDetail',
                payload: {
                    financialAccessId,
                },
            })
        } else {
            Modal.error({
                title: '提示',
                content: '没有该订单编号',
                okText: '返回列表',
                onOk: () => {
                    dispatch(routerRedux.push('/cash/reconcile-record'))
                },
            })
        }
    }

    handleGoBack = () => {
        const {
            history: { goBack },
        } = this.props
        // TODO: 这里有一种情况
        // 当前的详情页路径，换了一个窗口复制访问的。那么不会返回到列表页，而是浏览器的tab页
        goBack()
    }

    render() {
        const {
            company: { cashDetail },
        } = this.props

        return (
            <PageHeaderWrapper>
                <div className={styles.messageContainer}>
                    <MessageBlock label="变动类型" value={cashDetail.tradeTypeName} />
                    <MessageBlock
                        label="变动金额(元)"
                        value={NumberToThousands(cashDetail.tradeAmount)}
                    />
                    <MessageBlock label="订单状态" value={cashDetail.tradeStatusName} />
                    <MessageBlock
                        label="创建时间"
                        value={
                            cashDetail.gmtCreate
                                ? moment(cashDetail.gmtCreate).format('YYYY.MM.DD HH:mm:ss')
                                : '--'
                        }
                    />
                    <MessageBlock label="打款方" value={cashDetail.paymentCompanyName} />
                    <MessageBlock label="收款方" value={cashDetail.payeeCompanyName} />
                </div>
                <ButtonGroup
                    secondary={[
                        {
                            text: '返回',
                            onClick: this.handleGoBack,
                        },
                    ]}
                />
            </PageHeaderWrapper>
        )
    }
}

export default ReconcileDetail
