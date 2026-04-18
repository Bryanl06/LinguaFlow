import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useRegister } from '../../hooks'
import { useAuthStore } from '../../store/authStore'

function PasswordInput({ value, onChange, placeholder, autoComplete, minLength }) {
    const [show, setShow] = useState(false)

    const strength = (() => {
        if (!value) return 0
        let s = 0
        if (value.length >= 6) s++
        if (value.length >= 10) s++
        if (/[A-Z]/.test(value)) s++
        if (/[0-9]/.test(value)) s++
        if (/[^a-zA-Z0-9]/.test(value)) s++
        return s
    })()

    const strengthLabel = ['', 'Muy débil', 'Débil', 'Regular', 'Buena', 'Excelente'][strength]
    const strengthColor = ['', '#ef4444', '#f97316', '#eab308', '#22c55e', '#7c3aed'][strength]

    return (
        <div className="space-y-2">
            <div className="relative">
                <input type={show ? 'text' : 'password'}
                    value={value} onChange={onChange}
                    placeholder={placeholder} autoComplete={autoComplete}
                    minLength={minLength} required className="input-base pr-12" />
                <button type="button" onClick={() => setShow(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors p-1"
                    style={{ color: '#7c6faa' }}
                    aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                    {show ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    )}
                </button>
            </div>

            {value.length > 0 && (
                <div className="space-y-1">
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="h-1.5 flex-1 rounded-full transition-all duration-300"
                                style={{ background: i <= strength ? strengthColor : 'rgba(124,58,237,0.15)' }} />
                        ))}
                    </div>
                    <p className="text-xs font-medium" style={{ color: strengthColor }}>{strengthLabel}</p>
                </div>
            )}
        </div>
    )
}

export default function Register() {
    const [form, setForm] = useState({ email: '', password: '', username: '' })
    const register = useRegister()
    const darkMode = useAuthStore(s => s.darkMode)
    const toggleDark = useAuthStore(s => s.toggleDarkMode)

    const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

    /* ── Paleta según modo ── */
    const bg2 = darkMode ? 'rgba(15,14,32,0.90)' : 'rgba(22,27,39,0.95)'
    const border = darkMode ? 'rgba(124,58,237,0.30)' : 'rgba(99,102,241,0.25)'
    const txt = darkMode ? '#e8e4ff' : '#e2e8f0'
    const txt2 = darkMode ? '#a89fd4' : '#94a3b8'
    const txt3 = darkMode ? '#6b619e' : '#64748b'

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10
                    relative overflow-hidden transition-colors duration-300 bg-grid"
            style={{
                background: darkMode
                    ? 'linear-gradient(160deg,#07060f 0%,#0a0919 50%,#0f0e20 100%)'
                    : 'linear-gradient(160deg,#0f1117 0%,#131620 50%,#0f1117 100%)'
            }}>

            {/* Blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute -top-24 right-1/3 w-96 h-96 rounded-full blur-3xl"
                    style={{
                        background: darkMode
                            ? 'radial-gradient(circle,rgba(41,121,255,0.18),transparent 70%)'
                            : 'radial-gradient(circle,rgba(34,211,238,0.18),transparent 70%)'
                    }} />
                <div className="absolute bottom-10 left-1/4 w-72 h-72 rounded-full blur-3xl"
                    style={{
                        background: darkMode
                            ? 'radial-gradient(circle,rgba(124,58,237,0.15),transparent 70%)'
                            : 'radial-gradient(circle,rgba(139,92,246,0.20),transparent 70%)'
                    }} />
                <div className="absolute top-1/2 right-10 w-48 h-48 rounded-full blur-3xl"
                    style={{
                        background: darkMode
                            ? 'radial-gradient(circle,rgba(6,182,212,0.10),transparent 70%)'
                            : 'radial-gradient(circle,rgba(6,182,212,0.15),transparent 70%)'
                    }} />
            </div>

            {/* Toggle tema */}
            <button onClick={toggleDark}
                className="fixed top-4 right-4 w-10 h-10 rounded-xl flex items-center
                   justify-center text-lg hover:scale-105 transition-all"
                style={{
                    background: bg2, border: `1px solid ${border}`,
                    boxShadow: darkMode ? '0 4px 20px rgba(124,58,237,0.20)' : '0 4px 20px rgba(0,0,0,0.35)'
                }}
                aria-label="Cambiar tema">
                {darkMode ? '☀️' : '🌙'}
            </button>

            <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="font-display text-3xl font-extrabold"
                        style={{ color: darkMode ? '#ae96ff' : '#a5b4fc' }}>
                        Lingua<span className="text-accent-500">Flow</span>
                    </Link>
                    <p className="mt-2 text-sm" style={{ color: txt2 }}>Crea tu cuenta — es gratis 🚀</p>
                </div>

                {/* Card */}
                <div className="rounded-3xl p-7 sm:p-8"
                    style={{
                        background: bg2, border: `1px solid ${border}`,
                        boxShadow: darkMode
                            ? '0 8px 40px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 1px rgba(124,58,237,0.10)'
                            : '0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(99,102,241,0.12)',
                        backdropFilter: 'blur(20px)'
                    }}>

                    <h1 className="font-display text-2xl font-bold mb-6" style={{ color: txt }}>
                        Crear cuenta
                    </h1>

                    <form onSubmit={e => { e.preventDefault(); register.mutate(form) }} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold mb-1.5" style={{ color: txt2 }}>
                                Nombre de usuario
                            </label>
                            <input type="text" value={form.username} onChange={set('username')}
                                placeholder="juanito99" required minLength={3} maxLength={30}
                                pattern="[a-zA-Z0-9_]+" title="Solo letras, números y guiones bajos"
                                autoComplete="username" className="input-base" />
                            <p className="mt-1 text-xs" style={{ color: txt3 }}>
                                Solo letras, números y guiones bajos (_)
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1.5" style={{ color: txt2 }}>
                                Email
                            </label>
                            <input type="email" value={form.email} onChange={set('email')}
                                placeholder="tu@email.com" required autoComplete="email"
                                className="input-base" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1.5" style={{ color: txt2 }}>
                                Contraseña
                            </label>
                            <PasswordInput value={form.password} onChange={set('password')}
                                placeholder="Mínimo 6 caracteres"
                                autoComplete="new-password" minLength={6} />
                        </div>

                        <button type="submit" disabled={register.isPending} className="btn-primary w-full">
                            {register.isPending ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                    Creando cuenta...
                                </span>
                            ) : 'Crear cuenta gratis →'}
                        </button>
                    </form>

                    {register.isError && (
                        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-3 rounded-2xl text-sm text-center font-medium"
                            style={{ background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171' }}>
                            {register.error?.response?.data?.error ?? 'Error al registrarse'}
                        </motion.div>
                    )}

                    <div className="divider-neon mt-6" />

                    <p className="text-center text-sm mt-3" style={{ color: txt3 }}>
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/login" className="font-semibold hover:underline"
                            style={{ color: darkMode ? '#ae96ff' : '#a5b4fc' }}>
                            Iniciar sesión
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}