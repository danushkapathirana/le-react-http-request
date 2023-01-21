import React, { Fragment, useCallback, useEffect, useState } from 'react';

import MovieList from './components/MovieList';
import AddMovie from './components/AddMovie';

import classes from './App.css'

const App = () => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  
  const fetchMovieHandler = useCallback(() => { //useCallback returns memorized version of function; without useCallback this will infinite loop; why?
    setIsLoading(true)
    setError(null)

    fetch('https://swapi.dev/api/films')
    .then((response) => {
      if(response.ok) {
        return response.json() //transform the response into real js object
      }
      else {
        throw new Error('Something went wrong.!')
      }
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
    .catch((error) => {
      setError(error.message)
    })
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchMovieHandler()
  }, [fetchMovieHandler])

  async function addMovieHandler(movie) {
    const response = await fetch('https://react-http-8d134-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data)
  }

  // async function fetchMovieHandler() {
  //   setIsLoading(true)
  //   setError(null)

  //   try {
  //     const response = await fetch('https://swapi.dev/api/films')
      
  //     if(!response.ok) {
  //       throw new Error('Something went wrong.!')
  //     }

  //     const data = await response.json()
      
  //     const transformedMovies = data.results.map((movieData) => {
  //       return{
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.release_date
  //       }
  //     })
  //     setMovies(transformedMovies)
  //   }
  //   catch(error) {
  //     setError(error.message)
  //   }
  //   setIsLoading(false)
  // }

  // using async / await syntax
  // async const fetchMovieHandler  = () => {
  //   const response = await fetch('https://swapi.dev/api/films')
  //   const data = await response.json() //transform the response into real js object
  // }

  return(
    <Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}/>
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MovieList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>No movies found.!</p> }
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </Fragment>
  )
}

export default App
