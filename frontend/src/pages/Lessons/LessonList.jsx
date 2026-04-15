import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLessons } from '../../hooks'

const LEVELS = ['Todos', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2']

const CATEGORIES = {
  vocabulary: { icon: '📖', label: 'Vocabulario', color: 'bg-blue-900/30 dark:bg-blue-500/10 text-blue-400 dark:text-blue-300' },
  grammar: { icon: '📝', label: 'Gramática', color: 'bg-purple-900/30 dark:bg-purple-500/15 text-purple-400 dark:text-purple-300' },
  listening: { icon: '🎧', label: 'Escucha', color: 'bg-green-900/30 dark:bg-green-500/15 text-green-400 dark:text-green-300' },
  speaking: { icon: '🎤', label: 'Habla', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' },
  reading: { icon: '📰', label: 'Lectura', color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300' },
}

const LEVEL_META = {
  A1: { color: 'bg-green-900/30 dark:bg-green-500/15 text-green-400 dark:text-green-300', border: 'border-l-green-300 dark:border-l-green-700' },
  A2: { color: 'bg-teal-900/25 dark:bg-teal-500/15 text-teal-400 dark:text-teal-300', border: 'border-l-teal-300 dark:border-l-teal-700' },
  B1: { color: 'bg-blue-900/30 dark:bg-blue-500/10 text-blue-400 dark:text-blue-300', border: 'border-l-blue-300 dark:border-l-blue-700' },
  B2: { color: 'bg-indigo-900/25 dark:bg-indigo-500/10 text-indigo-400 dark:text-indigo-300', border: 'border-l-indigo-300 dark:border-l-indigo-700' },
  C1: { color: 'bg-purple-900/30 dark:bg-purple-500/15 text-purple-400 dark:text-purple-300', border: 'border-l-purple-300 dark:border-l-purple-700' },
  C2: { color: 'bg-rose-900/25 dark:bg-rose-900/30 text-rose-400 dark:text-rose-300', border: 'border-l-rose-300 dark:border-l-rose-700' },
}

function SkeletonCard() {
  return (
    <div className="card space-y-4">
      <div className="flex gap-2">
        <div className="shimmer h-6 w-10 rounded-full" />
        <div className="shimmer h-6 w-24 rounded-full" />
      </div>
      <div className="shimmer h-5 w-3/4" />
      <div className="shimmer h-4 w-full" />
      <div className="shimmer h-4 w-2/3" />
    </div>
  )
}

export default function LessonList() {
  const [activeLevel, setActiveLevel] = useState('Todos')

  const { data: lessons = [], isLoading } = useLessons(
    activeLevel !== 'Todos' ? { level: activeLevel } : {}
  )

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#e2e8f0] dark:text-[#e8e4ff]">
          Lecciones 📚
        </h1>
        <p className="text-[#64748b] mt-1 text-sm">
          Elige tu nivel y empieza. Cada lección suma XP.
        </p>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 flex-wrap">
        {LEVELS.map(level => (
          <button
            key={level}
            onClick={() => setActiveLevel(level)}
            className={`px-4 py-2 rounded-2xl text-sm font-bold transition-all ${activeLevel === level
                ? 'bg-[#6366f1] text-white shadow-[0_4px_16px_rgba(99,102,241,0.45)]'
                : 'bg-[#161b27] text-[#64748b] border border-[#c8beff] hover:-translate-y-0.5'
              }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* LOADING */}
      {isLoading && (
        <div className="grid md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* EMPTY */}
      {!isLoading && lessons.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 space-y-4"
        >
          <p className="text-5xl">📭</p>
          <p className="font-bold text-[#94a3b8]">
            Aún no hay lecciones
          </p>
          <button
            onClick={() => setActiveLevel('Todos')}
            className="btn-secondary text-sm"
          >
            Ver todas
          </button>
        </motion.div>
      )}

      {/* LIST */}
      {!isLoading && lessons.length > 0 && (
        <>
          <div className="relative">

            <div className="grid md:grid-cols-2 gap-4">
              {lessons.map((lesson, i) => {
                const cat = CATEGORIES[lesson.category] ?? {
                  icon: '📚',
                  label: lesson.category,
                  color: 'bg-[#1c2333] text-[#94a3b8]'
                }

                const lvl = LEVEL_META[lesson.level] ?? {
                  color: 'bg-[#1c2333] text-[#94a3b8]',
                  border: 'border-l-slate-300'
                }

                return (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      to={`/lessons/${lesson.id}`}
                      className={`block card border-l-4 ${lvl.border}
                        ${i === 0 ? 'ring-2 ring-brand-300' : ''}
                        hover:shadow-lg hover:-translate-y-0.5 transition-all`}
                    >
                      {/* Badges */}
                      <div className="flex justify-between">
                        <div className="flex gap-2">
                          <span className={`level-badge ${lvl.color}`}>
                            {lesson.level}
                          </span>
                          <span className={`badge-pill ${cat.color}`}>
                            {cat.icon} {cat.label}
                          </span>
                        </div>

                        <span className="text-xs font-bold">
                          +{lesson.xp_reward} XP
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-[#e2e8f0]">
                        {lesson.title}
                      </h3>

                      {/* Description */}
                      {lesson.description && (
                        <p className="text-sm text-[#64748b]">
                          {lesson.description}
                        </p>
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* Fade */}
            {lessons.length > 6 && (
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0f1117] to-transparent pointer-events-none" />
            )}
          </div>

          {/* Count */}
          {lessons.length > 6 && (
            <p className="text-center text-sm text-[#9d8fc4]">
              {lessons.length} lecciones en total
            </p>
          )}
        </>
      )}
    </div>
  )
}