import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Row, Col, Button } from 'antd'

import DetailList from '@/components/DetailList'
// import Button from '@/components/Button'

import { goodsBaseGet } from '@/services/common'

@connect(() => ({}))
class SpuListDetail extends PureComponent {
    state = {
        detailList: {},
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        const {
            dataSource: { spuid },
        } = this.props
        goodsBaseGet({
            t: 'spu.info',
            spuid,
        }).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    detailList: res.data,
                })
            }
        })
    }

    handleGoBack = () => {
        const { handCloseBc } = this.props
        handCloseBc()
    }

    render() {
        const { detailList } = this.state
        const { dataSource } = this.props

        const createImgLists = () => {
            const { pictures } = dataSource
            const arr = pictures.map((item, i) => {
                return <img style={{ width: '150px' }} src={item.url} alt="" key={i} />
            })
            return arr
        }

        return (
            <Fragment>
                <DetailList
                    data={[
                        {
                            label: 'spu品名',
                            value: dataSource.name,
                        },
                        {
                            label: ' 品类',
                            value: dataSource.category_name,
                        },
                        {
                            label: '品种',
                            value: dataSource.variety_name,
                        },
                        {
                            label: '产区',
                            value: `${detailList.region_lv1}/${detailList.region_lv2}/${
                                detailList.region_lv3
                            }`,
                        },
                        {
                            label: '存储情况',
                            value: dataSource.storage_name,
                        },
                        {
                            label: '加工情况',
                            value: dataSource.process_name,
                        },
                    ]}
                />
                <div>
                    <Row>
                        <Col span={5} style={{ textAlign: 'right' }}>
                            商品图片:
                        </Col>
                        <Col span={19}>{createImgLists()}</Col>
                    </Row>
                </div>
                <p>图文详情:</p>
                <div style={{ padding: '40px 20px', border: '1px solid #f1f1f1' }}>
                    <div
                        className="braft-output-content"
                        dangerouslySetInnerHTML={{ __html: detailList.describe }}
                    />
                </div>
                <div style={{ padding: '30px 0', textAlign: 'right' }}>
                    <Button onClick={this.handleGoBack} type="primary">
                        关闭
                    </Button>
                </div>
            </Fragment>
        )
    }
}

export default SpuListDetail
