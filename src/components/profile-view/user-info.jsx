import React from 'react'
// Rect Bootstrap
import { Row, Form, Button } from 'react-bootstrap';

export const UserInfo = ({ user, name, email, birthday }) => {

  return (
    <>
      <h4>My profile</h4>
      <p>User: {name}</p>
      <p>Email: {email}</p>
      <p>Birthday: {birthday}</p>
      <Button variant='outline-danger' type='submit'  onClick={deleteUser} >Deregister</Button>
    </>
  )
}


