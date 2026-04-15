import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/authStore'

const FEATURES = [
    { icon: '🎯', title: 'Ejercicios que enganchan', desc: 'Cuatro tipos distintos — completa frases, elige respuestas, tarjetas y escucha — para que cada sesión sea diferente.' },
    { icon: '🔥', title: 'Rachas que motivan', desc: 'Un poco cada día hace magia. Mantén tu racha y desbloquea logros que te dan ganas de volver mañana.' },
    { icon: '🧠', title: 'Aprende a tu ritmo', desc: 'El algoritmo SM-2 decide qué necesitas repasar hoy. Tú solo tienes que aparecer.' },
    { icon: '📊', title: 'Progreso que se ve', desc: 'Gráficas semanales, precisión por tipo de ejercicio y tu posición en el ranking.' },
    { icon: '📖', title: '115 temas de gramática', desc: 'De A1 a C2. Cada tema con explicación, ejemplos con audio, errores frecuentes y un truco para recordarlo.' },
    { icon: '🔍', title: 'Corrector al instante', desc: 'Escribe una frase en inglés y recibe correcciones reales. Saber por qué fallas es lo que hace que no vuelvas a fallar.' },
]

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const LEVEL_COLORS = {
    A1: 'bg-green-100  dark:bg-green-500/15  text-green-700  dark:text-green-300',
    A2: 'bg-teal-100   dark:bg-teal-500/15   text-teal-700   dark:text-teal-300',
    B1: 'bg-blue-100   dark:bg-blue-500/15   text-blue-700   dark:text-blue-300',
    B2: 'bg-indigo-900/25 dark:bg-indigo-500/15 text-indigo-400 dark:text-indigo-300',
    C1: 'bg-purple-900/30 dark:bg-purple-500/15 text-purple-400 dark:text-purple-300',
    C2: 'bg-rose-100   dark:bg-rose-500/15   text-rose-700   dark:text-rose-300',
}

const STATS = [
    { label: 'Lecciones', value: '10+', icon: '📚', col: 'text-brand-600  dark:text-brand-300' },
    { label: 'Temas gramática', value: '115', icon: '📖', col: 'text-violet-600 dark:text-violet-300' },
    { label: 'Logros', value: '8', icon: '🏆', col: 'text-amber-600  dark:text-amber-300' },
    { label: 'Niveles CEFR', value: 'A1–C2', icon: '📈', col: 'text-green-600  dark:text-green-300' },
]

function fadeUp(delay = 0) {
    return {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-50px' },
        transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
    }
}

