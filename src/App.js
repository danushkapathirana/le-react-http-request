import React, { Fragment } from 'react';

import MovieList from './components/MovieList';

import classes from './App.css'

const DUMMY_MOVIES = [
  {
    id: 1,
    title: 'Some Dummy Movie',
    openingText: 'This is the opening text of the movie',
    releaseDate: '2021-05-18',
  },
  {
    id: 2,
    title: 'Some Dummy Movie 2',
    openingText: 'This is the second opening text of the movie',
    releaseDate: '2021-05-19',
  },
]

const App = () => {
  return(
    <Fragment>
      <section>
        <button>Fetch Movies</button>
      </section>
      <section>
        <MovieList movies={DUMMY_MOVIES} />
      </section>
    </Fragment>
  )
}

export default App
