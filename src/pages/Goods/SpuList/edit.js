import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { message, Upload, Modal } from 'antd'

import DetailList from '@/components/DetailList'
// import Button from '@/components/Button'

// mock
import spuDetailMock from '../mock/spuDetail'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}

@connect(() => ({}))
class SpuListEdit extends PureComponent {
    state = {
        detail: spuDetailMock || {},
        previewVisible: false,
        previewImage: '',
        fileList: [
            {
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
                uid: '-2',
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
        ],
    }

    componentDidMount() {
        // this.fetchOrderDetail()
    }

    // 获取详情
    fetchOrderDetail = () => {}

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        })
    }

    handleChange = ({ fileList }) => this.setState({ fileList })

    removeImgBc = () => {
        message.warning('请点击列表中编辑进行删除，如果没有编辑按钮，可能你没有此项操作的权限!')
        return false
    }

    render() {
        const { detail, previewVisible, previewImage, fileList } = this.state

        return (
            <Fragment>
                <DetailList
                    data={[
                        {
                            label: 'spu品名',
                            value: detail.spuName,
                        },
                        {
                            label: ' 品类',
                            value: detail.goodsClass,
                        },
                        {
                            label: '品种',
                            value: detail.goodsType,
                        },
                        {
                            label: '产区',
                            value: detail.area,
                        },
                        {
                            label: '存储情况',
                            value: detail.storecase,
                        },
                        {
                            label: '加工情况',
                            value: detail.processcase,
                        },
                    ]}
                />
                <div className="clearfix">
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        onRemove={this.removeImgBc}
                    />
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </div>
                <div>商品详情</div>
            </Fragment>
        )
    }
}

export default SpuListEdit
