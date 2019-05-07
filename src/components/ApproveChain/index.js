import React from 'react'
import PropTypes from 'prop-types'
import { Timeline, Icon, Tag } from 'antd'

import styles from './index.less'

const timelineMap = {
    pending: {
        color: 'green',
        dot: <Icon type="sync" spin style={{ fontSize: '18px' }} />,
    },
    success: {
        color: 'blue',
        dot: <Icon type="smile" style={{ fontSize: '20px' }} />,
    },
    // warn: {
    //     dot: <Icon type="warning" style={{ color: '#faad14', fontSize: '18px' }} />,
    // },
    // error: {
    //     color: 'red',
    //     dot: <Icon type="close-circle" style={{ fontSize: '18px' }} />,
    // },
}

const ApproveChain = ({ data }) => {
    const chainlist = data.map(item => {
        let text = ''
        let status = 'pending'

        if (item.id == null) {
            status = 'pending'
            text = item.roleName
        } else {
            status = 'success'
            text = (
                <span>
                    {`${item.signTime || ''} ${item.userName || ''} `}
                    {item.signStatusShow ? <Tag color="blue">{item.signStatusShow}</Tag> : null}
                    {` ${item.signOpinion || ''} ${item.remark || ''} `}
                </span>
            )
        }

        return {
            status,
            text,
        }
    })

    return (
        <div className={styles.container}>
            <div className={styles.title}>签署明细</div>
            <Timeline>
                {chainlist.map((item, index) => (
                    <Timeline.Item {...timelineMap[item.status]} key={index}>
                        {item.text}
                    </Timeline.Item>
                ))}
            </Timeline>
        </div>
    )
}

ApproveChain.defaultProps = {
    data: [],
}

ApproveChain.propTypes = {
    data: PropTypes.array,
}

export default ApproveChain
