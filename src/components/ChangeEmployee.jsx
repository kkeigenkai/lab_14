import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import InputMask from 'react-input-mask'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

export const ChangeEmployee = ({changeEmployee, show, toggleModal, id, oldName, oldSurname, oldEmails, oldPhone, oldStatus}) => {

  const [name, setName] = useState(oldName);
  const [surname, setSurname] = useState(oldSurname);
  const [emails, setEmails] = useState([...oldEmails]);
  const [phone, setPhone] = useState(oldPhone);
  const [status, setStatus] = useState(oldStatus);

  const changeEmails = (e, index) => {
    const newEmails = emails; 
    newEmails[index] = e.target.value; 
    setEmails([...newEmails]);
  }

  const deleteEmails = (index) => {
    setEmails(emails.filter((_, id) => {return id !== index}));
  }

  const onSuccess = () => {
    if (name !== '' && surname !== '' && !phone.includes('_')) {
      changeEmployee(id, name, surname, emails, status, phone)
    }
  }

  return (
    <Modal show={show} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Change employee information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Container>
        <Form className="mt-2">
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Name</Form.Label>
              <Form.Control required autoFocus={true} value={name} onChange={(e) => {setName(e.target.value)}} placeholder="Enter name" />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Surname</Form.Label>
              <Form.Control required value={surname} onChange={(e) => {setSurname(e.target.value)}} placeholder="Enter surname" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} >
              <Form.Label>Phone number</Form.Label>
              <InputMask
                required
                className={"form-control"}
                mask={"+7 (999) 999-99-99"}
                placeholder="+7 (800) 555-35-35"
                value={phone} 
                onChange={(e) => {setPhone(e.target.value)}}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md={12}>
              <Form.Label>Email</Form.Label>
              <br/>
              {
                emails.map((email, index) => {
                  return (
                    <Row className="mb-2" key={index}>
                      <Col md={11}>
                        <Form.Control
                            required
                            type={"email"}
                            placeholder="Enter email"
                            onChange={(e) => changeEmails(e, index)}
                            value={email}
                        />
                      </Col>

                      <Col md={{span: 0, offset: 0}}>
                        <Button onClick={() => deleteEmails(index)}>-</Button>
                      </Col>
                    </Row>
                  )
                })
              }
              <Button onClick={() => {setEmails([...emails, ''])}} >Add email</Button>
            </Form.Group>

          </Form.Row>

          <Form.Row>
            <Form.Group multiple={false} as={Col} md={4}>
              <Form.Label>Status</Form.Label>
              <Form.Control value={status} multiple={false} onChange={(e) => {setStatus(e.target.value)}} as="select">
                <option>Junior</option>
                <option>Middle</option>
                <option>Senior</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
        </Form>
      </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={toggleModal}>Cancel</Button>
        <Button variant="success" onClick={() => { onSuccess(id, name, surname, status, emails, phone); toggleModal() }}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}