import React from 'react'
import axios from 'axios';

// Rect Bootstrap
import { Row, Form, Button } from 'react-bootstrap';

export const UpdateUser = ({handleSubmit, handleUpdate}) => {

  const updateInfo = ()  => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    axios.put(`https://aya-myflix.herokuapp.com/users/${user}`,{}, {
    headers: { Authorization: `Bearer ${token}`},
    method: 'PUT'
  })
  .then(() => {
    alert('information has been updated')
  })
  .catch( e => {
    console.log(e)
  });
  }

  const deleteUser = ()=> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    axios.delete(`https://aya-myflix.herokuapp.com/users/${user}`,{}, {
    headers: { Authorization: `Bearer ${token}`},
    method: 'DELETE'
  })
  .then(() => {
    alert('User had been deleted')
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  })
  .catch( e => {
    console.log(e)
  });
  }

  return (
    <Form style={{ width: '30rem' }}>
      <h2>Want to change some info?</h2>
      <Form.Group className="mb-3 mt-3" controlId='formUsername'>
        <Form.Label>Username:</Form.Label>
        <Form.Control type='text' onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId='formPassword'>
        <Form.Label>*Password:</Form.Label>
        <Form.Control type='password' onChange={e => setEmail(e.target.value)}  minLength='8' />
      </Form.Group>

      <Form.Group className="mb-3" controlId='formEmail'>
        <Form.Label>Email:</Form.Label>
        <Form.Control type='email' onChange={e => setPassword(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-4" controlId='formBirthday'>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type='date' onChange={e => setBirthday(e.target.value)} />
      </Form.Group>

      <Button variant='danger' type='submit'  onClick={handleSubmit} >Update</Button>
    </Form>
  )
}
