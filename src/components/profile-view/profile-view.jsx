
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
    const user = localStorage.getItem('user');
    axios
      .get(`https://aya-myflix.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
        method: 'GET'
      })
      .then(response => {
        console.log(response)
        this.setState({
          Username: response.data.Username,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          favoriteMovies: response.data.FavoriteMovies,
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

  handleUpdate(e) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    console.log(`User: ${user} Token: ${token}`)
    e.preventDefault();
    axios
      .put(`https://aya-myflix.herokuapp.com/users/${user}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        method: 'PUT',
        data: {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
      })
      .then(() => {
        alert('Saved Changes. Please Re-login');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/', '_self');
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

  handleDeleteUser() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios
      .delete(`https://aya-myflix.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
        method: 'DELETE'
      })
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('Your account has been deleted.');
        window.open(`/register`, '_self');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { Username, Email, Birthday, favoriteMovies} = this.state;
    const { movies } = this.props;
    console.log(movies);
    return (
      <Container>
        <Row>
{/* User info */}
          <Col xs={12} sm={4}>
            <Card>
              <Card.Body>
                <Card.Title>My Profile</Card.Title>
              </Card.Body>
              <ListGroup className='list-group-flush'>
                <ListGroupItem>Username: {Username} </ListGroupItem>
                <ListGroupItem>Email: {Email} </ListGroupItem>
                <ListGroupItem>Birthday: {Birthday} </ListGroupItem>
                <ListGroupItem>
                  <Button
                  variant='outline-secondary'
                  onClick={() => handleDeleteUser()}
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

                  <Form>
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
                    <Button variant='danger' type='submit' className='mt-4' onClick={(e) => this.handleUpdate(e)}>
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