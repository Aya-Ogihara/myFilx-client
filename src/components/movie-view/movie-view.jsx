import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Rect Bootstrap
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {
  keypressCallback(event){
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movie } = this.props;
    const style = {
      width: '200px'
    }
    return (
      <Card className='mb-5'>
      <Card.Header className="flex movie-title">
        <h1>{movie.Title}</h1>
        <Link to={`genres/${movie.Genre.Name}`}>
          <Badge bg="secondary">{movie.Genre.Name}</Badge>
        </Link>
      </Card.Header>
      <Card.Body>
        <Card.Img variant="top" src={movie.ImagePath} crossOrigin='anonymous' alt={movie.Title}/>
        <Card.Subtitle as='h3' className="mt-3 text-muted">
          <Link to={`directors/${movie.Director.Name}`}>
            Director: {movie.Director.Name}
          </Link>
        </Card.Subtitle>
        <Card.Text className='mt-3 mb-4'>{movie.Description}</Card.Text>
        <Link to={'/'}>
        <Button variant="danger">Back to main</Button>
        </Link>
      </Card.Body>
    </Card>
    )
  }
}

MovieView.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    ImagePath: propTypes.string.isRequired,
    Genre: propTypes.shape({
      Name: propTypes.string
    }),
    Director: propTypes.shape({
      Name: propTypes.string
    })
  })
};

