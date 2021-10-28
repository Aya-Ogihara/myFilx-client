import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// import components
import { Navbar } from '../navbar/navbar';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
// Rect Bootstrap
import { Row, Col } from 'react-bootstrap';

// Create MainView component
export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      // Initial state is set to null
      movies: [],
      user: null,
    }
  }

  getMovies(token) {
    axios.get('https://aya-myflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log(response)
      this.setState({
        movies: response.data
      });
    })
    .catch( e => {
      console.log(e)
    });
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken)
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }


  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <Navbar />
        <Row className='justify-content-md-center main-view mt-5'>

          {/* Movies -- Top page*/}
          <Route exact path='/' render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className='main-view' />
            return movies.map(m => (
              <>
              <Col sm={12} md={6} lg={4} xl={3} className='mb-5'key={m._id} >
                <MovieCard  movie={m} />
              </Col>
              </>
            ))
          }} />

          {/* Register view */}
          <Route path='/register' render={() => {
            if (user) return <Redirect to='/' />
            return <Col>
            <RegistrationView />
            </Col>
          }} />

          {/* Single movie */}
          <Route path='/movies/:movieId' render={({ match, history }) => {
            return <Col md={12} lg={8}>
            <MovieView movie={movies.find(m=> m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
          </Col>
          }} />

          {/* Director view */}
          <Route path='/directors/:name' render={({ match, history} ) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col> 
            if (movies.length === 0) return <div className='main-view' />
            return <Col md={12} lg={8}>
              <DirectorView director={movies.find(m=> m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/* Genre view */}
          <Route path='/genres/:name' render={({ match, history} ) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col> 
            if (movies.length === 0) return <div className='main-view' />
            return <Col md={12} lg={8}>
              <GenreView genre={movies.find(m=> m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/* User profile */}
          <Route path='/profile' render={(history) => {
            if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col> 
            if (movies.length === 0) return <div className='main-view' />
            return <ProfileView movies={movies} />
            }} />
        </Row>
      </Router>
    );
  }
}