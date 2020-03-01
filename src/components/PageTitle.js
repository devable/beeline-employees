import React from 'react'
import styled from 'styled-components'
import { Container } from 'components/Container'
import { Title } from 'components/Title'

const SPageTitle = styled.div`
    background: var(--secondary);
`

const STitle = styled(Title)`
    margin: 0!important;
`

const SContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 50px;
    padding-bottom: 30px;
`

export const PageTitle = ({ children, level, button }) => {
    return (
        <SPageTitle>
            <SContainer>
                <STitle level={level}>{children}</STitle>
                {button}
            </SContainer>
        </SPageTitle>
    )
}
