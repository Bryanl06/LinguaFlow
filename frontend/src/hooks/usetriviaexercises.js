/**
 * Carga preguntas extra de inglés adaptadas al nivel CEFR de la lección.
 * Sirven como pequeño calentamiento antes de empezar los ejercicios oficiales.
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