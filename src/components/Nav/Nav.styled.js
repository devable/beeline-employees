import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const SNav = styled.nav`
    display: flex;
    align-items: center;
    margin-left: 50px;
    color: var(--text-default);
`

export const SLink = styled(NavLink)`
    display: inline-block;
    padding: 0 20px;
    font: 17px/21px 'PT Serif', serif;
    line-height: 70px;
    text-decoration: none;
    transition: .25s background ease-in;

    &:hover:not(.active) {
        color: var(--text-default);
        background: var(--accent);
        text-decoration: none;
    }

    &.active {
        color: var(--text-accent);
        text-decoration: none;
    }
`

