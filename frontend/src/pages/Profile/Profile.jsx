import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis,
    ResponsiveContainer, Tooltip,
} from 'recharts'
import {
    useAccuracy, useAchievements, useLeaderboard,
    useUpdateProfile, useUploadAvatar,
} from '../../hooks'
import { useAuthStore } from '../../store/authStore'
import XPBar from '../../components/gamification/XPBar'

/* ── Avatar ──────────────────────────────────────────────────── */
function AvatarUpload({ profile, isUploading, onFileSelect }) {
    const inputRef = useRef(null)
    const initials = profile?.username?.[0]?.toUpperCase() ?? '?'

    return (
        <div className="relative flex-shrink-0">
            <div
                className="w-24 h-24 rounded-3xl overflow-hidden cursor-pointer group"
                style={{ boxShadow: '0 0 0 3px rgba(99,102,241,0.35), 0 8px 24px rgba(0,0,0,0.35)' }}
                onClick={() => inputRef.current?.click()}
                title="Cambiar foto de perfil"
            >
                {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                        {initials}
                    </div>
                )}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                        transition-opacity flex items-center justify-center rounded-3xl"
                    style={{ background: 'rgba(0,0,0,0.50)' }}>
                    {isUploading
                        ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        : <span className="text-white text-xl">📷</span>}
                </div>
            </div>
            <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) onFileSelect(f); e.target.value = '' }} />
            <button onClick={() => inputRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full
                   text-white text-xs flex items-center justify-center transition-all"
                style={{
                    background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                    boxShadow: '0 4px 12px rgba(99,102,241,0.50)'
                }}>
                ✏️
            </button>
        </div>
    )
}

/* ── Formulario de edición ───────────────────────────────────── */
function EditProfileForm({ profile, onClose }) {
    const [username, setUsername] = useState(profile?.username ?? '')
    const updateProfile = useUpdateProfile()

    const handleSubmit = e => {
        e.preventDefault()
        if (username.trim() === profile?.username) { onClose(); return }
        updateProfile.mutate({ username: username.trim() }, { onSuccess: onClose })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="card mt-4"
            style={{ border: '1px solid rgba(99,102,241,0.30)' }}
        >
            <h3 className="font-display font-bold mb-4" style={{ color: 'var(--c-text)' }}>
                Editar perfil
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--c-text-2)' }}>
                        Nombre de usuario
                    </label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                        minLength={3} maxLength={30} pattern="[a-zA-Z0-9_]+" required className="input-base" />
                    <p className="mt-1 text-xs" style={{ color: 'var(--c-text-3)' }}>
                        Solo letras, números y guiones bajos. Mínimo 3 caracteres.
                    </p>
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--c-text-2)' }}>
                        Email
                    </label>
                    <input type="email" value={profile?.email ?? ''} disabled
                        className="input-base cursor-not-allowed"
                        style={{ opacity: 0.5 }} />
                    <p className="mt-1 text-xs" style={{ color: 'var(--c-text-3)' }}>
                        El email no se puede cambiar desde aquí.
                    </p>
                </div>
                <div className="flex gap-3 pt-2">
                    <button type="button" onClick={onClose} className="btn-secondary flex-1 py-2.5">Cancelar</button>
                    <button type="submit" disabled={updateProfile.isPending || username.trim().length < 3}
                        className="btn-primary flex-1 py-2.5">
                        {updateProfile.isPending ? 'Guardando...' : 'Guardar cambios'}
                    </button>
                </div>
                {updateProfile.isError && (
                    <p className="text-sm text-center font-medium" style={{ color: '#f87171' }}>
                        {updateProfile.error?.response?.data?.error ?? 'Error al guardar'}
                    </p>
                )}
            </form>
        </motion.div>
    )
}

