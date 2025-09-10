import { useEffect, useState } from 'react'
import { Search } from './components/Search'
import { NumResults } from './components/NumResults'
import { NavBar } from './components/NavBar'
import { ErrorMessage } from './components/ErrorMessage'
import { Loader } from './components/Loader'
import { Logo } from './components/Logo'
import { Main } from './components/MainFile'
import { Box } from './components/Box'
import { MovieList } from './components/MovieList'
import { MovieDetails } from './components/MovieDetails'

// const tempMovieData = [
//   {
//     imdbID: 'tt1375666',
//     Title: 'Inception',
//     Year: '2010',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
//   },
//   {
//     imdbID: 'tt0133093',
//     Title: 'The Matrix',
//     Year: '1999',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
//   },
//   {
//     imdbID: 'tt6751668',
//     Title: 'Parasite',
//     Year: '2019',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
//   },
// ]

// const tempWatchedData = [
//   {
//     imdbID: 'tt1375666',
//     Title: 'Inception',
//     Year: '2010',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: 'tt0088763',
//     Title: 'Back to the Future',
//     Year: '1985',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ]

const average = arr => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)

export const KEY = 'e4610920'

export default function App() {
  const [movies, setMovies] = useState([])
  // const [watched, setWatched] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem('watched')
    return storedValue ? JSON.parse(storedValue) : []
  })

  function handleSelectedMovie(id) {
    setSelectedId(selectedId => (id === selectedId ? null : id))
  }

  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie])

    // localStorage.setItem('watched', JSON.stringify([...watched, movie]))
  }
  function handleDeleteWatched(id) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id))
  }

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched))
  }, [watched])

  useEffect(() => {
    const controller = new AbortController()
    const fetchMovies = async () => {
      try {
        setIsLoading(true)
        setError('')
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {
          signal: controller.signal,
        })
        if (!res.ok) throw new Error('Failed to fetch movie')
        const data = await res.json()

        if (data.Response === 'False') throw new Error('Movie not found')
        setMovies(data.Search)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setError(error.message)
      } finally {
        setIsLoading(false)
        setError('')
      }
    }

    if (query.length < 3) {
      setMovies([])
      setError('')
      return
    }

    fetchMovies()
    return () => controller.abort()
  }, [query])

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {/* {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />} */}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieList movies={movies} onSelectMovie={handleSelectedMovie} />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              onAddwatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} OnDeleteWatched={handleDeleteWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  )
}

function WatchedMovieList({ watched, OnDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map(movie => (
        <WatchedMovie movie={movie} key={movie.imdbID} OnDeleteWatched={OnDeleteWatched} />
      ))}
    </ul>
  )
}

function WatchedMovie({ movie, OnDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={() => OnDeleteWatched(movie.imdbID)}>
          X
        </button>
      </div>
    </li>
  )
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map(movie => movie.imdbRating))
  const avgUserRating = average(watched.map(movie => movie.userRating))
  const avgRuntime = average(watched.map(movie => movie.runtime))

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  )
}
