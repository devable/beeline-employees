import React, { useState } from 'react'
import styled from 'styled-components'
import { Input, DatePicker, Row, Col, Alert } from 'antd'
import { isValidCyrLetters, isValidNumber } from 'utils/validations.utils'
import { dateFormat } from 'store/constants.store'
import { initErrors } from 'store/employees.store'
import phoneFormat from 'phoneformat.js'

const SInputGroup = styled(Input.Group)`
    margin-top: 20px;

    &:first-child {
        margin-top: 0;
    }
`

const SDatePicker = styled(DatePicker)`
    width: 100%;
`

export const FormAddEmployee = ({ newEmployee, setNewEmployee }) => {
    const [errors, setErrors] = useState(initErrors)

    const handleChangeFirstName = ({ target }) => {
        if (isValidCyrLetters.try(target.value)) {
            setNewEmployee({ ...newEmployee, firstname: target.value })
            setErrors(initErrors)
        } else {
            setErrors({ ...initErrors, firstname: isValidCyrLetters.errorMessage })
        }
    }
    const handleChangeLastName = ({ target }) => {
        if (isValidCyrLetters.try(target.value)) {
            setNewEmployee({ ...newEmployee, lastname: target.value })
            setErrors(initErrors)
        } else {
            setErrors({ ...initErrors, lastname: isValidCyrLetters.errorMessage })
        }
    }
    const handleChangePhone = ({ target }) => {
        if (isValidNumber.try(target.value)) {
            setNewEmployee({ ...newEmployee, phone: phoneFormat.formatE164(phoneFormat.countryForE164Number(target.value), target.value) })
            setErrors(initErrors)
        } else {
            setErrors({ ...initErrors, phone: isValidNumber.errorMessage })
        }
    }

    const handleChangeDateStart = date => setNewEmployee({ ...newEmployee, dateStart: date })
    const handleChangeDateEnd = date => setNewEmployee({ ...newEmployee, dateEnd: date })

    const disabledDateOfStart = current => {
        if (newEmployee.dateEnd) {
            return current.isAfter(newEmployee.dateEnd)
        }
    }
    const disabledDateOfEnd = current => {
        if (newEmployee.dateStart) {
            return current.isBefore(newEmployee.dateStart.endOf('day'))
        }
    }

    return (
        <div>
            <SInputGroup>
                <Row gutter={20}>
                    <Col span={12}><Input placeholder='First name' value={newEmployee.firstname} onChange={handleChangeFirstName} /></Col>
                    <Col span={12}><Input placeholder='Last name' value={newEmployee.lastname} onChange={handleChangeLastName} /></Col>
                </Row>
            </SInputGroup>
            <SInputGroup>
                <Input options={{ phone: true }} placeholder='Phone number' value={newEmployee.phone} onChange={handleChangePhone} />
            </SInputGroup>
            <SInputGroup>
                <Row gutter={20}>
                    <Col span={12}>
                        <SDatePicker
                            placeholder='Start date'
                            value={newEmployee.dateStart}
                            onChange={handleChangeDateStart}
                            format={dateFormat}
                            disabledDate={disabledDateOfStart}
                        />
                    </Col>
                    <Col span={12}>
                        <SDatePicker
                            placeholder='End date'
                            value={newEmployee.dateEnd}
                            onChange={handleChangeDateEnd}
                            format={dateFormat}
                            disabledDate={disabledDateOfEnd}
                        />
                    </Col>
                </Row>
            </SInputGroup>
            {(console.log(errors))}
            {errors.firstname || errors.lastname || errors.phone ? (
                <div style={{ marginTop: 20 }}>
                    {errors.firstname ? <Alert message={errors.firstname} type="error" /> : ''}
                    {errors.lastname ? <Alert message={errors.lastname} type="error" /> : ''}
                    {errors.phone ? <Alert message={errors.phone} type="error" /> : ''}
                </div>
            ) : ''}
        </div>
    )
}
