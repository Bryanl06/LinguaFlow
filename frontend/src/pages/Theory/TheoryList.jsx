import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheoryTopics } from '../../hooks'

const LEVELS = ['Todos', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const ITEMS_PER_PAGE = 12   // Sobrecarga de Opciones: máx 12 temas visibles por nivel

const LEVEL_META = {
    A1: { color: 'bg-green-900/30 dark:bg-green-500/15 text-green-400 dark:text-green-300', border: 'border-green-200 dark:border-green-800', label: 'Principiante' },
    A2: { color: 'bg-teal-900/25 dark:bg-teal-500/15 text-teal-400 dark:text-teal-300', border: 'border-teal-200 dark:border-teal-800', label: 'Elemental' },
    B1: { color: 'bg-blue-900/30 dark:bg-blue-500/10 text-blue-400 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-800', label: 'Intermedio' },
    B2: { color: 'bg-indigo-900/25 dark:bg-indigo-500/10 text-indigo-400 dark:text-indigo-300', border: 'border-indigo-200 dark:border-indigo-800', label: 'Intermedio-alto' },
    C1: { color: 'bg-purple-900/30 dark:bg-purple-500/15 text-purple-400 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-800', label: 'Avanzado' },
    C2: { color: 'bg-rose-900/25 dark:bg-rose-900/30 text-rose-400 dark:text-rose-300', border: 'border-rose-200 dark:border-rose-800', label: 'Dominio' },
}

const CATEGORY_ICONS = {
    tenses: '⏳', verbs: '⚡', modals: '🎯', conditionals: '🔀',
    clauses: '🔗', pronouns: '👤', nouns: '📦', adjectives: '🎨',
    adverbs: '📏', prepositions: '📍', determiners: '🔢', conjunctions: '➕',
    questions: '❓', structure: '🏗️', emphasis: '‼️', cohesion: '🧵',
    pragmatics: '💬', register: '📝', vocabulary: '📚', default: '📖',
}

const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

export default function TheoryList() {
    const [activeLevel, setActiveLevel] = useState('Todos')
    const [search, setSearch] = useState('')
    // Sobrecarga de Opciones: paginación por nivel
    const [pages, setPages] = useState({})

    const { data: topics = [], isLoading } = useTheoryTopics(
        activeLevel !== 'Todos' ? { level: activeLevel } : {}
    )

    // Filtro de búsqueda
    const filtered = useMemo(() => {
        if (!search.trim()) return topics
        const q = search.toLowerCase()
        return topics.filter(t =>
            t.title?.toLowerCase().includes(q) ||
            t.category?.toLowerCase().includes(q)
        )
    }, [topics, search])

    const grouped = filtered.reduce((acc, t) => {
        if (!acc[t.level]) acc[t.level] = []
        acc[t.level].push(t)
        return acc
    }, {})

    const visibleLevels = activeLevel === 'Todos'
        ? LEVEL_ORDER.filter(l => grouped[l]?.length)
        : [activeLevel].filter(l => grouped[l]?.length)

    const totalGenerated = topics.filter(t => t.has_content).length

    const getPage = (level) => pages[level] ?? 1
    const setPage = (level, p) => setPages(prev => ({ ...prev, [level]: p }))

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold
                       text-[#e2e8f0] dark:text-[#e8e4ff] tracking-tight">
                    Gramática 📖
                </h1>
                <p className="text-[#64748b] dark:text-[#64748b] mt-1 text-sm sm:text-base">
                    115 temas de A1 a C2. Cada uno con explicación, ejemplos con audio y corrector.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { value: topics.length, label: 'Temas', color: 'text-brand-600 dark:text-brand-300' },
                    { value: totalGenerated, label: 'Listos', color: 'text-green-600 dark:text-green-400' },
                    { value: 6, label: 'Niveles', color: 'text-purple-600 dark:text-purple-400' },
                ].map(s => (
                    <div key={s.label} className="card text-center py-3">
                        <p className={`font-display font-extrabold text-2xl ${s.color}`}>{s.value}</p>
                        <p className="text-xs text-[#9d8fc4] dark:text-[#64748b] font-medium">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Búsqueda + filtros de nivel — Hick: búsqueda reduce las opciones */}
            <div className="space-y-3">
                <div className="relative">
                    <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4
                          text-[#9d8fc4] dark:text-[#64748b] pointer-events-none"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                        type="search"
                        value={search}
                        onChange={e => { setSearch(e.target.value); setPages({}) }}
                        placeholder="Buscar tema (ej: present perfect, conditionals...)"
                        className="input-base pl-10"
                    />
                </div>

                <div className="flex gap-2 flex-wrap">
                    {LEVELS.map(level => (
                        <button
                            key={level}
                            onClick={() => { setActiveLevel(level); setPages({}) }}
                            className={`px-4 py-2 rounded-2xl text-sm font-bold transition-all duration-150 ${activeLevel === level
                                    ? 'bg-[#6366f1] text-white shadow-[0_4px_16px_rgba(99,102,241,0.45)]'
                                    : 'bg-[#161b27] dark:bg-slate-800 text-[#64748b] dark:text-[#64748b] border border-[#c8beff] dark:border-[#7c3aed]/22 hover:border-brand-300 dark:hover:border-brand-600 hover:text-brand-600 dark:hover:text-brand-400'
                                }`}
                        >
                            {level}
                            {level !== 'Todos' && LEVEL_META[level] && (
                                <span className="ml-1.5 text-xs opacity-70 font-normal hidden sm:inline">
                                    {LEVEL_META[level].label}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Loading */}
            {isLoading && (
                <div className="space-y-6">
                    {[...Array(2)].map((_, s) => (
                        <div key={s} className="space-y-3">
                            <div className="shimmer h-8 w-40 rounded-xl" />
                            <div className="grid md:grid-cols-2 gap-3">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="shimmer h-16 rounded-2xl" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Temas por nivel */}
            {!isLoading && visibleLevels.map((level, li) => {
                const meta = LEVEL_META[level]
                const items = grouped[level] ?? []
                const ready = items.filter(t => t.has_content).length
                const page = getPage(level)
                const total = Math.ceil(items.length / ITEMS_PER_PAGE)
                const visible = items.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

                return (
                    <motion.div
                        key={level}
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: li * 0.06 }}
                    >
                        {/* Encabezado de nivel */}
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl ${meta?.color ?? 'bg-[#1c2333] dark:bg-slate-700 text-slate-600'}`}>
                                <span className="font-display font-extrabold text-lg">{level}</span>
                                <span className="text-xs font-semibold opacity-80 hidden sm:inline">{meta?.label}</span>
                            </div>
                            <div className="flex-1 h-px bg-[#1c2333] dark:bg-[#7c3aed]/10" />
                            <span className="text-xs text-[#9d8fc4] dark:text-[#64748b] font-medium whitespace-nowrap">
                                {ready}/{items.length}
                            </span>
                        </div>

                        {/* Grid de temas — Sobrecarga de Opciones: máx ITEMS_PER_PAGE */}
                        <div className="grid md:grid-cols-2 gap-2.5">
                            {visible.map((topic, i) => {
                                const icon = CATEGORY_ICONS[topic.category] ?? CATEGORY_ICONS.default
                                // Posición en serie: último elemento visible con leve fade si hay más
                                const isLast = i === visible.length - 1 && total > 1 && page < total
                                return (
                                    <motion.div
                                        key={topic.id}
                                        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: li * 0.04 + i * 0.02 }}
                                        style={isLast ? { maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' } : {}}
                                    >
                                        <Link
                                            to={`/theory/${topic.slug}`}
                                            className={`flex items-center gap-3 p-3.5 rounded-2xl border-2
                                  transition-all duration-200 group
                                  hover:shadow-[0_4px_20px_rgba(14,165,233,0.1)]
                                  hover:-translate-y-0.5
                                  bg-[#161b27] dark:bg-slate-800
                                  ${topic.has_content
                                                    ? `${meta?.border ?? 'border-[#c8beff] dark:border-slate-700'} hover:border-brand-300 dark:hover:border-brand-600`
                                                    : 'border-[#d0c2ff]/60 dark:border-[#7c3aed]/22 hover:border-brand-200'}`}
                                        >
                                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center
                                      text-base flex-shrink-0 transition-transform
                                      group-hover:scale-110
                                      ${topic.has_content
                                                    ? (meta?.color.split(' ')[0] ?? 'bg-[#1c2333]')
                                                    : 'bg-[#0f1117] dark:bg-slate-700'}`}>
                                                {icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-[#e2e8f0] dark:text-[#e8e4ff] text-sm
                                      leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400
                                      transition-colors truncate">
                                                    {topic.title}
                                                </p>
                                                <p className="text-xs text-[#9d8fc4] dark:text-[#64748b] mt-0.5 capitalize">
                                                    {topic.category ?? 'grammar'}{!topic.has_content && ' · se genera al abrir'}
                                                </p>
                                            </div>
                                            {topic.has_content
                                                ? <span className="text-green-400 flex-shrink-0 text-sm">✓</span>
                                                : <span className="text-brand-300 dark:text-brand-600 text-sm
                                           group-hover:text-brand-500 transition-colors flex-shrink-0">→</span>
                                            }
                                        </Link>
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* Paginación — Sobrecarga de Opciones */}
                        {total > 1 && (
                            <div className="flex items-center justify-between mt-4">
                                <button
                                    onClick={() => setPage(level, page - 1)}
                                    disabled={page === 1}
                                    className="btn-ghost py-1.5 px-3 text-xs disabled:opacity-30"
                                >
                                    ← Anterior
                                </button>
                                <span className="text-xs text-[#9d8fc4] dark:text-[#64748b] font-medium">
                                    {page} / {total} · {items.length} temas
                                </span>
                                <button
                                    onClick={() => setPage(level, page + 1)}
                                    disabled={page === total}
                                    className="btn-ghost py-1.5 px-3 text-xs disabled:opacity-30"
                                >
                                    Siguiente →
                                </button>
                            </div>
                        )}
                    </motion.div>
                )
            })}

            {/* Empty state */}
            {!isLoading && visibleLevels.length === 0 && (
                <div className="text-center py-16 space-y-3">
                    <p className="text-4xl">
                        {search ? '🔍' : '📭'}
                    </p>
                    <p className="font-semibold text-[#94a3b8] dark:text-[#c8beff]">
                        {search
                            ? `No hay temas que coincidan con "${search}"`
                            : topics.length === 0
                                ? 'Ejecuta el SQL del setup en Supabase para cargar los temas'
                                : 'No hay temas para este nivel'}
                    </p>
                    {search && (
                        <button onClick={() => setSearch('')} className="btn-secondary text-sm py-2">
                            Limpiar búsqueda
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}