import React, { useState } from 'react';
import propTypes from 'prop-types';
// Rect Bootstrap
import Row from 'react-bootstrap/Row';
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
    <Row className='login-form justify-content-md-center mt-5' >
      <h1 style={{textAlign: 'center'}}> &#127916; myFlix Login Page &#127909;</h1>
      <Form style={{ width: '30rem' }}>
        <Form.Group className='mb-3 mt-3' controlId='formUsername'>
          <Form.Label>*Username:</Form.Label>
          <Form.Control type='text' onChange={e => setUsername(e.target.value)}  placeholder='Please enter your username' required />
        </Form.Group>

        <Form.Group className='mb-4' controlId='formPassword'>
          <Form.Label>*Password:</Form.Label>
          <Form.Control type='password' onChange={e => setPassword(e.target.value)} placeholder='Please enter your password' required />
        </Form.Group>

        <Button variant='danger' type='submit'  onClick={handleSubmit} >
          Login
        </Button>
      </Form>
    </Row>
  )
}

LoginView.propTypes = {
  user: propTypes.shape({
    username: propTypes.string,
    password: propTypes.string,
  }).isRequired,
  onLoggedIn: propTypes.func.isRequired
};