import React from 'react'
import { Modal, Button } from 'antd'
import { Title } from 'components/Title'
import { FormAddEmployee } from './FormAddEmployee'
import { FormConfirmEmployee } from './FormConfirmEmployee'

export const ModalEmployee = ({ newEmployee, setNewEmployee, employeeModal, actions }) => {
    return (
        <Modal
            title={<Title level={3} style={{ margin: 0 }}>{employeeModal.title}</Title>}
            visible={employeeModal.visible}
            onCancel={actions.handleCancelEmployeeModal}
            footer={employeeModal.step !== 2
                ? [<Button key="cancel" shape="round" size="large" onClick={actions.handleCancelEmployeeModal}>Cancel</Button>,
                (newEmployee.id
                    ? <Button key="complete" shape="round" size="large" onClick={actions.handleCompleteEmployeeModal}>Submit</Button>
                    : <Button key="next" shape="round" size="large" onClick={actions.handleNextEmployeeModal}>Save</Button>)]
                : [<Button key="prev" shape="round" size="large" onClick={actions.handlePrevEmployeeModal}>Edit</Button>,
                <Button key="complete" shape="round" size="large" onClick={actions.handleCompleteEmployeeModal}>Submit</Button>]}
        >
            {employeeModal.step !== 2
                ? <FormAddEmployee newEmployee={newEmployee} setNewEmployee={setNewEmployee} />
                : <FormConfirmEmployee newEmployee={newEmployee} />}
        </Modal>
    )
}
