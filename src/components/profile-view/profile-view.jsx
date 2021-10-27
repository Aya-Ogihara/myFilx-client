import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// Rect Bootstrap
import { Row, Form, Button, CardProps } from 'react-bootstrap';

// Components
import { UserInfo } from './user-info';
import { FavoriteMovies } from './favorite-movies';
import { UpdateUser } from './update-user';

export const ProfileView = ({ movies, onUpdatedUserInfo}) =>  {

  return (
    <div>
      <UserInfo name={user.Username} email={user.Email} />
      <FavoriteMovies favoriteMovieList={favoriteMovieList} />
      <UpdateUser />
    </div>
  )

}

