import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    AreaChart, Area, XAxis, YAxis, Tooltip,
    ResponsiveContainer, CartesianGrid,
} from 'recharts'
import { useDashboard } from '../hooks'
import { useAuthStore } from '../store/authStore'
import XPBar from '../components/gamification/XPBar'

const DAY_LABELS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

const GREETINGS = [
    '¡Qué bien verte por aquí!',
    '¡A por otro día productivo!',
    '¡Tu inglés mejora cada vez que apareces!',
    '¡Vamos, que hoy también puedes!',
    '¡Aquí empieza la racha del día!',
]

/* ── Stat card ─────────────────────────────────────────────── */
function StatCard({ icon, value, label, sublabel, accent }) {
    return (
        <div className="card flex items-center gap-4 hover:-translate-y-0.5
                    transition-all duration-300"
            style={{ '--hover-shadow': `0 8px 28px ${accent}30` }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 28px ${accent}35`}
            onMouseLeave={e => e.currentTarget.style.boxShadow = ''}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center
                      text-2xl flex-shrink-0"
                style={{ background: `${accent}18` }}>
                {icon}
            </div>
            <div className="min-w-0">
                <p className="font-display font-extrabold text-2xl"
                    style={{ color: 'var(--c-text)' }}>
                    {value}
                </p>
                <p className="text-sm font-medium leading-tight"
                    style={{ color: 'var(--c-text-2)' }}>
                    {label}
                </p>
                {sublabel && (
                    <p className="text-xs mt-0.5" style={{ color: 'var(--c-text-3)' }}>
                        {sublabel}
                    </p>
                )}
            </div>
        </div>
    )
}

/* ── Tooltip del gráfico ───────────────────────────────────── */
function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null
    return (
        <div className="rounded-2xl px-4 py-3 text-sm"
            style={{
                background: 'var(--c-surface)',
                border: '1px solid var(--c-border)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
            }}>
            <p className="font-bold mb-1" style={{ color: 'var(--c-text-2)' }}>{label}</p>
            {payload.map(p => (
                <p key={p.name} style={{ color: 'var(--c-text-3)' }}>
                    <span className="font-semibold" style={{ color: '#8b5cf6' }}>{p.value}</span>
                    {' '}{p.name === 'xp' ? 'XP' : 'ejercicios'}
                </p>
            ))}
        </div>
    )
}

/* ── Página ────────────────────────────────────────────────── */
export default function Dashboard() {
    const profile = useAuthStore(s => s.profile)
    const darkMode = useAuthStore(s => s.darkMode)
    const { data, isLoading } = useDashboard()

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center h-64 gap-3">
            <div className="w-10 h-10 border-4 rounded-full animate-spin"
                style={{ borderColor: 'var(--c-border)', borderTopColor: '#8b5cf6' }} />
            <p className="text-sm" style={{ color: 'var(--c-text-3)' }}>Cargando tu progreso...</p>
        </div>
    )

    const today = data?.today ?? { exercises_done: 0, correct_answers: 0, xp_earned: 0 }
    const week = Array.isArray(data?.week_activity) ? data.week_activity : []
    const totals = data?.totals ?? { exercises_completed: 0, pending_review: 0 }

    const chartData = week.map(d => ({
        day: DAY_LABELS[new Date(d.date + 'T12:00:00').getDay()],
        ejercicios: d.exercises_done,
        xp: d.xp_earned,
    }))

    const todayDate = new Date()
    const fullWeek = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(todayDate)
        d.setDate(d.getDate() - (6 - i))
        const label = DAY_LABELS[d.getDay()]
        return chartData.find(c => c.day === label) ?? { day: label, ejercicios: 0, xp: 0 }
    })

    const accuracy = today.exercises_done > 0
        ? Math.round((today.correct_answers / today.exercises_done) * 100) : 0
    const greeting = GREETINGS[new Date().getDay() % GREETINGS.length]

    /* Colores del gráfico adaptados a la paleta actual */
    const gridC = darkMode ? '#1e1b3a' : '#1c2333'
    const tickC = darkMode ? '#4a3d8a' : '#475569'
    const lineC = '#8b5cf6'
    const gradTop = darkMode ? 'rgba(139,92,246,0.35)' : 'rgba(99,102,241,0.30)'

    return (
        <div className="space-y-5 sm:space-y-6">

            {/* ── Saludo ── */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight"
                    style={{ color: 'var(--c-text)' }}>
                    Hola, <span className="text-gradient">{profile?.username ?? 'campeón'}</span> 👋
                </h1>
                <p className="mt-1 text-sm sm:text-base" style={{ color: 'var(--c-text-2)' }}>
                    {today.exercises_done > 0
                        ? `${greeting} Llevas ${today.exercises_done} ejercicio${today.exercises_done > 1 ? 's' : ''} hoy.`
                        : `${greeting} ¿Empezamos con una lección?`}
                </p>
            </motion.div>

            {/* ── XP Bar ── */}
            <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                className="card">
                <XPBar xp={profile?.xp ?? 0} level={profile?.level ?? 1} />
            </motion.div>

            {/* ── Stats ── */}
            <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <StatCard icon="✏️" value={today.exercises_done} label="Hoy" sublabel="ejercicios" accent="#6366f1" />
                <StatCard icon="🔥" value={profile?.streak_days ?? 0} label="Racha" sublabel={profile?.streak_days === 1 ? 'día' : 'días'} accent="#f97316" />
                <StatCard icon="🎯" value={`${accuracy}%`} label="Precisión" sublabel="de hoy" accent="#22c55e" />
                <StatCard icon="📋" value={totals.pending_review} label="Por repasar" sublabel="ejercicios" accent="#8b5cf6" />
            </motion.div>

            {/* ── Acciones rápidas ── */}
            <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                    {
                        to: '/lessons', icon: '📚',
                        accent: '#6366f1',
                        title: 'Nueva lección',
                        desc: 'Explora los temas disponibles',
                    },
                    {
                        to: '/review', icon: '🔄',
                        accent: '#8b5cf6',
                        title: 'Sesión de repaso',
                        desc: totals.pending_review > 0
                            ? `${totals.pending_review} ejercicio${totals.pending_review > 1 ? 's' : ''} pendiente${totals.pending_review > 1 ? 's' : ''}`
                            : '¡Todo al día! 🎉',
                        badge: totals.pending_review > 0 ? totals.pending_review : null,
                    },
                ].map(item => (
                    <Link key={item.to} to={item.to}
                        className="card flex items-center gap-4 group glow-border
                       hover:-translate-y-0.5 transition-all duration-300">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center
                            text-2xl flex-shrink-0 transition-all duration-200
                            group-hover:scale-110"
                            style={{ background: `${item.accent}18` }}>
                            {item.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                                <p className="font-display font-bold" style={{ color: 'var(--c-text)' }}>
                                    {item.title}
                                </p>
                                {item.badge && (
                                    <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs
                                   font-bold flex items-center justify-center flex-shrink-0
                                   animate-pulse-slow"
                                        style={{ boxShadow: '0 0 8px rgba(239,68,68,0.5)' }}>
                                        {item.badge > 9 ? '9+' : item.badge}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm truncate" style={{ color: 'var(--c-text-3)' }}>
                                {item.desc}
                            </p>
                        </div>
                        <span className="text-xl flex-shrink-0 transition-all duration-200
                             group-hover:translate-x-1"
                            style={{ color: item.accent }}>
                            →
                        </span>
                    </Link>
                ))}
            </motion.div>

            {/* ── Gráfica semanal ── */}
            <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="card">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="font-display font-bold text-base sm:text-lg"
                        style={{ color: 'var(--c-text)' }}>
                        Actividad semanal
                    </h2>
                    {today.xp_earned > 0 && (
                        <span className="badge-pill text-amber-300"
                            style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.25)' }}>
                            ⭐ +{today.xp_earned} XP hoy
                        </span>
                    )}
                </div>

                <ResponsiveContainer width="100%" height={160}>
                    <AreaChart data={fullWeek} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                        <defs>
                            <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={lineC} stopOpacity={0.40} />
                                <stop offset="95%" stopColor={lineC} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridC} vertical={false} />
                        <XAxis dataKey="day"
                            tick={{ fontSize: 11, fill: tickC, fontFamily: 'Nunito' }}
                            axisLine={false} tickLine={false} />
                        <YAxis
                            tick={{ fontSize: 11, fill: tickC, fontFamily: 'Nunito' }}
                            axisLine={false} tickLine={false} />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ stroke: lineC, strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area
                            type="monotone" dataKey="xp"
                            stroke={lineC} strokeWidth={2.5}
                            fill="url(#xpGrad)"
                            dot={{ r: 3.5, fill: lineC, strokeWidth: 0 }}
                            activeDot={{
                                r: 5.5, fill: lineC,
                                stroke: darkMode ? '#0f0e20' : '#161b27', strokeWidth: 2
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </motion.div>

        </div>
    )
}