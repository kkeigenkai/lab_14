import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import {BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import {List} from './pages/List'
import {Add} from './pages/Add'
import axios from 'axios';

export const App = () => {
  const [employees, setEmployees] = useState([{id: 0,
    name: '',
    surname: '',
    status: '',
    emails: [
      ''
    ],
    phone: ''}]);
  
  useEffect(() => {
    async function fetchData() {
      let result = await axios.get('http://localhost:3000/employees');
      setEmployees(result.data);
      }
    fetchData()
  }, [])

  const addEmployee = (name, surname, emails, phone, status) => {
    const newEmployee = {
      id: employees.length === 0 ? 1 : employees[employees.length - 1].id + 1,
      name: name,
      surname: surname,
      status: status,
      emails: [...emails],
      phone: phone
    }

    setEmployees([...employees, newEmployee]);
    axios.post('http://localhost:3000/employees/', newEmployee);
  }
  
  

  const deleteEmployee = (id) => {
    setEmployees([...employees.filter((employee) => {return employee.id !== id})])
    axios.delete(`http://localhost:3000/employees/${id}`);
  }

  const changeEmployee = (id, name, surname, emails, phone, status) => {
    setEmployees(employees.map(employee => {
      if (employee.id === id) {
        employee.name = name;
        employee.surname = surname;
        employee.status = status;
        employee.emails = [...emails];
        employee.phone = phone;
      }

      return employee
    }))
    axios.put(`http://localhost:3000/employees/${id}`, {
      id,
      name,
      surname,
      status,
      emails,
      phone
    })
  }

  return (
    <Container className="pt-3">
      <BrowserRouter>
        <Link to="/" className="mr-2">List</Link>
        <Link to="/add">Add Employee</Link>
        <Switch>
          <Route path="/add">
            <Add addEmployee={addEmployee} />
          </Route>
          <Route path="/">
            <List employees={employees} changeEmployee={changeEmployee} deleteEmployee={deleteEmployee} />
          </Route>
        </Switch>
      </BrowserRouter>
    </Container>
  )
}