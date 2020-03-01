import React from 'react'
import styled from 'styled-components'
import { Typography } from 'antd'

const STitleNormal = styled(Typography.Title)`
    font-weight: 400!important;
`

export const Title = ({ level, bold, className, style, children }) => {
    return (
        bold
            ? <Typography.Title level={level} className={className} style={style}>{children}</Typography.Title>
            : <STitleNormal level={level} className={className} style={style}>{children}</STitleNormal>
    )
}