/* ── Badge de logro ──────────────────────────────────────────── */
function AchievementBadge({ achievement }) {
    return (
        <motion.div
            whileHover={{ scale: achievement.earned ? 1.04 : 1 }}
            className="card text-center py-5 transition-all duration-300"
            style={achievement.earned ? {
                borderColor: 'rgba(99,102,241,0.35)',
                boxShadow: '0 4px 20px rgba(99,102,241,0.15)',
            } : { opacity: 0.4, filter: 'grayscale(1)' }}
        >
            <div className="text-3xl mb-2">{achievement.icon}</div>
            <p className="font-bold text-sm" style={{ color: 'var(--c-text)' }}>{achievement.name}</p>
            <p className="text-xs mt-1 leading-snug" style={{ color: 'var(--c-text-3)' }}>
                {achievement.description}
            </p>
            {achievement.earned && (
                <p className="text-xs font-semibold mt-2" style={{ color: '#a5b4fc' }}>
                    ✓ {new Date(achievement.earned_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                </p>
            )}
        </motion.div>
    )
}

/* ── Tooltip del radar ───────────────────────────────────────── */
function RadarTooltip({ active, payload }) {
    if (!active || !payload?.length) return null
    return (
        <div className="rounded-2xl px-3 py-2 text-sm"
            style={{
                background: 'var(--c-surface)', border: '1px solid var(--c-border)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.35)'
            }}>
            <p className="font-bold" style={{ color: '#a5b4fc' }}>
                {payload[0]?.value ?? 0}%
            </p>
        </div>
    )
}

/* ── Página principal ────────────────────────────────────────── */
export default function Profile() {
    const profile = useAuthStore(s => s.profile)
    const [editOpen, setEditOpen] = useState(false)

    const { data: accuracy = [] } = useAccuracy()
    const { data: achievements = [] } = useAchievements()
    const { data: leaderboard = [] } = useLeaderboard()
    const uploadAvatar = useUploadAvatar()

    const TYPE_LABELS = {
        fill_blank: 'Completar', multiple_choice: 'Opción múltiple',
        flashcard: 'Tarjetas', listening: 'Escucha', speaking: 'Habla',
    }
    const radarData = accuracy.map(a => ({
        tipo: TYPE_LABELS[a.type] ?? a.type, precision: a.accuracy, fullMark: 100,
    }))
    const earned = achievements.filter(a => a.earned).length
    const total = achievements.length

    /* Medallas del podio */
    const podiumIcon = i => i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : String(i + 1)
    const podiumBg = i =>
        i === 0 ? 'rgba(234,179,8,0.18)' :
            i === 1 ? 'rgba(148,163,184,0.15)' :
                i === 2 ? 'rgba(249,115,22,0.15)' :
                    'rgba(99,102,241,0.10)'

    return (
        <div className="space-y-6 max-w-3xl mx-auto">

            {/* ── Header ── */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="card card-neon">
                    <div className="flex items-start gap-5">
                        <AvatarUpload
                            profile={profile}
                            isUploading={uploadAvatar.isPending}
                            onFileSelect={file => uploadAvatar.mutate(file)}
                        />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="font-display text-2xl font-bold truncate"
                                    style={{ color: 'var(--c-text)' }}>
                                    {profile?.username ?? '—'}
                                </h1>
                                <button
                                    onClick={() => setEditOpen(v => !v)}
                                    className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                                    style={editOpen
                                        ? { background: 'var(--c-surface-alt)', color: 'var(--c-text-3)' }
                                        : {
                                            background: 'rgba(99,102,241,0.15)', color: '#a5b4fc',
                                            border: '1px solid rgba(99,102,241,0.30)'
                                        }}
                                >
                                    {editOpen ? 'Cerrar' : '✏️ Editar perfil'}
                                </button>
                            </div>
                            <p className="text-sm mt-0.5" style={{ color: 'var(--c-text-3)' }}>
                                {profile?.email ?? ''}
                            </p>
                            <p className="text-sm" style={{ color: 'var(--c-text-3)' }}>
                                Miembro desde{' '}
                                {profile?.created_at
                                    ? new Date(profile.created_at).toLocaleDateString('es-ES',
                                        { month: 'long', year: 'numeric' })
                                    : '—'}
                            </p>

                            {/* Badges */}
                            <div className="flex items-center gap-2 mt-3 flex-wrap">
                                <span className="level-badge text-[#a5b4fc]"
                                    style={{
                                        background: 'rgba(99,102,241,0.18)',
                                        border: '1px solid rgba(99,102,241,0.30)'
                                    }}>
                                    Nivel {profile?.level ?? 1}
                                </span>
                                {(profile?.streak_days ?? 0) > 0 && (
                                    <span className="level-badge text-orange-300"
                                        style={{
                                            background: 'rgba(249,115,22,0.15)',
                                            border: '1px solid rgba(249,115,22,0.25)'
                                        }}>
                                        🔥 {profile.streak_days} días
                                    </span>
                                )}
                                <span className="level-badge text-amber-300"
                                    style={{
                                        background: 'rgba(245,158,11,0.15)',
                                        border: '1px solid rgba(245,158,11,0.25)'
                                    }}>
                                    ⭐ {profile?.xp ?? 0} XP
                                </span>
                            </div>
                        </div>
                    </div>

                    <AnimatePresence>
                        {editOpen && (
                            <EditProfileForm profile={profile} onClose={() => setEditOpen(false)} />
                        )}
                    </AnimatePresence>

                    <div className="mt-5 pt-5" style={{ borderTop: '1px solid var(--c-border)' }}>
                        <XPBar xp={profile?.xp ?? 0} level={profile?.level ?? 1} />
                    </div>
                </div>
            </motion.div>

            {/* ── Stats rápidas ── */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { icon: '🏆', value: `${earned}/${total}`, label: 'Logros', accent: '#f59e0b' },
                    { icon: '⭐', value: profile?.xp ?? 0, label: 'XP total', accent: '#a5b4fc' },
                    { icon: '🔥', value: profile?.streak_days ?? 0, label: 'Racha', accent: '#f97316' },
                    { icon: '📊', value: profile?.level ?? 1, label: 'Nivel', accent: '#22d3ee' },
                ].map(s => (
                    <div key={s.label} className="card text-center py-4 card-hover">
                        <p className="text-2xl mb-1">{s.icon}</p>
                        <p className="font-display font-extrabold text-xl" style={{ color: s.accent }}>
                            {s.value}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--c-text-3)' }}>{s.label}</p>
                    </div>
                ))}
            </motion.div>

            {/* ── Radar de precisión ── */}
            {radarData.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }} className="card">
                    <h2 className="font-display font-bold text-lg mb-4" style={{ color: 'var(--c-text)' }}>
                        Precisión por tipo de ejercicio
                    </h2>
                    <ResponsiveContainer width="100%" height={240}>
                        <RadarChart data={radarData}>
                            <PolarGrid stroke="rgba(99,102,241,0.20)" />
                            <PolarAngleAxis dataKey="tipo"
                                tick={{ fontSize: 12, fill: 'var(--c-text-2)', fontFamily: 'Nunito, sans-serif' }} />
                            <Radar dataKey="precision"
                                stroke="#8b5cf6" fill="#6366f1" fillOpacity={0.18} strokeWidth={2} />
                            <Tooltip content={<RadarTooltip />} />
                        </RadarChart>
                    </ResponsiveContainer>
                </motion.div>
            )}

            {/* ── Logros ── */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-bold text-lg" style={{ color: 'var(--c-text)' }}>
                        Logros
                    </h2>
                    <span className="text-sm font-bold" style={{ color: '#a5b4fc' }}>
                        {earned} / {total} desbloqueados
                    </span>
                </div>
                {achievements.length === 0 ? (
                    <div className="card text-center py-10">
                        <p className="text-3xl mb-2">🏆</p>
                        <p className="font-medium" style={{ color: 'var(--c-text-3)' }}>
                            Completa ejercicios para desbloquear logros
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {achievements.map(ach => <AchievementBadge key={ach.id} achievement={ach} />)}
                    </div>
                )}
            </motion.div>

            {/* ── Leaderboard ── */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }} className="card">
                <h2 className="font-display font-bold text-lg mb-4" style={{ color: 'var(--c-text)' }}>
                    🏅 Clasificación — Top 10
                </h2>
                {leaderboard.length === 0 ? (
                    <p className="text-center py-6" style={{ color: 'var(--c-text-3)' }}>
                        Sin datos todavía
                    </p>
                ) : (
                    <ul className="space-y-2">
                        {leaderboard.map((u, i) => {
                            const isMe = u.username === profile?.username
                            return (
                                <li key={u.id}
                                    className="flex items-center gap-3 p-3 rounded-2xl transition-all duration-200"
                                    style={{
                                        background: isMe
                                            ? 'rgba(99,102,241,0.12)'
                                            : 'transparent',
                                        border: `1px solid ${isMe ? 'rgba(99,102,241,0.28)' : 'transparent'}`,
                                    }}
                                    onMouseEnter={e => { if (!isMe) e.currentTarget.style.background = 'var(--c-surface-alt)' }}
                                    onMouseLeave={e => { if (!isMe) e.currentTarget.style.background = 'transparent' }}
                                >
                                    {/* Posición */}
                                    <span className="w-8 h-8 rounded-xl flex items-center justify-center
                                   text-sm font-bold flex-shrink-0"
                                        style={{ background: podiumBg(i) }}>
                                        {podiumIcon(i)}
                                    </span>
                                    {/* Avatar */}
                                    {u.avatar_url
                                        ? <img src={u.avatar_url} alt={u.username}
                                            className="w-8 h-8 rounded-xl object-cover flex-shrink-0" />
                                        : <div className="w-8 h-8 rounded-xl flex items-center justify-center
                                      text-sm font-bold flex-shrink-0"
                                            style={{ background: 'rgba(99,102,241,0.20)', color: '#a5b4fc' }}>
                                            {u.username[0].toUpperCase()}
                                        </div>
                                    }
                                    {/* Nombre */}
                                    <span className="font-semibold flex-1 truncate"
                                        style={{ color: isMe ? '#a5b4fc' : 'var(--c-text)' }}>
                                        {u.username}
                                        {isMe && (
                                            <span className="ml-1.5 text-xs font-normal"
                                                style={{ color: 'var(--c-text-3)' }}>(tú)</span>
                                        )}
                                    </span>
                                    {/* XP */}
                                    <span className="text-sm font-bold flex-shrink-0"
                                        style={{ color: 'var(--c-text-2)' }}>
                                        {u.xp} XP
                                    </span>
                                    {/* Racha */}
                                    <span className="text-xs font-semibold flex-shrink-0"
                                        style={{ color: '#fb923c' }}>
                                        🔥 {u.streak_days}
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </motion.div>

        </div>
    )
}