import React, { useState } from 'react';
import propTypes from 'prop-types';
// Rect Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId='formUsername'>
        <Form.Label>*Username:</Form.Label>
        <Form.Control type='text' onChange={e => setUsername(e.target.value)}  placeholder='Please enter your username' required />
      </Form.Group>

      <Form.Group className="mb-3" controlId='formPassword'>
        <Form.Label>*Password:</Form.Label>
        <Form.Control type='password' onChange={e => setPassword(e.target.value)} placeholder='Please enter your password' required />
      </Form.Group>

      <Button variant='danger' type='submit'  onClick={handleSubmit} >
        Login
      </Button>
    </Form>
  )
}

LoginView.propTypes = {
  user: propTypes.shape({
    username: propTypes.string,
    password: propTypes.string,
  }).isRequired,
  onLoggedIn: propTypes.func.isRequired
};