import React, { useState } from 'react'
import { Container } from 'components/Container'
import { Helmet } from 'react-helmet-async'
import { PageTitle } from 'components/PageTitle'
import { ModalEmployee } from './ModalEmployee'
import { Employee } from './Employee'
import { Button, List, notification } from 'antd'
import { employees as _employees, initEmployee, initEmployeeModal } from '../../store/employees.store'
import { notNullObjectValues } from 'utils/validations.utils'
import { dateFormat } from 'store/constants.store'
import phoneformat from 'phoneformat.js'
import moment from 'moment'

export const Employees = () => {
    const [employees, setEmployees] = useState(_employees)
    const [newEmployee, setNewEmployee] = useState(initEmployee)
    const [employeeModal, setEmployeeModal] = useState(initEmployeeModal)

    const actions = {
        handleClickEmployeeModal: () => {
            setEmployeeModal({
                ...employeeModal,
                visible: true
            })
        },
        handleCancelEmployeeModal: () => {
            setEmployeeModal(initEmployeeModal)
            setNewEmployee(initEmployee)
        },
        handlePrevEmployeeModal: () => {
            setEmployeeModal({
                ...initEmployeeModal,
                visible: true
            })
        },
        handleNextEmployeeModal: () => {
            if (notNullObjectValues.try(newEmployee)) {
                setEmployeeModal({
                    ...employeeModal,
                    title: 'Are you sure?',
                    step: 2
                })
            } else {
                notification['error']({
                    message: notNullObjectValues.errorMessage
                });
            }
        },
        handleCompleteEmployeeModal: () => {
            const country = phoneformat.countryForE164Number(newEmployee.phone) || 'RU'
            const _employee = {
                phone: phoneformat.formatE164(country, newEmployee.phone),
                dateStart: newEmployee.dateStart.format(dateFormat),
                dateEnd: newEmployee.dateEnd.format(dateFormat),
                country
            }

            if (newEmployee.id) {
                setEmployees(Object.assign([...employees], { [employees.findIndex(e => e.id === newEmployee.id)]: { ...newEmployee, ..._employee } }))
            } else {
                setEmployees([...employees, { ...newEmployee, ..._employee, id: Math.max.apply(Math, employees.map(e => e.id))+1 }])
            }

            setNewEmployee(initEmployee)
            setEmployeeModal(initEmployeeModal)
            notification['success']({
                message: 'Success!',
                description: newEmployee.id ? 'Employee updated.' : 'Employee added.'
            });
        },
        handleClickEditEmployee: id => {
            const _employee = employees[employees.findIndex(e => e.id === id)]
            setNewEmployee({
                ..._employee,
                phone: _employee.country === 'RU'
                    ? phoneformat.cleanPhone(phoneformat.formatLocal(_employee.country, _employee.phone))
                    : phoneformat.cleanPhone(phoneformat.formatInternational(_employee.country, _employee.phone)),
                dateStart: moment(_employee.dateStart, 'DD-MM-YYYY'),
                dateEnd: moment(_employee.dateEnd, 'DD-MM-YYYY')
            })
            setEmployeeModal({
                ...initEmployeeModal,
                visible: true,
                title: 'Edit employee'
            })
        },
        handleClickDeleteEmployee: id => {
            setEmployees(employees.filter(e => e.id !== id))
        }
    }

    return (
        <>
            <Helmet>
                <title>Employees — Beeline</title>
            </Helmet>
            <PageTitle
                level={1}
                button={
                    <Button shape="round" size="large" onClick={actions.handleClickEmployeeModal}>Add</Button>
                }
            >
                List of employees
            </PageTitle>
            <Container style={{ paddingTop: 30, paddingBottom: 30 }}>
                {employees.length > 0 ? (
                    <List
                        itemLayout="horizontal"
                        dataSource={employees}
                        renderItem={(employee) => <Employee actions={actions} employee={employee} />}
                    />
                ) : 'Sorry, the list is empty.'}
            </Container>
            <ModalEmployee
                newEmployee={newEmployee}
                setNewEmployee={setNewEmployee}
                employeeModal={employeeModal}
                actions={actions}
            />
        </>
    )
}
