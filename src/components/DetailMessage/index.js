import React, { Fragment } from 'react'
import { Card, Divider } from 'antd'
import PropTypes from 'prop-types'
import DescriptionList from '@/components/DescriptionList'

const { Description } = DescriptionList

const DetailMessage = ({ data }) => {
    return (
        <Card>
            {data.map((item, index) => (
                <Fragment key={index}>
                    <DescriptionList
                        size="large"
                        title={item.title}
                        key={index}
                        style={{ marginBottom: 32 }}
                    >
                        {item.detail.map((items, indexx) => (
                            <Description key={indexx} term={items.label}>
                                {items.msg}
                            </Description>
                        ))}
                    </DescriptionList>
                    {index !== data.length - 1 && (
                        <Divider key={index + 1} style={{ marginBottom: 32 }} />
                    )}
                </Fragment>
            ))}
        </Card>
    )
}

DetailMessage.defaultProps = {
    data: [],
}

DetailMessage.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            detail: PropTypes.arrayOf(
                PropTypes.shape({
                    msg: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
                    label: PropTypes.string,
                })
            ),
        })
    ),
}

export default DetailMessage
