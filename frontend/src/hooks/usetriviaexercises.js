/**
 * useTriviaExercises.js
 * ─────────────────────────────────────────────────────────────
 * Hook que carga ejercicios extra desde Open Trivia DB
 * para enriquecer una lección con preguntas dinámicas.
 *
 * Uso:
 *   const { exercises, loading } = useTriviaExercises('B1', 3)
 * ─────────────────────────────────────────────────────────────
 */
import { useState, useEffect } from 'react'
import { fetchExercisesForLevel } from '../services/triviaapi'

export function useTriviaExercises(level = 'A1', amount = 3) {
  const [exercises, setExercises] = useState([])
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState(null)

  useEffect(() => {
    if (!level) return
    let cancelled = false

    setLoading(true)
    setError(null)

    fetchExercisesForLevel(level, amount)
      .then(data => {
        if (!cancelled) {
          setExercises(data)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [level, amount])

  return { exercises, loading, error }
}