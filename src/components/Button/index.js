import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

import styles from './index.less'

const CustomButton = ({ type, width, style, className, disable, ...otherProps }) => (
    <Button
        className={`${styles.button} ${styles[type]} ${className}`}
        style={{
            width,
            ...style,
        }}
        {...otherProps}
        type="default"
    />
)

CustomButton.defaultProps = {
    type: 'primary',
    width: 'auto',
}
CustomButton.propTypes = {
    type: PropTypes.oneOf(['primary', 'warn', 'danger', 'default', 'pending']),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default CustomButton
