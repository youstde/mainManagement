import React from 'react'
import Icon from '@/components/SvgIcon'
import styles from './index.less'

const FileUploadButton = ({ type, uploadTip }) => {
    if (type === 'cardFront') {
        return (
            <div className={`${styles.uploadCardButton} ${styles.frontBackground}`}>
                <div className={styles.uploadIconPlus}>+</div>
                <div className={styles.uploadCardTip}>添加身份证正面</div>
            </div>
        )
    }
    if (type === 'cardBack') {
        return (
            <div className={`${styles.uploadCardButton} ${styles.backBackground}`}>
                <div className={styles.uploadIconPlus}>+</div>
                <div className={styles.uploadCardTip}>添加身份证反面</div>
            </div>
        )
    }
    return (
        <div className={styles.uploadButton}>
            <div className={styles.uploadIconWrap}>
                <span className={styles.uploadIcon}>
                    <Icon icon="upload" />
                </span>
            </div>
            <div className={styles.uploadTip}>{uploadTip}</div>
        </div>
    )
}

export default FileUploadButton
