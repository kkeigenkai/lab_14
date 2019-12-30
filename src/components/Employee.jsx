import React, {useState} from 'react'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import {ChangeEmployee} from './ChangeEmployee'

export const Employee = ({employee, deleteEmployee, changeEmployee}) => {
  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    setModal(!modal)
  }
  // console.log(employee.emails)

  return (
    <>
      <tr>
        <td>{employee.id}</td>
        <td>{employee.name}</td>
        <td>{employee.surname}</td>
        <td>{employee.status}</td>
        <td>{employee.emails.map((email, index) => {
          return (
              <div key={index}>
                {email}
                <br/>
              </div>
          )
        })}
        </td>
        <td>{employee.phone}</td>
        <td className="text-center"><FontAwesomeIcon onClick={toggleModal} icon={faEdit} style={{ cursor: "pointer", color: "rgb(69, 122, 251)" }}></FontAwesomeIcon></td>
        <td className="text-center"><FontAwesomeIcon icon={faTrash} onClick={() => deleteEmployee(employee.id)} style={{ cursor: "pointer", color: "rgb(186, 56, 70)" }}></FontAwesomeIcon></td>
      </tr>
      <ChangeEmployee oldName={employee.name} oldSurname={employee.surname} oldStatus={employee.status} oldEmails={employee.emails} oldPhone={employee.phone} show={modal} toggleModal={toggleModal} id={employee.id} changeEmployee={changeEmployee} />
    </>
  )
}