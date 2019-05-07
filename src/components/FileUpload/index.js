import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Upload, Modal, message } from 'antd'
import FileUploadButton from './FileUploadButton'

import { baseUrl } from '@/utils/createAPI'
import { mainSite, isImageType } from '@/utils/utils'
import { getSession } from '@/utils/session'
import styles from './index.less'

class FileUpload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            previewFileVisible: false,
            previewFile: '',
            fileList: [],
            bakFileList: [], // 外部备份数组
        }
    }

    // 这里主要做的是，外部传入的fileList改变了之后，将不管内部的数据，全部同步成外部传入的
    // 如果仅仅是内部的fileList改变，不能去影响bakFileList，bak仅仅是跟外部做比较的
    static getDerivedStateFromProps(nextProps, prevState) {
        const { bakFileList } = prevState
        if (nextProps.fileList && nextProps.fileList.length >= 0) {
            let isChangeFileList = false

            if (nextProps.fileList.length !== bakFileList.length) {
                isChangeFileList = true
            }
            const newBakFileList = nextProps.fileList.map((url, propIndex) => {
                if (!url) {
                    isChangeFileList = false
                    // old: return
                    // change: wangsijie 2019/04/24
                    return null
                }
                // 外部传入的是否改变
                bakFileList.forEach((i, backIndex) => {
                    if (propIndex === backIndex && i.url !== url) {
                        isChangeFileList = true
                    }
                })
                // 设置文件名
                const name = url.split('/')[url.split('/').length - 1]
                // 通过文件名尾缀，设置文件type
                const suffix = name.split('.').length === 2 ? name.split('.')[1] : ''
                let type = ''
                if (isImageType(suffix)) {
                    type = `image/${suffix}`
                } else {
                    // TODO: 其他所有的后缀都，都当 application 处理
                    type = `application/${suffix}`
                }

                return {
                    url,
                    thumbUrl: url,
                    type,
                    name,
                    response: {
                        data: url,
                        success: true,
                    },
                    status: 'done',
                    uid: url,
                    isProps: true,
                }
            })
            // 判断filelist props值是否改变，改变了重制
            if (isChangeFileList) {
                return {
                    ...prevState,
                    bakFileList: newBakFileList,
                    fileList: newBakFileList,
                }
            }
        }
        return null
    }

    // 预览图片
    handlePreview = file => {
        if (file.type.indexOf('image') > -1) {
            this.setState({
                previewVisible: true,
                previewImage: file.url || file.thumbUrl,
            })
        } else {
            this.setState({
                previewFileVisible: true,
                previewFile: file.response.data,
            })
        }
    }

    // 关闭预览
    handleCancel = () => {
        this.setState({
            previewVisible: false,
            previewFileVisible: false,
            // previewImage: '',
        })
    }

    handleRemove = file => {
        const { onRemove } = this.props
        // const { fileList } = this.state

        // const removedFileList = fileList.filter(item => item.uid !== file.uid)
        // console.log(removedFileList)

        // this.setState({
        //     fileList: removedFileList,
        // })

        return onRemove(file)
    }

    // 上传状态改变
    handleChange = ({ file, fileList, event }) => {
        const { onChange, onSuccess } = this.props
        onChange(file, fileList, event)

        // 成功时候的回调
        if (file.response && file.response.success && file.status === 'done') {
            onSuccess(file, fileList, event)
        }

        this.setState({ fileList })

        // 被删除时
        if (file.status === 'removed') {
            return
        }
        // 400 - 500 时
        if (file.status === 'error') {
            Modal.error({
                title: '温馨提示',
                width: 540,
                content: (
                    <div>
                        看见这个页面，说明您碰到问题了。
                        <br />
                        请先检查下网络连接，或者退出浏览器重新登陆下。
                        <br />
                        如果多次尝试都没有变化，请联系我们的客服400-800-2970解决。
                        <br />
                    </div>
                ),
            })
            return
        }

        // 登陆失效，或者文件上传失败时
        if (file.response && !file.response.success) {
            const { code, msg } = file.response
            if (code === -2) {
                Modal.error({
                    title: msg,
                    okText: '前往登陆',
                    onOk: () => {
                        // TODO: mainSite 的判断
                        window.location = mainSite()
                    },
                })
            } else {
                Modal.error({
                    title: msg,
                })
            }
        }
    }

    // 上传前钩子
    hadnleBeforeUpload = (file, fileList) => {
        const { accept } = this.props
        if (accept !== '*') {
            // TODO: 控制文件类型。这里要结合 accept 判断
            if (file.type.indexOf('image') === -1 && file.type.indexOf('pdf') === -1) {
                message.error('请上传图片或PDF文件！')
                return Promise.reject()
            }
        }
        // 控制文件大小
        const { maxSize } = this.props
        const maxSizeBite = maxSize * 1000 * 1000
        if (file.size >= maxSizeBite) {
            message.error(`文件过大，请上传大小少于${maxSize}M的文件`)
            return Promise.reject()
        }

        // 钩子函数
        const { beforeUpload } = this.props
        if (beforeUpload) {
            const result = beforeUpload(file, fileList)
            return result
        }
        // add , by wangsijie 2019/04/24
        return true
    }

    getUrlString = () => {
        const { fileList } = this.state
        const urlArray = []
        fileList.forEach(file => {
            if (file.response && file.response.success) {
                urlArray.push(file.response.data)
            }
        })

        return urlArray.join(',')
    }

    render() {
        const {
            previewVisible,
            previewFileVisible,
            previewFile,
            previewImage,
            fileList,
        } = this.state
        const { count, accept, uploadTip, type, action } = this.props

        return (
            <div
                className={`${styles.uploadContainer} ${
                    type === 'normal' ? '' : styles.uploadCardType
                }`}
            >
                <Upload
                    className={styles.upload}
                    action={`${baseUrl}${action}`}
                    listType="picture-card"
                    multiple
                    accept={accept}
                    withCredentials
                    headers={{
                        Authorization: getSession(),
                    }}
                    name="multipartFile"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onRemove={this.handleRemove}
                    onChange={this.handleChange}
                    beforeUpload={this.hadnleBeforeUpload}
                >
                    {fileList.length >= count ? null : (
                        <FileUploadButton type={type} uploadTip={uploadTip} />
                    )}
                </Upload>
                <Modal
                    title="文件预览"
                    visible={previewVisible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img src={previewImage} style={{ width: '100%' }} alt="预览" />
                </Modal>
                <Modal
                    width="100%"
                    wrapClassName="zn-fullScreenModal"
                    visible={previewFileVisible}
                    footer={null}
                    destroyOnClose
                    onCancel={this.handleCancel}
                    title="文件预览"
                >
                    <iframe
                        title="文件预览"
                        width="100%"
                        height="100%"
                        src={previewFile}
                        frameBorder="0"
                    />
                </Modal>
            </div>
        )
    }
}

FileUpload.defaultProps = {
    type: 'normal',
    count: 1000,
    maxSize: 10,
    uploadTip: '',
    action: '/fileUtil/upLoad',
    accept: '.pdf,image/*',
    onChange: () => {},
    onSuccess: () => {},
    onRemove: () => {},
    beforeUpload: null,
}

FileUpload.propTypes = {
    type: PropTypes.string, // 类型
    count: PropTypes.number, // 最大上传数量
    maxSize: PropTypes.number, // 最大上传大小（单位m）
    uploadTip: PropTypes.string, // 显示的提示
    action: PropTypes.string, // 表单提交的路径
    accept: PropTypes.string, // 文件类型
    onChange: PropTypes.func,
    onSuccess: PropTypes.func,
    onRemove: PropTypes.func,
    beforeUpload: PropTypes.func,
}

export default FileUpload
