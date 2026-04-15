import { Outlet, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'
import { useLogout } from '../../hooks'
import AccentSelector from '../audio/AccentSelector'

const NAV = [
    { to: '/dashboard', icon: '🏠', label: 'Inicio' },
    { to: '/lessons', icon: '📚', label: 'Lecciones' },
    { to: '/theory', icon: '📖', label: 'Gramática' },
    { to: '/review', icon: '🔄', label: 'Repasar' },
    { to: '/profile', icon: '👤', label: 'Perfil' },
]

function DarkToggle({ darkMode, onToggle }) {
    return (
        <button
            onClick={onToggle}
            aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
            className="w-9 h-9 flex items-center justify-center rounded-xl
                 text-[#64748b] dark:text-slate-400
                 hover:bg-[#1c2333] dark:hover:bg-[#7c3aed]/15
                 transition-all duration-150"
        >
            {darkMode ? '☀️' : '🌙'}
        </button>
    )
}

function Avatar({ profile, size = 'md' }) {
    const sz = size === 'md' ? 'w-10 h-10 text-base' : 'w-8 h-8 text-sm'
    if (profile?.avatar_url) {
        return (
            <img
                src={profile.avatar_url}
                alt={profile.username}
                className={`${sz} rounded-full object-cover flex-shrink-0 ring-2 ring-brand-200`}
            />
        )
    }
    return (
        <div className={`${sz} rounded-full bg-brand-500 flex items-center justify-center
                     font-bold text-white flex-shrink-0`}>
            {profile?.username?.[0]?.toUpperCase() ?? '?'}
        </div>
    )
}

export default function Layout() {
    const profile = useAuthStore(s => s.profile)
    const darkMode = useAuthStore(s => s.darkMode)
    const toggleDark = useAuthStore(s => s.toggleDarkMode)
    const logout = useLogout()

    return (
        <div className="flex min-h-screen bg-[#0f1117] dark:bg-[#0a1240] transition-colors duration-200">

            {/* ── Sidebar desktop ───────────────────────────────── */}
            <aside className="hidden md:flex flex-col w-64 bg-[#161b27] dark:bg-[#0d1f5c]
                        border-r border-[#d0c2ff]/60 dark:border-[#7c3aed]/22
                        shadow-card fixed h-full z-10 transition-colors duration-200">

                {/* Logo + dark toggle */}
                <div className="px-5 py-4 border-b border-[#d0c2ff]/60 dark:border-[#7c3aed]/22
                        flex items-center justify-between">
                    <span className="font-display text-xl font-bold text-brand-600 dark:text-brand-300">
                        Lingua<span className="text-accent-500">Flow</span>
                    </span>
                    <DarkToggle darkMode={darkMode} onToggle={toggleDark} />
                </div>

                {/* Perfil usuario */}
                {profile && (
                    <div className="px-4 py-3 border-b border-[#d0c2ff]/60 dark:border-[#7c3aed]/22">
                        <div className="flex items-center gap-3 bg-brand-50 dark:bg-[#0f0e20]/60 rounded-2xl p-3 border dark:border-[#7c3aed]/22">
                            <Avatar profile={profile} />
                            <div className="min-w-0 flex-1">
                                <p className="font-semibold text-sm text-[#e2e8f0] dark:text-[#e8e4ff] truncate">
                                    {profile.username}
                                </p>
                                <p className="text-xs text-brand-500 dark:text-brand-300 font-medium">
                                    ⭐ {profile.xp ?? 0} XP · Niv. {profile.level ?? 1}
                                </p>
                            </div>
                        </div>
                        {profile.streak_days > 0 && (
                            <div className="mt-2 flex items-center gap-1.5 px-3 py-1.5
                              bg-[#1c2333] dark:bg-[#9333ea]/15 rounded-xl border dark:border-orange-500/20">
                                <span>🔥</span>
                                <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                                    {profile.streak_days} {profile.streak_days === 1 ? 'día' : 'días'} de racha
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* Nav links */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {NAV.map(({ to, icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-semibold
                 transition-all duration-150
                 ${isActive
                                    ? 'nav-active bg-brand-500 text-white shadow-glow'
                                    : 'text-[#94a3b8] dark:text-[#475569] hover:bg-[#6366f1]/12 hover:text-brand-600 dark:hover:text-brand-300'
                                }`
                            }
                        >
                            <span className="text-lg leading-none">{icon}</span>
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* Selector de acento — Ley de Hick: compacto, expande al tocar */}
                <div className="px-4 pb-3 border-t border-[#d0c2ff]/60 dark:border-[#7c3aed]/22 pt-3
                        flex items-center justify-between">
                    <span className="text-xs text-[#9d8fc4] dark:text-[#64748b] font-medium">
                        Acento
                    </span>
                    <AccentSelector compact />
                </div>

                {/* Logout */}
                <div className="px-3 pb-4">
                    <button
                        onClick={() => logout.mutate()}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm
                       font-semibold text-[#64748b] dark:text-slate-400
                       hover:bg-red-900/20 dark:hover:bg-red-500/15
                       hover:text-red-500 dark:hover:text-red-400 transition-all"
                    >
                        <span className="text-lg">🚪</span>
                        Cerrar sesión
                    </button>
                </div>
            </aside>

            {/* ── Header mobile ─────────────────────────────────── */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-20
                         bg-[#161b27]/95 dark:bg-[#0d1f5c]/95
                         backdrop-blur-md
                         border-b border-[#d0c2ff]/60 dark:border-[#7c3aed]/22
                         px-4 h-14 flex items-center justify-between
                         shadow-sm transition-colors duration-200">
                <span className="font-display text-lg font-bold text-brand-600 dark:text-brand-300">
                    Lingua<span className="text-accent-500">Flow</span>
                </span>
                <div className="flex items-center gap-2">
                    <AccentSelector compact />
                    <DarkToggle darkMode={darkMode} onToggle={toggleDark} />
                    {profile && <Avatar profile={profile} size="sm" />}
                </div>
            </header>

            {/* ── Bottom nav mobile ─────────────────────────────── */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-20
                      bg-[#161b27]/95 dark:bg-[#0d1f5c]/95
                      backdrop-blur-md
                      border-t border-[#d0c2ff]/60 dark:border-[#7c3aed]/22
                      flex justify-around px-1 py-1
                      transition-colors duration-200">
                {NAV.map(({ to, icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl
               text-xs font-semibold transition-all duration-150 min-w-0 flex-1
               ${isActive
                                ? 'text-brand-500 dark:text-brand-300 bg-[#1c2333] dark:bg-brand-500/15'
                                : 'text-[#9d8fc4] dark:text-[#64748b] hover:text-[#94a3b8] dark:hover:text-slate-300'
                            }`
                        }
                    >
                        <span className="text-xl leading-none">{icon}</span>
                        <span className="truncate w-full text-center leading-tight">{label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* ── Main content ──────────────────────────────────── */}
            <main className="flex-1 md:ml-64 pt-14 md:pt-0 pb-20 md:pb-0 min-w-0 dark:bg-[#0a1240]">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    className="max-w-4xl mx-auto px-4 sm:px-6 py-5 sm:py-7"
                >
                    <Outlet />
                </motion.div>
            </main>
        </div>
    )
}