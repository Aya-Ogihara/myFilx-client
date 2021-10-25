import React from 'react';
import axios from 'axios';

// import components
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
// Rect Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Create MainView component
export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      // Initial state is set to null
      movies: [],
      selectedMovie: null,
      user: null,
      register: null
    }
  }

  componentDidMount() {
    axios.get('https://aya-myflix.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user 
    });
  }

  onRegistered(register) {
    this.setState({
      register 
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!register) return <RegistrationView onRegistered={register => this.onRegistered(register)} />;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (movies.length === 0) return <div className='main-view' />;

    return (
      <Row className='justify-content-md-center main-view'>
        {selectedMovie
          ? ( 
            <Col md={10} lg={8}>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            </Col>
            )
          : movies.map(movie => (
            <Col sm={12} md={6} lg={4} xl={3} className='mb-5'>
              <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie)}} />
            </Col>
          ))         
        }
      </Row>
    );
  }
}