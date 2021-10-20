import React from 'react';

export class MovieView extends React.Component {

  render() {
    const {movie, onBackClick} = this.props;
    return (
      <div className="movie-view">
        <div className="movie-image">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <div className="label">Title</div>
          <div className="value">{movie.Title}</div>
        </div>
        <div className="movie-description">
          <div className="label">Description</div>
          <div className="value">{movie.Description}</div>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    )
  }
}