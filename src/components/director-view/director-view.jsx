import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Rect Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export function DirectorView(props) {

  const { director, onBackClick } = props;

  return (
    <Card className='mb-5'>
    <Card.Header>
      <h1>{director.Name}</h1>
    </Card.Header>
    <Card.Body>
      <Card.Text className='mb-4'>
        <p>{director.Bio}</p>
        <p>Birth year: {director.Birth}</p>
        <p>Death year: {director.Death}</p>
      </Card.Text>
      <Button variant="danger" onClick={() => onBackClick()}>Return to the movie</Button>
      <Link to={'/'}>
      <Button variant="outline-danger">Go to movie list</Button>
      </Link>
      
    </Card.Body>
  </Card>
  )

}

DirectorView.propTypes = {
  director: propTypes.shape({
    Bio: propTypes.string.isRequired,
    Birth: propTypes.string.isRequired,
    Death: propTypes.string
  })
};