export default function Home() {
    const darkMode = useAuthStore(s => s.darkMode)
    const toggleDark = useAuthStore(s => s.toggleDarkMode)

    return (
        /* ── Wrapper: light=lavanda suave, dark=negro profundo ── */
        <div className="min-h-screen overflow-x-hidden transition-colors duration-300"
            style={{
                background: darkMode
                    ? 'linear-gradient(160deg,#07060f 0%,#0a0919 50%,#0f0e20 100%)'
                    : 'linear-gradient(160deg,#0f1117 0%,#131620 50%,#0f1117 100%)'
            }}
        >

            {/* ── Navbar ── */}
            <header className="fixed top-0 inset-x-0 z-50 glass dark:glass">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
                    <span className="font-display text-xl sm:text-2xl font-extrabold text-brand-600 dark:text-[#ae96ff]">
                        Lingua<span className="text-accent-500">Flow</span>
                    </span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleDark}
                            className="w-9 h-9 flex items-center justify-center rounded-xl
                         text-[#64748b] dark:text-[#ae96ff]
                         hover:bg-[#1c2333] dark:hover:bg-[#7c3aed]/15 transition-all"
                            aria-label="Cambiar tema"
                        >
                            {darkMode ? '☀️' : '🌙'}
                        </button>
                        <Link to="/login" className="btn-ghost py-2 px-3 sm:px-4 text-sm">Entrar</Link>
                        <Link to="/register" className="btn-primary py-2 px-3 sm:px-4 text-sm">Empezar gratis</Link>
                    </div>
                </div>
            </header>

            {/* ── Hero ── */}
            <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 px-4 sm:px-6 overflow-hidden bg-grid">
                {/* Blobs decorativos */}
                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                    <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
                        style={{
                            background: darkMode
                                ? 'radial-gradient(circle,rgba(124,58,237,0.18),transparent 70%)'
                                : 'radial-gradient(circle,rgba(124,58,237,0.10),transparent 70%)'
                        }} />
                    <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full blur-3xl"
                        style={{
                            background: darkMode
                                ? 'radial-gradient(circle,rgba(41,121,255,0.15),transparent 70%)'
                                : 'radial-gradient(circle,rgba(34,211,238,0.15),transparent 70%)'
                        }} />
                    <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full blur-3xl"
                        style={{
                            background: darkMode
                                ? 'radial-gradient(circle,rgba(6,182,212,0.10),transparent 70%)'
                                : 'radial-gradient(circle,rgba(139,92,246,0.15),transparent 70%)'
                        }} />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 36 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-3xl mx-auto text-center space-y-7"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold chip-neon"
                    >
                        <span className="animate-float">🎓</span>
                        Aprende inglés de verdad, sin pagar una suscripción
                    </motion.span>

                    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight"
                        style={{ color: darkMode ? '#e8e4ff' : '#e2e8f0' }}>
                        El inglés que estudias{' '}
                        <span className="text-gradient">se queda</span>
                        <br className="hidden sm:block" /> en tu memoria
                    </h1>

                    <p style={{ color: darkMode ? '#a89fd4' : '#94a3b8' }}
                        className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                        Ejercicios interactivos, repetición espaciada y gamificación para aprender
                        inglés de A1 a C2. Sin anuncios, sin trucos, solo aprendizaje que funciona.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
                        <Link to="/register" className="btn-primary text-base sm:text-lg px-7 sm:px-9 py-3.5 sm:py-4">
                            Crear cuenta gratis 🚀
                        </Link>
                        <Link to="/login" className="btn-secondary text-base sm:text-lg px-7 sm:px-9 py-3.5 sm:py-4">
                            Ya tengo cuenta
                        </Link>
                    </div>

                    <div className="flex justify-center gap-2 pt-1 flex-wrap">
                        {LEVELS.map(l => (
                            <span key={l} className={`level-badge ${LEVEL_COLORS[l]}`}>{l}</span>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ── Stats ── */}
            <motion.section {...fadeUp(0)} className="py-10 px-4 sm:px-6 bg-grid"
                style={{
                    background: darkMode
                        ? 'rgba(15,14,32,0.80)'
                        : 'rgba(19,22,32,0.95)'
                }}>
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    {STATS.map((s, i) => (
                        <motion.div key={s.label} {...fadeUp(i * 0.05)}
                            className="card text-center py-5 card-hover">
                            <p className="text-2xl sm:text-3xl mb-2">{s.icon}</p>
                            <p className={`font-display font-extrabold text-2xl sm:text-3xl ${s.col}`}>{s.value}</p>
                            <p className="text-xs sm:text-sm font-medium mt-1"
                                style={{ color: darkMode ? '#6b619e' : '#64748b' }}>{s.label}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* ── Features ── */}
            <section className="py-20 sm:py-24 px-4 sm:px-6"
                style={{ background: darkMode ? '#07060f' : '#0f1117' }}>
                <div className="max-w-5xl mx-auto">
                    <motion.div {...fadeUp(0)} className="text-center mb-12 sm:mb-16 space-y-3">
                        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight"
                            style={{ color: darkMode ? '#e8e4ff' : '#e2e8f0' }}>
                            Todo lo que necesitas para aprender de verdad
                        </h2>
                        <p style={{ color: darkMode ? '#a89fd4' : '#94a3b8' }} className="text-lg max-w-xl mx-auto">
                            Sin suscripciones. Sin anuncios. Sin atajos.
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {FEATURES.map((f, i) => (
                            <motion.div key={f.title} {...fadeUp(i * 0.06)} className="card-hover group">
                                <div className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center text-2xl
                                group-hover:scale-110 transition-transform duration-300"
                                    style={{
                                        background: darkMode
                                            ? 'rgba(124,58,237,0.15)'
                                            : 'rgba(99,102,241,0.18)'
                                    }}>
                                    {f.icon}
                                </div>
                                <h3 className="font-display font-bold mb-2 text-lg"
                                    style={{ color: darkMode ? '#e8e4ff' : '#e2e8f0' }}>
                                    {f.title}
                                </h3>
                                <p className="text-sm leading-relaxed"
                                    style={{ color: darkMode ? '#a89fd4' : '#94a3b8' }}>
                                    {f.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Quote ── */}
            <motion.section {...fadeUp(0)} className="py-16 sm:py-20 px-4 sm:px-6 bg-grid"
                style={{
                    background: darkMode
                        ? 'linear-gradient(135deg,rgba(15,14,32,0.95),rgba(10,9,25,0.95))'
                        : 'linear-gradient(135deg,#131620,#1c2333)'
                }}>
                <div className="max-w-3xl mx-auto text-center space-y-5">
                    <p className="text-3xl sm:text-4xl font-display font-extrabold leading-tight"
                        style={{ color: darkMode ? '#e8e4ff' : '#e2e8f0' }}>
                        "Aprender inglés no es cuestión de talento.{' '}
                        <span className="text-gradient">Es cuestión de constancia.</span>"
                    </p>
                    <p style={{ color: darkMode ? '#6b619e' : '#64748b' }} className="text-sm font-medium">
                        Por eso LinguaFlow te ayuda a ser constante — con rachas, XP y recordatorios inteligentes.
                    </p>
                </div>
            </motion.section>

            {/* ── CTA ── */}
            <section className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
                style={{
                    background: darkMode
                        ? 'linear-gradient(135deg,#0a0919 0%,#0f0e20 50%,#0a0919 100%)'
                        : 'linear-gradient(135deg,#7c3aed 0%,#2979ff 100%)'
                }}>
                {/* Blobs CTA */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-30"
                        style={{ background: 'radial-gradient(circle,rgba(34,211,238,1),transparent 70%)' }} />
                    <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-20"
                        style={{ background: 'radial-gradient(circle,rgba(139,101,255,1),transparent 70%)' }} />
                </div>
                <motion.div {...fadeUp(0)} className="max-w-xl mx-auto text-center space-y-6 relative z-10">
                    <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                        Empieza hoy.<br />
                        <span style={{ opacity: 0.75 }}>Gratis para siempre.</span>
                    </h2>
                    <p className="text-lg" style={{ color: 'rgba(255,255,255,0.70)' }}>
                        Tu primera lección está a 30 segundos de distancia.
                    </p>
                    <Link to="/register"
                        className="inline-block font-extrabold px-8 sm:px-10 py-4 sm:py-5 rounded-2xl
                       text-base sm:text-lg transition-all duration-300
                       hover:-translate-y-1 hover:shadow-neon-purple"
                        style={{
                            background: darkMode
                                ? 'linear-gradient(135deg,#2979ff,#7c3aed)'
                                : 'rgba(99,102,241,0.20)',
                            color: 'white',
                            border: '1px solid rgba(255,255,255,0.30)',
                            backdropFilter: 'blur(8px)',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.25)'
                        }}>
                        Crear cuenta gratis →
                    </Link>
                    <p style={{ color: 'rgba(255,255,255,0.40)' }} className="text-xs">
                        Sin tarjeta de crédito. Sin letra pequeña.
                    </p>
                </motion.div>
            </section>

            {/* ── Footer ── */}
            <footer className="py-8 px-6 text-center"
                style={{ background: darkMode ? '#07060f' : '#08090e' }}>
                <p className="text-sm" style={{ color: 'rgba(174,150,255,0.60)' }}>
                    <span className="font-display font-bold" style={{ color: '#ae96ff' }}>LinguaFlow</span>
                    {' '}·{' '}
                    <span>TFG DAM2 · React · Express · Supabase</span>
                </p>
            </footer>
        </div>
    )
}