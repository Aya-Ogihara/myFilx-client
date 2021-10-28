import React from 'react'
import { Link } from 'react-router-dom';

export const FavoriteMovies = ({ favoriteMovieList,  removeFavorite }) => {

  return (
    <div>
      <h2>Favorite Movies</h2>
      {favoriteMovieList.map((movie) => {
        return (
          <div key={movie._id}>
            <img src={FavoriteMovies.ImagePath} crossOrigin='anonymous' />
            <Link to={`/movies/${movies._id}`}>
              <h4>{movie.Title}</h4>
            </ Link>
            <button onClick={() => removeFavorite(movies._id)}>Remove from list</button>
          </div>
        )
      })}
    </div>
  )
}

