import React, { PureComponent } from 'react'
import { Upload, Icon, Modal } from 'antd'

import { generalPost } from '@/services/common'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}

class PicturesWall extends PureComponent {
    state = {
        fileLists: [],
        previewVisible: false,
        previewImage: '',
        fileList: [
            {
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
        ],
    }

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

    handleSubmit = file => {
        const { fileLists } = this.state
        const formData = new FormData()
        formData.append('files[]', file)
        generalPost(
            {
                t: 'upload',
                type: 'goods',
            },
            formData
        ).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    fileLists: [
                        ...fileLists,
                        {
                            url: res.data.path,
                            uid: res.request_id,
                        },
                    ],
                })
            }
        })
    }

    render() {
        const { previewVisible, previewImage, fileLists } = this.state
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        return (
            <div className="clearfix">
                <Upload
                    action={file => {
                        this.handleSubmit(file)
                    }}
                    listType="picture-card"
                    fileList={fileLists}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {/* {fileList.length >= 3 ? null : uploadButton} */}
                    {uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}

export default PicturesWall
