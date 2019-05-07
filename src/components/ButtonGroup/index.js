import React, { Component, Fragment } from 'react'
import { Checkbox } from 'antd'
import PropTypes from 'prop-types'
import Button from '../Button'

import styles from './index.less'

class ButtonGroup extends Component {
    generateCustomButton = ({ text, hide, ...params }, index) => {
        if (hide) {
            return null
        }
        const { globalSize, globalWidth } = this.props

        return (
            <Button
                key={index}
                className={styles.groupButton}
                width={globalWidth || 'auto'}
                size={globalSize}
                {...params}
            >
                {text}
            </Button>
        )
    }

    generatePrimaryButton = ({ text, hide, ...params }, index) => {
        if (hide) {
            return null
        }
        const { globalSize, globalWidth } = this.props

        return (
            <Button
                key={index}
                className={styles.groupButton}
                width={globalWidth || 'auto'}
                size={globalSize}
                {...params}
            >
                {text}
            </Button>
        )
    }

    generateSecondaryButton = ({ text, hide, ...params }, index) => {
        if (hide) {
            return null
        }
        const { globalSize, globalWidth } = this.props

        return (
            <Button
                key={index}
                className={styles.groupButton}
                width={globalWidth || 'auto'}
                size={globalSize}
                type="default"
                {...params}
            >
                {text}
            </Button>
        )
    }

    generateContract = ({ text, link, download, checkbox, hide }, index) => {
        if (hide) {
            return null
        }
        return (
            <div className={styles.contractWrap} key={index}>
                {checkbox && (
                    <Checkbox checked={checkbox.checked} onChange={checkbox.onChange}>
                        同意
                    </Checkbox>
                )}
                <a
                    href={link}
                    className={styles.contractLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {text}
                </a>
                {download && (
                    <Fragment>
                        <span className={styles.divide} />
                        <a href={download} target="_blank" rel="noopener noreferrer">
                            下载
                        </a>
                    </Fragment>
                )}
            </div>
        )
    }

    render() {
        const { align, globalSize, buttons, primary, secondary, contract } = this.props

        return (
            <div className={`${styles.container} ${styles[align]} ${styles[globalSize]}`}>
                {buttons.map(this.generateCustomButton)}
                {primary.map(this.generatePrimaryButton)}
                {secondary.map(this.generateSecondaryButton)}
                {contract.map(this.generateContract)}
            </div>
        )
    }
}

ButtonGroup.defaultProps = {
    align: 'right',
    globalWidth: '180px',
    globalSize: 'large',
    buttons: [],
    primary: [],
    secondary: [],
    contract: [],
}

ButtonGroup.propTypes = {
    align: PropTypes.string,
    globalWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    globalSize: PropTypes.string,
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.node.isRequired,
            type: PropTypes.string,
            onClick: PropTypes.func,
            disabled: PropTypes.bool,
            hide: PropTypes.bool,
        })
    ),
    primary: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.node.isRequired,
            onClick: PropTypes.func,
            disabled: PropTypes.bool,
            hide: PropTypes.bool,
        })
    ),
    secondary: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.node.isRequired,
            onClick: PropTypes.func,
            disabled: PropTypes.bool,
            hide: PropTypes.bool,
        })
    ),
    contract: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.node.isRequired,
            link: PropTypes.string,
            download: PropTypes.string,
            checkbox: PropTypes.object,
            hide: PropTypes.bool,
        })
    ),
}

export default ButtonGroup
