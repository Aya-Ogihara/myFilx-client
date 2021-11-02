import React from 'react';

// Redux
import { connect } from 'react-redux'

// import components
import { MovieCard } from '../movie-card/movie-card';

// Rect Bootstrap
import { Col } from 'react-bootstrap';


const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return  { visibilityFilter };
}

function MoviesList(props) {
  const { movies, visibilityFilter} = props;
  const filteredMovies = movies;

  if(visibilityFilter !== '') {
    filteredMovies = movies.filter(movie => movie.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className='main-view' />
  return filteredMovies.map (movie => (
    <Col sm={12} md={6} lg={4} xl={3} className='mb-5' key={movie._id}>
      <MovieCard movie={movie} />
    </Col>
  ))
}

export default connect(mapStateToProps)(MoviesList);
