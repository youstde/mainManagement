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
        fileLists: [],
        previewVisible: false,
        previewImage: '',
        showImgList: false,
        imgListIndex: 0,
    }

    componentDidMount() {
        const { initPictures } = this.props
        console.log('initPictures:', initPictures)
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (nextProps.initPictures && nextProps.initPictures.length) {
            const fileArr = nextProps.initPictures.slice()
            let imgIndex = 0
            fileArr.forEach((item, i) => {
                if (item.isCover === 1) {
                    imgIndex = i
                }
                item.uid = md5(item.url)
            })
            this.setState({
                fileLists: fileArr,
                imgListIndex: imgIndex,
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

    handleChange = ({ fileList }) => this.setState({ fileList })

    handleSubmit = file => {
        const { changeBc } = this.props
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
                const newItem = {
                    url: res.data.path,
                    uid: res.request_id,
                }
                if (fileLists.length) {
                    newItem.isCover = 0
                } else {
                    newItem.isCover = 1
                }
                this.setState({
                    fileLists: [...fileLists, newItem],
                })
                changeBc([...fileLists, newItem])
            }
        })
    }

    handleImgList = () => {
        this.setState({
            showImgList: true,
        })
    }

    handleImgListCancel = () => {
        this.setState({
            showImgList: false,
        })
    }

    onChange = e => {
        const { value } = e.target
        const { fileLists } = this.state
        fileLists.forEach(item => {
            item.isCover = 0
        })
        fileLists[value].isCover = 1
        this.setState(
            {
                imgListIndex: value,
                fileLists,
            },
            () => {
                console.log(this.state.fileLists)
            }
        )
    }

    render() {
        const { previewVisible, previewImage, fileLists, showImgList, imgListIndex } = this.state
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        )

        const createImgList = () => {
            const arr = fileLists.map((item, i) => {
                return (
                    <div className={styles.imgListItem}>
                        <Radio value={i}>
                            <img src={item.url} alt="" key={item.uid} />
                        </Radio>
                    </div>
                )
            })
            return arr
        }

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
                <Button
                    type="primary"
                    onClick={() => {
                        this.handleImgList()
                    }}
                >
                    设置主图
                </Button>
                <Modal
                    title="选择主图"
                    visible={showImgList}
                    footer={null}
                    onCancel={this.handleImgListCancel}
                >
                    <Radio.Group onChange={this.onChange} value={imgListIndex}>
                        {createImgList()}
                    </Radio.Group>
                    <Button
                        style={{ display: 'block', margin: '0 auto' }}
                        onClick={this.handleImgListCancel}
                        type="primary"
                    >
                        确定
                    </Button>
                </Modal>
            </div>
        )
    }
}

export default PicturesWall
