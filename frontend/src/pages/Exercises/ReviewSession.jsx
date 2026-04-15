import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useReviewExercises, useSubmitAnswer } from '../../hooks'
import FillBlank from '../../components/exercises/FillBlank'
import MultipleChoice from '../../components/exercises/MultipleChoice'
import FlashCard from '../../components/exercises/FlashCard'
import ListeningExercise from '../../components/exercises/ListeningExercises'
import AnswerFeedback from '../../components/exercises/AnswerFeedback'

const EXERCISE_MAP = {
  fill_blank: FillBlank,
  multiple_choice: MultipleChoice,
  flashcard: FlashCard,
  listening: ListeningExercise,
}

export default function ReviewSession() {
  const { data: exercises = [], isLoading } = useReviewExercises()
  const submitAnswer = useSubmitAnswer()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)
  const [xpEarned, setXpEarned] = useState(0)
  const [results, setResults] = useState([])
  const [finished, setFinished] = useState(false)

  const exercise = exercises[currentIndex]

  const handleAnswer = async (userAnswer, quality = null) => {
    if (answered || !exercise) return
    const correct = userAnswer.toLowerCase().trim() === exercise.correct_answer.toLowerCase().trim()
    const q = quality ?? (correct ? 4 : 1)
    setIsCorrect(correct)
    setAnswered(true)
    try {
      const { data } = await submitAnswer.mutateAsync({
        exercise_id: exercise.id, correct, quality: q,
      })
      setXpEarned(data?.xp_earned ?? 0)
    } catch { /* continúa aunque falle el guardado */ }
    setResults(r => [...r, { correct }])
  }

  const handleNext = () => {
    if (currentIndex + 1 >= exercises.length) { setFinished(true); return }
    setCurrentIndex(i => i + 1)
    setAnswered(false); setIsCorrect(null); setXpEarned(0)
  }

  // ── Cargando ────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
        <p className="text-sm text-[#9d8fc4] dark:text-[#5a4f88]">Cargando ejercicios...</p>
      </div>
    )
  }

  // ── Sin ejercicios pendientes ───────────────────────────────────────────────
  if (exercises.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="text-center py-20 space-y-6 max-w-sm mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
          className="text-7xl"
        >
          🎉
        </motion.div>
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-bold text-[#e2e8f0] dark:text-[#e8e4ff]">
            ¡Todo al día!
          </h2>
          <p className="text-[#64748b] dark:text-[#7c6faa]">
            No tienes ejercicios pendientes de repaso. El algoritmo te mandará más cuando sea el momento.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Link to="/lessons" className="btn-primary">
            📚 Ir a una nueva lección
          </Link>
          <Link to="/theory" className="btn-secondary">
            📖 Explorar gramática
          </Link>
        </div>
      </motion.div>
    )
  }

  // ── Sesión terminada ────────────────────────────────────────────────────────
  if (finished) {
    const correct = results.filter(r => r.correct).length
    const pct = Math.round((correct / results.length) * 100)
    const totalXp = correct * 10 + (results.length - correct) * 2

    const msg = pct >= 90 ? { emoji: '🏆', title: '¡Perfecto!', sub: 'Poca gente llega a esto. Enhorabuena.' }
      : pct >= 70 ? { emoji: '🎉', title: '¡Muy bien!', sub: 'Buen repaso. Así se construye el inglés.' }
        : pct >= 50 ? { emoji: '💪', title: '¡Buen trabajo!', sub: 'Cada repaso que haces cuenta.' }
          : { emoji: '📚', title: '¡Sigue practicando!', sub: 'Lo importante es aparecer. Ya vendrán las notas.' }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto text-center space-y-6 py-10"
      >
        <motion.div
          initial={{ scale: 0, rotate: -15 }} animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.1 }}
          className="text-7xl sm:text-8xl"
        >
          {msg.emoji}
        </motion.div>
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold
                         text-[#e2e8f0] dark:text-[#e8e4ff]">
            {msg.title}
          </h1>
          <p className="text-[#64748b] dark:text-[#64748b] mt-2">{msg.sub}</p>
        </div>

        <div className="card space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: correct, label: 'Correctas', color: 'text-green-500' },
              { value: `${pct}%`, label: 'Precisión', color: 'text-brand-500' },
              { value: `+${totalXp}`, label: 'XP ganados', color: 'text-amber-500' },
            ].map(s => (
              <div key={s.label}>
                <p className={`font-display font-extrabold text-3xl ${s.color}`}>{s.value}</p>
                <p className="text-xs text-[#9d8fc4] dark:text-[#64748b] font-medium mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="progress-bar">
            <motion.div
              className={`h-full rounded-full ${pct >= 70 ? 'bg-green-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-400'}`}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => {
            setCurrentIndex(0); setAnswered(false); setFinished(false)
            setResults([]); setIsCorrect(null); setXpEarned(0)
          }} className="btn-secondary flex-1">
            🔁 Repetir
          </button>
          <Link to="/lessons" className="btn-primary flex-1">Ir a lecciones →</Link>
        </div>
      </motion.div>
    )
  }

  // ── Ejercicio actual ────────────────────────────────────────────────────────
  const ExerciseComponent = exercise ? EXERCISE_MAP[exercise.type] : null
  const progress = ((currentIndex + (answered ? 1 : 0)) / exercises.length) * 100

  return (
    <div className="max-w-2xl mx-auto space-y-5">

      {/* Cabecera */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-lg text-[#e2e8f0] dark:text-[#e8e4ff]">
              Sesión de repaso
            </h1>
            <p className="text-xs text-[#9d8fc4] dark:text-[#64748b] flex items-center gap-1">
              <span
                title="El sistema SM-2 analiza tus respuestas anteriores y selecciona los ejercicios que más necesitas repasar ahora, ni muy fáciles ni muy difíciles."
                className="cursor-help underline decoration-dotted"
              >
                ¿Por qué estos ejercicios?
              </span>
              <span>· {exercises.length} seleccionados para hoy</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {exercises.slice(0, Math.min(exercises.length, 10)).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: i === currentIndex ? '1rem' : '0.45rem',
                    backgroundColor: i < currentIndex ? '#0ea5e9' : i === currentIndex ? '#38bdf8' : undefined,
                  }}
                  className={`h-2 rounded-full ${i > currentIndex ? 'bg-slate-200 dark:bg-slate-700' : ''}`}
                />
              ))}
              {exercises.length > 10 && (
                <span className="text-xs text-[#9d8fc4] dark:text-[#64748b] ml-1">
                  +{exercises.length - 10}
                </span>
              )}
            </div>
            <span className="text-xs font-bold text-[#9d8fc4] dark:text-[#64748b] tabular-nums">
              {currentIndex + 1}/{exercises.length}
            </span>
          </div>
        </div>

        <div className="progress-bar">
          <motion.div
            className="progress-bar-fill"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Ejercicio */}
      <AnimatePresence mode="wait">
        {exercise && ExerciseComponent && (
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -28 }}
            transition={{ duration: 0.2 }}
            className="card"
          >
            <ExerciseComponent
              exercise={exercise}
              onAnswer={handleAnswer}
              disabled={answered}
              showTypeBadge={!answered}
            />
            {answered && (
              <AnswerFeedback
                isCorrect={isCorrect}
                correctAnswer={exercise.correct_answer}
                xpEarned={xpEarned}
                onNext={handleNext}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}