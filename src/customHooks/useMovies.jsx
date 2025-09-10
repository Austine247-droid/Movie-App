import { useEffect, useState } from 'react'
const KEY = 'e4610920'
export function useMovies(query) {
  const [movies, setMovies] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    const fetchMovies = async () => {
      try {
        setIsLoading(true)
        setError('')
        const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {
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

  return { movies, isLoading, error }
}
