
import React from 'react';
import axios from 'axios';
// Rect Bootstrap
import { Button, Row, Col, Card, Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import { UpdateView } from './update-view';

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
        this.setState({
          username: response.data.Username,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  removeFavorite(id) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios
      .delete(
        `https://aya-myflix.herokuapp.com/users/${user}/movies/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          method: 'DELETE'
        },
      )
      .then(() => {
        alert('The movie was removed');
        this.componentDidMount() 
      })
      .catch(e => {
        console.log(e);
      });
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
    const { username, email, birthday, favoriteMovies } = this.state;
    const { movies } = this.props;
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
                <ListGroupItem>Username: {username} </ListGroupItem>
                <ListGroupItem>Email: {email} </ListGroupItem>
                <ListGroupItem>Birthday: {birthday} </ListGroupItem>
                <ListGroupItem>
                  <Button
                  variant='outline-secondary'
                  onClick={() => this.handleDeleteUser()}
                  >Delete Account</Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>

{/* Update form */}
          
          <UpdateView />
        </Row>

{/* Favorite movie */}
        <Card className='mt-4'>
          <Row>
            <Col xs={12} className='p-4'>
              <h4 style={{textAlign: 'center'}}>Favorite Movies</h4>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card.Body>
                {favoriteMovies.length === 0 && (
                  <div style={{textAlign: 'center'}}>
                    You have no favorite movies.
                  </div>
                )}
                <Row className='favorites-movies justify-content-md-center'>
                  {favoriteMovies.length > 0 &&
                    movies.map(movie => {
                      if (
                        movie._id ===
                        favoriteMovies.find(fav => fav === movie._id)
                      ) {
                        return (
                            <Card
                              className='favorites-item card-content'
                              style={{ width: '18rem' }}
                              key={movie._id}
                            >
                              <Card.Img
                                className='movieCard'
                                variant='top'
                                src={movie.ImagePath}
                                crossOrigin='anonymous'
                                alt={movie.Title}
                              />
                              <Card.Body>
                                <Card.Title className='movie-card-title'>
                                  {movie.Title}
                                </Card.Title>
                                <Button
                                  className='profile-button remove-favorite'
                                  variant='outline-danger'
                                  value={movie._id}
                                  onClick={() => this.removeFavorite(movie._id)}
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