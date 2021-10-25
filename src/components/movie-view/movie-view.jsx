import React from 'react';
import propTypes from 'prop-types';
// Rect Bootstrap
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {
  keypressCallback(event){
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  render() {
    const {movie, onBackClick} = this.props;
    const style = {
      width: '200px'
    }
    return (
      <div className="movie-view">
        <div className="movie-image" style={{textAlign:'center'}}>
          <img src={movie.ImagePath} alt={movie.Title} crossOrigin="anonymous" style={style} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <Button variant="danger" onClick={()=> onBackClick(null)} >Back to main</Button>
        
      </div>
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

