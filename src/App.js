import React, { Fragment, useState } from 'react';

import MovieList from './components/MovieList';

import classes from './App.css'

const App = () => {
  const [movies, setMovies] = useState([])

  const fetchMovieHandler = () => {
    fetch('https://swapi.dev/api/films')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      const transformedMovies = data.results.map((movieData) => { //mapping names that we have used in our application and names that used in API
        return{
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      })
      setMovies(transformedMovies)
    })
  }
  
  return(
    <Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MovieList movies={movies} />
      </section>
    </Fragment>
  )
}

export default App
