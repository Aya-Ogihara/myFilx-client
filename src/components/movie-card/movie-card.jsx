import React from 'react';
import propTypes from 'prop-types';
// Rect Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    // return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={movie.ImagePath} crossOrigin='anonymous' />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button variant="danger" onClick={()=> onMovieClick(movie)}>More details</Button>
        </Card.Body>
      </Card>
    )
  }
}

MovieCard.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string
  }).isRequired,
  onMovieClick: propTypes.func.isRequired
};