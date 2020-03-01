import React from 'react'
import { Container } from 'components/Container'
import { Helmet } from 'react-helmet-async'
import { PageTitle } from 'components/PageTitle'

export const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home page — Beeline</title>
            </Helmet>
            <PageTitle level={1}>Home page</PageTitle>
            <Container style={{ paddingTop: 30, paddingBottom: 30 }}>
                This is a demo React app for Beeline.
            </Container>
        </>
    )
}
