import React from 'react'
import axios from 'axios';

// Rect Bootstrap
import { Row, Form, Button } from 'react-bootstrap';

export const UpdateUser = ({handleSubmit, handleUpdate}) => {

  return (
    <Form style={{ width: '30rem' }}>
      <h2>Want to change some info?</h2>
      <Form.Group className="mb-3 mt-3" controlId='formUsername'>
        <Form.Label>Username:</Form.Label>
        <Form.Control type='text' onChange={e => handleUpdate(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId='formPassword'>
        <Form.Label>*Password:</Form.Label>
        <Form.Control type='password' onChange={e => handleUpdate(e.target.value)}  minLength='8' />
      </Form.Group>

      <Form.Group className="mb-3" controlId='formEmail'>
        <Form.Label>Email:</Form.Label>
        <Form.Control type='email' onChange={e => handleUpdate(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-4" controlId='formBirthday'>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type='date' onChange={e => handleUpdate(e.target.value)} />
      </Form.Group>

      <Button variant='danger' type='submit'  onClick={e => handleSubmit(e)} >Update</Button>
    </Form>
  )
}
