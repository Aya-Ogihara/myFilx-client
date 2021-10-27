import React from 'react';
import axios from 'axios';

// Components
import { UserInfo } from './user-info';
import { FavoriteMovies } from './favorite-movies';
import { UpdateUser } from './update-user';

export class ProfileView extends React.Component {



  render() {
    return (
      <div>
        <UserInfo />
        <FavoriteMovies />
        <UpdateUser />
      </div>
    )
  }
}

