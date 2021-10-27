import React from 'react'

export const FavoriteMovies = () => {
  const removeFavorite = ()=>  {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    axios.delete(`https://aya-myflix.herokuapp.com/users/${user}/movies/${this.props.movie._id}`,{}, {
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
      favoriteMovies
    </div>
  )
}

