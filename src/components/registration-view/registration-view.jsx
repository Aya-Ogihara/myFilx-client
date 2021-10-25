import React, { useState } from 'react';
import propTypes from 'prop-types';
// Rect Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    /* then call props.onRegistered(username) */
    props.onRegistered(username);
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId='formUsername'>
        <Form.Label>*Username:</Form.Label>
        <Form.Control type='text' onChange={e => setUsername(e.target.value)}  placeholder='Please set your username' required />
      </Form.Group>

      <Form.Group className="mb-3" controlId='formPassword'>
        <Form.Label>*Password:</Form.Label>
        <Form.Control type='password' onChange={e => setEmail(e.target.value)} placeholder='Please set your password' required />
      </Form.Group>

      <Form.Group className="mb-3" controlId='formEmail'>
        <Form.Label>*Email:</Form.Label>
        <Form.Control type='email' onChange={e => setPassword(e.target.value)} placeholder='example@mail.com' required />
      </Form.Group>

      <Form.Group className="mb-3" controlId='formBirthday'>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type='date' onChange={e => setBirthday(e.target.value)} />
      </Form.Group>

      <Button variant='danger' type='submit'  onClick={handleSubmit} >
        Register
      </Button>
    </Form>
  )
}

RegistrationView.propTypes = {
  user: propTypes.shape({
    username: propTypes.string.isRequired,
    password: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
    birthday: propTypes.string
  }),
  onRegistered: propTypes.func.isRequired
};