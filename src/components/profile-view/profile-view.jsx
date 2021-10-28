
import React from 'react';
import axios from 'axios';
// Rect Bootstrap
import { Form, Button, Row, Col, Card, CardGroup, Container, ListGroup, ListGroupItem } from 'react-bootstrap';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    console.log(`User: ${username} Token: ${token}`)
    axios
      .get(`'https://aya-myflix.herokuapp.com/users/${username}`,{
        headers: { Authorization: `Bearer ${token}` },
        method: 'GET'
      })
      .then((response) => {
        console.log(response)
        this.setState({
          Username: response.data.Username,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  removeFavorite() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios
      .delete(
        `https://aya-myflix.herokuapp.com/users/${user}/movies/${this.props.movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          method: 'DELETE'
        }
      )
      .then(() => {
        alert('Movie was removed');
        this.componentDidMount();
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleUpdate(e, username, password, email, birthday) {
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }
    e.preventDefault();

    axios
      .put(`https://aya-myflix.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          Name: newName ? newName : this.state.Name,
          Username: newUsername ? newUsername : this.state.Username,
          Password: newPassword ? newPassword : this.state.Password,
          Email: newEmail ? newEmail : this.state.Email,
          Birthday: newBirthday ? newBirthday : this.state.Birthday,
        },
      })
      .then((response) => {
        alert('Saved Changes');
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem('user', this.state.Username);
        window.open(`/users/${username}`, '_self');
      })
      .catch(e => {
        console.log(e);
      });
  }
  setName(input) {
    this.Name = input;
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }

  handleDeleteUser(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios
      .delete(`https://aya-myflix.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('Your account has been deleted.');
        window.open(`/`, '_self');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { favoriteMovies, validated } = this.state;
    const { Username, Email, Password, Birthday } = this.setState;
    const { movies } = this.props;

    return (
      <Container>
        <Row>
{/* User info */}
          <Col xs={12} sm={4}>
            <Card>
              <Card.Body>
                <Card.Title>Profile Info</Card.Title>
              </Card.Body>
              <ListGroup className='list-group-flush'>
                <ListGroupItem>Username: {Username} </ListGroupItem>
                <ListGroupItem>Password: {Password} </ListGroupItem>
                <ListGroupItem>Email: {Email} </ListGroupItem>
                <ListGroupItem>Birthday: {Birthday} </ListGroupItem>
                <ListGroupItem>
                  <Button
                  variant='outline-secondary'
                  onClick={() => handleDeleteUser(e, user)}
                  >Delete Account</Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>

{/* Update form */}

          <Col md={8}>
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title>Update</Card.Title>

                  <Form
                    noValidate
                    validated={validated}
                    className='update-form'
                    onSubmit={(e) =>
                      this.handleUpdate(
                        e,
                        this.Name,
                        this.Username,
                        this.Password,
                        this.Email,
                        this.Birthday
                      )
                    }
                  >
                    <Form.Group controlId='formUsername'>
                      <Form.Label>Username:</Form.Label>
                      <Form.Control
                        type='text'
                        onChange={(e) =>
                          this.setUsername(e.target.value)
                        }
                        required
                        placeholder='Username'
                      />
                    </Form.Group>

                    <Form.Group controlId='formPassword'>
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type='password'
                        onChange={(e) =>
                          this.setPassword(e.target.value)
                        }
                        required
                        minLength='8'
                        placeholder='Change your password'
                      />
                    </Form.Group>

                    <Form.Group controlId='formEmail'>
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        type='email'
                        onChange={(e) =>
                          this.setEmail(e.target.value)
                        }
                        required
                        placeholder='Change your email'
                      />
                    </Form.Group>

                    <Form.Group controlId='formBirthday'>
                      <Form.Label>Birthday:</Form.Label>
                      <Form.Control
                        type='date'
                        onChange={(e) =>
                          this.setBirthday(e.target.value)
                        }
                      />
                    </Form.Group>
                    <Button variant='danger' type='submit' className='mt-4'>
                      Update
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>

{/* Favorite movie */}
        <Card className='mt-4'>
          <Row>
            <Col xs={12} className='p-4'>
              <h4>Favorite Movies</h4>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card.Body>
                {favoriteMovies.length === 0 && (
                  <div className='text-center'>
                    You have no favorite movies.
                  </div>
                )}
                <Row className='favorites-movies '>
                  {favoriteMovies.length > 0 &&
                    movies.map((movie) => {
                      if (
                        movie._id ===
                        favoriteMovies.find((fav) => fav === movie._id)
                      ) {
                        return (
                          <CardDeck className='movie-card-deck'>
                            <Card
                              className='favorites-item card-content'
                              style={{ width: '16rem' }}
                              key={movie._id}
                            >
                              <Card.Img
                                style={{ width: '18rem' }}
                                className='movieCard'
                                variant='top'
                                src={movie.ImageURL}
                              />
                              <Card.Body>
                                <Card.Title className='movie-card-title'>
                                  {movie.Title}
                                </Card.Title>
                                <Button
                                  size='sm'
                                  className='profile-button remove-favorite'
                                  variant='outline-danger'
                                  value={movie._id}
                                  onClick={(e) =>
                                    this.removeFavorite()
                                  }
                                >
                                  Remove
                                </Button>
                              </Card.Body>
                            </Card>
                          </CardDeck>
                        );
                      }
                    })}
                </Row>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>
    );
  }
}