import React from 'react'
import { SHeader, SContainer, SLogo } from './Header.styled'
import { Nav } from 'components/Nav'

export const Header = ({ children, className }) => {
    return (
        <SHeader className={className}>
            <SContainer as="div">
                <SLogo to='/' />
                <Nav />
                {children}
            </SContainer>
        </SHeader>
    )
}
