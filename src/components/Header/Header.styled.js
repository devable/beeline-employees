import styled from 'styled-components'
import { Container } from 'components/Container'
import { Logo } from 'components/Logo'

export const SHeader = styled.header`
    position: relative;
    z-index: 500;
    box-shadow: 0 -2px 10px 0 var(--box-shadow); 
`

export const SContainer = styled(Container)`
    display: flex;
    line-height: 70px;
    align-items: center;
`

export const SLogo = styled(Logo)`
    width: 40px;
    height: 40px;
    margin-right: 10px;
`
