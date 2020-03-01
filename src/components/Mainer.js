import React from 'react'

export const Mainer = ({ className, children }) => {
    return (
        <section className={className}>
            {children}
        </section>
    )
}
