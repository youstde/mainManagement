import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Carousel, Icon } from 'antd'
import { isImageType } from '@/utils/utils'

import styles from './index.less'

class FileGallery extends Component {
    goto = index => {
        this.galleryRef.slick.slickGoTo(index)
    }

    handleClose = () => {
        const { onClose } = this.props
        onClose()
    }

    render() {
        const { data } = this.props
        const noData = !data || data.length === 0

        return (
            <div className={styles.container}>
                <div className={styles.previewContent}>
                    {!noData &&
                        data.map((item, index) => (
                            <div className={styles.previewItem} key={index}>
                                {isImageType(item) ? (
                                    <img onClick={() => this.goto(index)} src={item} alt={item} />
                                ) : (
                                    <span
                                        onClick={() => this.goto(index)}
                                        className={styles.previewItemPdf}
                                    >
                                        文件
                                    </span>
                                )}
                            </div>
                        ))}
                </div>
                <div className={styles.closeButton} onClick={this.handleClose}>
                    <Icon style={{ fontSize: '32px' }} type="close" />
                </div>
                <Carousel
                    ref={ref => {
                        this.galleryRef = ref
                    }}
                >
                    {noData ? (
                        <div className={styles.galleryItem}>
                            <div className={styles.noData}>&gt;_&lt; 暂无可展示文件</div>
                        </div>
                    ) : (
                        data.map((item, index) => (
                            <div className={styles.galleryItem} key={index}>
                                {isImageType(item) ? (
                                    <img src={item} alt={item} />
                                ) : (
                                    <iframe
                                        style={{ background: '#fff' }}
                                        width="100%"
                                        height="100%"
                                        title="文件"
                                        src={item}
                                    />
                                )}
                            </div>
                        ))
                    )}
                </Carousel>
            </div>
        )
    }
}

FileGallery.defaultProps = {
    onClose: () => {},
    data: [],
}

FileGallery.propTypes = {
    onClose: PropTypes.func,
    data: PropTypes.array,
}

export default FileGallery
