import React, { PureComponent } from 'react'
import { Upload, Icon, Modal, Button, Radio } from 'antd'
import md5 from 'md5'

import { generalPost } from '@/services/common'
import styles from './index.less'

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
        fileList: [],
        previewVisible: false,
        previewImage: '',
    }

    componentDidMount() {
        const { initPictures } = this.props
        const { fileList } = this.state
        console.log('initPictures:', initPictures)
        if (fileList.length === 0) {
            this.setState({
                fileList: initPictures || [],
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps:', nextProps)
        const { fileList } = this.state
        if (!fileList.length && nextProps.initPictures) {
            const newItem = {
                uid: md5(nextProps.initPictures),
                url: nextProps.initPictures,
            }
            const arr = []
            arr.push(newItem)
            this.setState({
                fileList: arr.slice(),
            })
        }
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

    // eslint-disable-next-line react/no-unused-state
    handleChange = ({ fileList }) => this.setState({ fileList })

    handleSubmit = file => {
        const { changeBc, fieldName } = this.props
        const { fileList } = this.state
        const formData = new FormData()
        formData.append('files[]', file)
        generalPost(
            {
                t: 'upload',
            },
            formData
        ).then(res => {
            if (res && res.errcode === 0) {
                const newItem = {
                    url: res.data.path,
                    uid: res.request_id,
                }
                this.setState({
                    fileList: [...fileList, newItem],
                })
                changeBc(fieldName, newItem.url)
            }
        })
    }

    handleRemove = file => {
        const { changeBc } = this.props
        const { fileList } = this.state
        const newUid = file.uid
        const newArr = fileList.slice()
        const arr = []
        newArr.forEach(item => {
            if (item.uid !== newUid) {
                arr.push(item)
            }
        })
        changeBc(arr)
    }

    onChange = e => {
        const { value } = e.target
        const { fileList } = this.state
        fileList.forEach(item => {
            item.isCover = 0
        })
        fileList[value].isCover = 1
        this.setState(
            {
                fileList,
            },
            () => {
                console.log('change:', this.state.fileList)
            }
        )
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state
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
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    onRemove={this.handleRemove}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}

export default PicturesWall
