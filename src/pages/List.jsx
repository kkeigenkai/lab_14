import React from 'react'
import Table from 'react-bootstrap/Table'
import {Employee} from '../components/Employee'

export const List = ({employees, deleteEmployee, changeEmployee}) => {
  return (
    <main>
      <h1 className="mt-5">List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>№</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Status</th>
            <th>Email</th>
            <th>Phone number</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            employees.map((employee) => {
              return (
                <Employee key={employee.id}
                  employee={employee}
                  deleteEmployee={deleteEmployee}
                  changeEmployee={changeEmployee}
                />
              )
            })
          }
        </tbody>
      </Table>
    </main>
  )
}