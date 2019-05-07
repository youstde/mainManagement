import React from 'react'

import styles from './index.less'

const Detail = ({ label, value, width }) => (
    <div className={styles.detail}>
        <div className={styles.label} style={{ width }}>
            {label}
        </div>
        <div className={styles.value}>{value}</div>
    </div>
)

const DetailList = ({ data, title, labelWidth }) => (
    <div>
        {title && <h4>{title}</h4>}
        {data.map((item, index) => (
            <Detail
                key={item.key || index}
                label={item.label}
                value={item.value}
                width={labelWidth}
            />
        ))}
    </div>
)

DetailList.defaultProps = {
    labelWidth: 140,
    title: null,
    data: [],
}

export default DetailList
