import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SLogo = styled.span`
    display: inline-block;
    width: 160px;
    height: 160px;
    background: url('/logo.png') no-repeat center / contain;
`

export const Logo = ({ className, to }) => {
    return (
        to
            ? <SLogo as={Link} to={to} className={className} />
            : <SLogo className={className} />
    )
}
