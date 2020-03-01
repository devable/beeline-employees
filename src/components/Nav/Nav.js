import React from 'react'
import { SNav, SLink } from './Nav.styled'

export const Nav = () => {
    return (
        <SNav>
            <SLink to="/" exact>Home</SLink>
            <SLink to="/employees" exact>Employees</SLink>
        </SNav>
    )
}
