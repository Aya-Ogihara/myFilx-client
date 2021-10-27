import React from 'react';
import { Link } from 'react-router-dom';
// Rect Bootstrap
import { Container, Navbar, Nav, Button} from 'react-bootstrap';

export const Navbar = () => {

  onLoggedOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">myFlix</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/profile">myProfile</Nav.Link>
          <Button variant='outline-danger' type='submit' onClick={() => onLoggedOut() } > Logout</Button>
        </Nav>
      </Container>
    </Navbar>
  )
}
