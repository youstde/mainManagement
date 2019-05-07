import React, { PureComponent, Fragment } from 'react'

import DetailList from '@/components/DetailList'
import Button from '@/components/Button'

import { getZhongdengDetail, allContractDownloadPath } from '../services/financing'
import { checkAuthority, fileDownloadByIframe } from '@/utils/utils'

class ZhongdengDetail extends PureComponent {
    state = {
        data: {},
    }

    componentDidMount() {
        const { tradeId: discountRecordId } = this.props

        getZhongdengDetail({ discountRecordId }).then(res => {
            if (res && res.success) {
                this.setState({
                    data: res.data,
                })
            }
        })
    }

    handleDownloadAll = () => {
        const {
            data: { contractIdList },
        } = this.state

        contractIdList.forEach(url => {
            fileDownloadByIframe(`${allContractDownloadPath}${url}`)
        })
    }

    render() {
        const { data } = this.state

        return (
            <div>
                <DetailList
                    title="出让人信息"
                    data={[
                        {
                            label: '出让人名称',
                            value: data.companyName,
                        },
                        {
                            label: '组织机构代码/统一社会信用代码',
                            value: data.socialUnifyCreditCode,
                        },
                        {
                            label: '工商注册号/统一社会信用代码',
                            value: data.socialUnifyCreditCode,
                        },
                        {
                            label: '法定代表人/负责人',
                            value: data.legalPerson,
                        },
                        {
                            label: '地址',
                            value: data.address,
                        },
                    ]}
                />
                <DetailList
                    title="受让人信息"
                    data={[
                        {
                            label: '受让人名称',
                            value: data.receiveCompanyName,
                        },
                        {
                            label: '组织机构代码/统一社会信用代码',
                            value: data.receiveSocialUnifyCreditCode,
                        },
                        {
                            label: '工商注册号/统一社会信用代码',
                            value: data.receiveSocialUnifyCreditCode,
                        },
                        {
                            label: '法定代表人/负责人',
                            value: data.receiveLegalPerson,
                        },
                        {
                            label: '地址',
                            value: data.receiveAddress,
                        },
                    ]}
                />
                <DetailList
                    title="转让财产信息"
                    data={[
                        {
                            label: '转让合同号码',
                            value: data.znFlowAndAcceptRecordContractSn,
                        },
                        {
                            label: '转让财产价值',
                            value: data.subsidyCashAmount,
                        },
                        {
                            label: '转让财产描述',
                            value: data.transPropertyDescription,
                        },
                    ]}
                />
                <DetailList
                    title="相关文件"
                    data={[
                        {
                            label: '其他信息',
                            value: (
                                <Fragment>
                                    <Button
                                        type="default"
                                        style={{ marginRight: '10px', marginBottom: '10px' }}
                                    >
                                        <a
                                            href={data.paymentContractUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            下载付款承诺函
                                        </a>
                                    </Button>
                                    <Button
                                        type="default"
                                        style={{ marginRight: '10px', marginBottom: '10px' }}
                                    >
                                        <a
                                            href={data.contractUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            下载融资转让凭证
                                        </a>
                                    </Button>
                                    {checkAuthority('download') ? (
                                        <Button onClick={this.handleDownloadAll}>
                                            点击下载所有流转合同
                                        </Button>
                                    ) : null}
                                </Fragment>
                            ),
                        },
                    ]}
                />
            </div>
        )
    }
}

export default ZhongdengDetail
