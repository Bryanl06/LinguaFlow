import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const VARIANTS = {
    success: {
        border: '#22c55e',
        bg: 'rgba(34,197,94,0.08)',
        icon: '✓',
        iconBg: 'rgba(34,197,94,0.18)',
        iconColor: '#4ade80',
        glow: 'rgba(34,197,94,0.12)',
    },
    error: {
        border: '#ef4444',
        bg: 'rgba(239,68,68,0.08)',
        icon: '✕',
        iconBg: 'rgba(239,68,68,0.18)',
        iconColor: '#f87171',
        glow: 'rgba(239,68,68,0.12)',
    },
    warning: {
        border: '#f59e0b',
        bg: 'rgba(245,158,11,0.08)',
        icon: '!',
        iconBg: 'rgba(245,158,11,0.18)',
        iconColor: '#fbbf24',
        glow: 'rgba(245,158,11,0.12)',
    },
    info: {
        border: '#6366f1',
        bg: 'rgba(99,102,241,0.08)',
        icon: 'i',
        iconBg: 'rgba(99,102,241,0.18)',
        iconColor: '#a5b4fc',
        glow: 'rgba(99,102,241,0.12)',
    },
}

function FlowbiteToast({ t, variant = 'info', title, message, customIcon }) {
    const v = VARIANTS[variant] ?? VARIANTS.info

    return (
        <motion.div
            initial={{ opacity: 0, y: -18, scale: 0.94 }}
            animate={{
                opacity: t.visible ? 1 : 0,
                y: t.visible ? 0 : -18,
                scale: t.visible ? 1 : 0.94,
            }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            role="alert"
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                maxWidth: '360px',
                padding: '13px 14px',
                borderRadius: '14px',
                background: v.bg,
                border: `1px solid ${v.border}35`,
                borderLeft: `3px solid ${v.border}`,
                boxShadow: `0 8px 32px rgba(0,0,0,0.40), 0 0 0 1px ${v.border}12, 0 4px 16px ${v.glow}`,
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                fontFamily: '"Nunito", sans-serif',
            }}
        >
            {/* Icono */}
            <motion.div
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.06, type: 'spring', stiffness: 420 }}
                style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: v.iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: v.iconColor,
                    fontWeight: '800',
                    fontSize: customIcon ? '17px' : '12px',
                    border: `1px solid ${v.border}25`,
                }}
            >
                {customIcon ?? v.icon}
            </motion.div>

            {/* Texto */}
            <div style={{ flex: 1, minWidth: 0 }}>
                {title && (
                    <p style={{
                        fontWeight: '700',
                        fontSize: '13px',
                        color: '#e2e8f0',
                        lineHeight: '1.3',
                        marginBottom: message ? '2px' : 0,
                    }}>
                        {title}
                    </p>
                )}
                <p style={{
                    fontSize: '12px',
                    color: title ? '#94a3b8' : '#e2e8f0',
                    fontWeight: title ? '400' : '600',
                    lineHeight: '1.4',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}>
                    {message}
                </p>
            </div>

            {/* Botón × estilo Flowbite */}
            <button
                onClick={() => toast.dismiss(t.id)}
                aria-label="Cerrar notificación"
                style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '6px',
                    border: '1px solid transparent',
                    background: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#64748b',
                    fontSize: '13px',
                    flexShrink: 0,
                    transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'
                    e.currentTarget.style.color = '#e2e8f0'
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.borderColor = 'transparent'
                    e.currentTarget.style.color = '#64748b'
                }}
            >
                ✕
            </button>
        </motion.div>
    )
}

/* ── Toast de logro ─────────────────────────────────────────── */
function AchievementToast({ t, name, icon = '🏆', description }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.92 }}
            animate={{
                opacity: t.visible ? 1 : 0,
                y: t.visible ? 0 : -20,
                scale: t.visible ? 1 : 0.92,
            }}
            transition={{ type: 'spring', stiffness: 340, damping: 26 }}
            role="alert"
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                maxWidth: '360px',
                padding: '13px 14px',
                borderRadius: '14px',
                background: 'rgba(245,158,11,0.09)',
                border: '1px solid rgba(245,158,11,0.30)',
                borderLeft: '3px solid #f59e0b',
                boxShadow: '0 8px 32px rgba(0,0,0,0.45), 0 0 24px rgba(245,158,11,0.15)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                fontFamily: '"Nunito", sans-serif',
            }}
        >
            <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.08, type: 'spring', stiffness: 420, damping: 16 }}
                style={{
                    width: '38px', height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(245,158,11,0.20)',
                    border: '1px solid rgba(245,158,11,0.30)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px', flexShrink: 0,
                }}
            >
                {icon}
            </motion.div>

            <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                    fontSize: '10px', fontWeight: '800',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: '#fbbf24', marginBottom: '2px',
                }}>
                    ¡Logro desbloqueado!
                </p>
                <p style={{
                    fontWeight: '700', fontSize: '13px', color: '#e2e8f0',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                    {name}
                </p>
                {description && (
                    <p style={{
                        fontSize: '11px', color: '#94a3b8', marginTop: '1px',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                        {description}
                    </p>
                )}
            </div>

            <button
                onClick={() => toast.dismiss(t.id)}
                aria-label="Cerrar"
                style={{
                    width: '26px', height: '26px', borderRadius: '6px',
                    border: '1px solid transparent', background: 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: '#78716c', fontSize: '13px', flexShrink: 0,
                    transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#e2e8f0' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#78716c' }}
            >
                ✕
            </button>
        </motion.div>
    )
}

/* ── API pública — sustituye a toast.success/error directamente ─ */
export const showToast = {
    success: (message, title) =>
        toast.custom(t => <FlowbiteToast t={t} variant="success" message={message} title={title} />,
            { duration: 3500 }),

    error: (message, title) =>
        toast.custom(t => <FlowbiteToast t={t} variant="error" message={message} title={title} />,
            { duration: 4500 }),

    warning: (message, title) =>
        toast.custom(t => <FlowbiteToast t={t} variant="warning" message={message} title={title} />,
            { duration: 4000 }),

    info: (message, title) =>
        toast.custom(t => <FlowbiteToast t={t} variant="info" message={message} title={title} />,
            { duration: 3500 }),

    achievement: ({ name, icon, description } = {}) =>
        toast.custom(t => <AchievementToast t={t} name={name} icon={icon} description={description} />,
            { duration: 5000 }),
}

export { FlowbiteToast, AchievementToast }