import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { setMovies } from '../../actions/actions';;


// import components
import MoviesList from '../movies-list/movies-list'
import { HeaderSection } from '../header-section/header-section';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
// Rect Bootstrap
import { Row, Col } from 'react-bootstrap';

// Create MainView component
class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      // Initial state is set to null
      //movies: [],
      user: null,
    }
  }

  getMovies(token) {
    axios.get('https://aya-myflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log(response)
      this.props.setMovies(response.data);
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
    const { movies } = this.props;
    const { user } = this.state;

    return (
      <Router>
        <HeaderSection />
        <Row className='justify-content-md-center main-view mt-5'>

          {/* Movies -- Top page*/}
          <Route exact path='/' render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className='main-view' />
            return <MoviesList  movies={movies} />
          }} />

          {/* Register view */}
          <Route path='/register' render={() => {
            if (user) return <Redirect to='/' />
            return <Col>
            <RegistrationView onLoggedIn={user => this.onLoggedIn(user)}/>
            </Col>
          }} />

          {/* Single movie */}
          <Route path='/movies/:movieId' render={({ match, history }) => {
            return <Col md={12} lg={8}>
            <MovieView movie={movies.find(movie => movie._id === match.params.movieId)} onBackClick={() => history.goBack()} />
          </Col>
          }} />

          {/* Director view */}
          <Route path='/directors/:name' render={({ match, history} ) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col> 
            if (movies.length === 0) return <div className='main-view' />
            return <Col md={12} lg={8}>
              <DirectorView director={movies.find(movie => movie.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/* Genre view */}
          <Route path='/genres/:name' render={({ match, history} ) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col> 
            if (movies.length === 0) return <div className='main-view' />
            return <Col md={12} lg={8}>
              <GenreView genre={movies.find(movie => movie.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/* User profile */}
          <Route path='/profile' render={() => {
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

const mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);