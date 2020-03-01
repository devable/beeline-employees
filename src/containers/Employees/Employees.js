import React, { useState, useEffect } from 'react'
import { Container } from 'components/Container'
import { Helmet } from 'react-helmet-async'
import { PageTitle } from 'components/PageTitle'
import { Employee } from './Employee'
import { Button, List, Modal, notification } from 'antd'
import { employees as _employees, initEmployee, initEmployeeModal } from '../../store/employees.store'
import { Title } from 'components/Title'
import { FormAddEmployee } from 'containers/Employees'
import { notNullObjectValues } from 'utils/validations.utils'
import { dateFormat } from 'store/constants.store'
import phoneformat from 'phoneformat.js'
import moment from 'moment'

export const Employees = () => {
    const [employees, setEmployees] = useState(_employees)
    const [newEmployee, setNewEmployee] = useState(initEmployee)

    const [employeeModal, setEmployeeModal] = useState(initEmployeeModal)

    useEffect(() => {
        console.log(employees)
    }, [employees])

    const handleClickEmployeeModal = () => {
        setEmployeeModal({
            ...employeeModal,
            visible: true
        })
    }

    const handleCancelEmployeeModal = () => {
        setEmployeeModal(initEmployeeModal)
        setNewEmployee(initEmployee)
    }

    const handlePrevEmployeeModal = () => {
        setEmployeeModal({
            ...initEmployeeModal,
            visible: true
        })
    }

    const handleNextEmployeeModal = () => {
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
    }

    const handleCompleteEmployeeModal = () => {
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
    }

    const handleClickEditEmployee = id => {
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
    }

    const handleClickDeleteEmployee = id => {
        setEmployees(employees.filter(e => e.id !== id))
    }

    return (
        <>
            <Helmet>
                <title>Employees — Beeline</title>
            </Helmet>
            <PageTitle
                level={1}
                button={
                    <Button shape="round" size="large" onClick={handleClickEmployeeModal}>Add</Button>
                }
            >
                List of employees
            </PageTitle>
            <Container style={{ paddingTop: 30, paddingBottom: 30 }}>
                {employees.length > 0 ? (
                    <List
                        itemLayout="horizontal"
                        dataSource={employees}
                        renderItem={(employee) => <Employee actions={{ handleClickEditEmployee, handleClickDeleteEmployee }} employee={employee} />}
                    />
                ) : 'Sorry, the list is empty.'}
            </Container>
            <Modal
                title={<Title level={3} style={{ margin: 0 }}>{employeeModal.title}</Title>}
                visible={employeeModal.visible}
                onCancel={handleCancelEmployeeModal}
                footer={employeeModal.step !== 2
                    ? [<Button key="cancel" shape="round" size="large" onClick={handleCancelEmployeeModal}>Cancel</Button>,
                        (newEmployee.id
                            ? <Button key="complete" shape="round" size="large" onClick={handleCompleteEmployeeModal}>Submit</Button>
                            : <Button key="next" shape="round" size="large" onClick={handleNextEmployeeModal}>Save</Button>)]
                    : [<Button key="prev" shape="round" size="large" onClick={handlePrevEmployeeModal}>Edit</Button>,
                        <Button key="complete" shape="round" size="large" onClick={handleCompleteEmployeeModal}>Submit</Button>]}
            >
                {employeeModal.step !== 2
                    ? <FormAddEmployee newEmployee={newEmployee} setNewEmployee={setNewEmployee} />
                    : (
                        <div>{newEmployee.firstname} {newEmployee.lastname}, {newEmployee.phone},
                                worked {newEmployee.dateStart.format(dateFormat)} - {newEmployee.dateEnd.format(dateFormat)}</div>
                    )}
            </Modal>
        </>
    )
}
