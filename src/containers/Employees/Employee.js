import React from 'react'
import { Avatar, List, Typography, Button } from 'antd';
import { UserOutlined, DeleteOutlined, EditOutlined, CalendarOutlined, PhoneOutlined } from '@ant-design/icons';
import phoneformat from 'phoneformat.js'
import styled from 'styled-components'

const { Item } = List
const { Meta } = Item
const { Text } = Typography

const SText = styled(Text)`
    font-size: 16px;
`

export const Employee = ({ employee, actions }) => {
    return (
        <Item
            actions={[
                <Button onClick={() => actions.handleClickEditEmployee(employee.id)} type='rounded' shape='circle'><EditOutlined /></Button>,
                <Button onClick={() => actions.handleClickDeleteEmployee(employee.id)} type='rounded' shape='circle'><DeleteOutlined /></Button>
            ]}
        >
            <Meta
                avatar={<Avatar size={64} icon={<UserOutlined />} />}
                title={
                    <div>
                        <SText copyable={{
                            text: `${employee.firstname} ${employee.lastname}, ${phoneformat.formatInternational(employee.country, employee.phone)}, worked ${employee.dateStart} - ${employee.dateStart}`
                        }}>
                            <span style={{ fontSize: 18 }}>{employee.firstname} {employee.lastname}</span>
                        </SText>
                    </div>
                }
                description={(
                    <>
                        <div><PhoneOutlined /> <a href={`tel:${phoneformat.formatE164(employee.country, employee.phone)}`}>{phoneformat.formatInternational(employee.country, employee.phone)}</a></div>
                        <div><CalendarOutlined /> {employee.dateStart} - {employee.dateEnd}</div>
                    </>
                )}
            />
        </Item>
    )
}
