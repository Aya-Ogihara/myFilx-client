import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export const FavoriteMovies = ({ favoriteMovieList }) => {
  
  const removeFavorite = (id)=>  {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    axios.delete(`https://aya-myflix.herokuapp.com/users/${user}/movies/${props.movie._id}`,{}, {
    headers: { Authorization: `Bearer ${token}`},
    method: 'DELETE'
  })
  .then(() => {
    alert(`The movie is removed your favorite movie list`)
  })
  .catch( e => {
    console.log(e)
  });
  }


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

