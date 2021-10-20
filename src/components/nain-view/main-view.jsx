import React from 'react';

// import MovieCard
import { MovieCard } from './movie-card';

// Create MainView component
export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Inception', Description: 'desc 1 ...', ImagePath: '...'},
        { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc 2 ...', ImagePath: '...'},
        { _id: 3, Title: 'Gladiator', Description: 'desc 3 ...', ImagePath: '...'}
      ]
    }
  }

  render() {
    // const movies = this.state.movies;
    // if (movies.length === 0) {
    //   return <div className="main-view">The list is empty!</div>
    // } else {
    //   return (
    //     <div className="main-view">
    //       {movies.map((movie) => {
    //         return <div key={movie._id}>{ movie.Title }</div>
    //       })}
    //     </div>
    //   );
    // }
    const { movies } = this.state;
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
    return (
      <div className="main-view">
        {movies.map(movie => <MovieCard key={movie._id} movie={movie}/>)}
      </div>
    );
  }
}