import React from 'react'
import { dateFormat } from 'store/constants.store'

export const FormConfirmEmployee = ({ newEmployee }) => {
    return (
        <div>
            {newEmployee.firstname} {newEmployee.lastname}, {newEmployee.phone},
                worked {newEmployee.dateStart.format(dateFormat)} - {newEmployee.dateEnd.format(dateFormat)}
        </div>
    )
}