import React, {useState} from 'react'
import Table from 'react-bootstrap/Table'
import {Employee} from '../components/Employee'

export const List = ({employees, deleteEmployee, changeEmployee}) => {
  const [search, setSearch] = useState('');
  return (
    <main>
      <h1 className="mt-5">List</h1>
      <input placeholder={"Search"} className="form-control" value={search} onChange={e => {setSearch(e.target.value)}} />
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
            if (employee.name.toLowerCase().includes(search.toLocaleLowerCase()) || employee.surname.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || search === '') {
              return (
                <Employee key={employee.id}
                          employee={employee}
                          deleteEmployee={deleteEmployee}
                          changeEmployee={changeEmployee}
                />
              )
            }
          })
        }
        </tbody>
      </Table>
    </main>
  )
}