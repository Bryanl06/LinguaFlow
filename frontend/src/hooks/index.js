import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { showToast } from '../components/UI/Toast'
import { supabase } from '../services/supabaseClient'
import { useAuthStore } from '../store/authStore'
import api, {
    lessonsAPI, exercisesAPI,
    progressAPI, statsAPI, usersAPI, achievementsAPI, theoryAPI,
} from '../services/api'

// ── AUTH ───────────────────────────────────────────────────────────────────────
// Login y register van DIRECTAMENTE contra Supabase desde el frontend.
// El SDK guarda la sesión en su propia caché local (localStorage), así
// getSession() siempre encuentra el token cuando el interceptor lo necesita.

export function useLogin() {
    const { setUser, setProfile, setIsRestoring } = useAuthStore()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async ({ email, password }) => {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password })
            if (error) throw error
            return data  // { user, session }
        },
        onSuccess: async ({ user, session }) => {
            setUser({ id: user.id, email: user.email })
            setIsRestoring(false)

            // Cargar el perfil de la tabla profiles
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .maybeSingle()

            setProfile({
                id: user.id,
                email: user.email,
                username: profile?.username ?? null,
                level: profile?.level ?? 1,
                xp: profile?.xp ?? 0,
                streak_days: profile?.streak_days ?? 0,
                avatar_url: profile?.avatar_url ?? null,
                created_at: profile?.created_at ?? null,
                last_activity: profile?.last_activity ?? null,
            })

            // Actualizar last_activity en profiles
            await supabase
                .from('profiles')
                .update({ last_activity: new Date().toISOString().split('T')[0] })
                .eq('id', user.id)

            showToast.success(`¡Bienvenido, ${profile?.username ?? user.email}!`, '👋 Hola de nuevo')
            navigate('/dashboard')
        },
        onError: (err) => {
            const msg = err.message ?? 'Error al iniciar sesión'
            if (msg.includes('Invalid login')) {
                showToast.error('Email o contraseña incorrectos', 'Error de acceso')
            } else {
                showToast.error(msg, 'Error')
            }
        },
    })
}

export function useRegister() {
    const navigate = useNavigate()

    return useMutation({
        // El backend usa service_role para crear el usuario Y el perfil
        // de forma atómica, sin problemas de RLS
        mutationFn: (data) => api.post('/auth/register', data).then(r => r.data),
        onSuccess: () => {
            showToast.success('¡Cuenta creada! Ya puedes iniciar sesión', '🎉 Bienvenido')
            navigate('/login')
        },
        onError: (err) => {
            showToast.error(err.response?.data?.error ?? err.message ?? 'Error al registrarse', 'Error')
        },
    })
}

export function useLogout() {
    const { clearAuth } = useAuthStore()
    const navigate = useNavigate()
    const qc = useQueryClient()

    return useMutation({
        mutationFn: () => supabase.auth.signOut(),
        onSuccess: () => {
            clearAuth()
            qc.clear()
            navigate('/')
        },
        onError: () => {
            clearAuth()
            qc.clear()
            navigate('/')
        },
    })
}

// ── LESSONS ────────────────────────────────────────────────────────────────────

export function useLessons(filters = {}) {
    const user = useAuthStore(s => s.user)
    return useQuery({
        queryKey: ['lessons', filters],
        queryFn: () => lessonsAPI.getAll(filters).then(r => r.data),
        enabled: !!user,
        placeholderData: [],
    })
}

export function useLesson(id) {
    const user = useAuthStore(s => s.user)
    return useQuery({
        queryKey: ['lesson', id],
        queryFn: () => lessonsAPI.getById(id).then(r => r.data),
        enabled: !!id && !!user,
    })
}

// ── EXERCISES ─────────────────────────────────────────────────────────────────

export function useExercises(params = {}) {
    const user = useAuthStore(s => s.user)
    return useQuery({
        queryKey: ['exercises', params],
        queryFn: () => exercisesAPI.getAll(params).then(r => r.data),
        enabled: !!user,
        placeholderData: [],
    })
}

export function useReviewExercises() {
    const user = useAuthStore(s => s.user)
    return useQuery({
        queryKey: ['exercises', 'review'],
        queryFn: () => exercisesAPI.getReview().then(r => r.data),
        enabled: !!user,
        placeholderData: [],
    })
}

// ── PROGRESS ──────────────────────────────────────────────────────────────────

export function useSubmitAnswer() {
    const qc = useQueryClient()
    const { updateProfile } = useAuthStore()

    return useMutation({
        mutationFn: progressAPI.submit,
        onSuccess: ({ data }) => {
            updateProfile({ xp: data.total_xp, level: data.level, streak_days: data.streak_days })
            qc.invalidateQueries({ queryKey: ['stats'] })
            qc.invalidateQueries({ queryKey: ['exercises', 'review'] })
            if (data.new_achievements?.length > 0) {
                data.new_achievements.forEach(ach => {
                    showToast.achievement({ name: ach.name, icon: ach.icon ?? '🏆', description: ach.description })
                })
            }
        },
        onError: (err) => {
            const msg = err.response?.data?.error ?? err.message ?? 'Error al guardar respuesta'
            showToast.error(msg)
        },
    })
}

// ── STATS ─────────────────────────────────────────────────────────────────────

export function useDashboard() {
    const user = useAuthStore(s => s.user)
    return useQuery({
        queryKey: ['stats', 'dashboard'],
        queryFn: () => statsAPI.dashboard().then(r => r.data),
        enabled: !!user,
        initialData: {
            profile: null,
            today: { exercises_done: 0, correct_answers: 0, xp_earned: 0, minutes_studied: 0 },
            week_activity: [],
            totals: { exercises_completed: 0, pending_review: 0 },
        },
    })
}

export function useAccuracy() {
    const user = useAuthStore(s => s.user)
    return useQuery({
        queryKey: ['stats', 'accuracy'],
        queryFn: () => statsAPI.accuracy().then(r => r.data),
        enabled: !!user,
        placeholderData: [],
    })
}

// ── PROFILE ───────────────────────────────────────────────────────────────────

export function useProfile() {
    const user = useAuthStore(s => s.user)
    const { setProfile } = useAuthStore()
    return useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const { data } = await usersAPI.profile()
            setProfile(data)
            return data
        },
        enabled: !!user,
    })
}

export function useLeaderboard() {
    const user = useAuthStore(s => s.user)
    return useQuery({
        queryKey: ['leaderboard'],
        queryFn: () => usersAPI.leaderboard().then(r => r.data),
        enabled: !!user,
        placeholderData: [],
    })
}

// ── ACHIEVEMENTS ──────────────────────────────────────────────────────────────

export function useAchievements() {
    const user = useAuthStore(s => s.user)
    return useQuery({
        queryKey: ['achievements'],
        queryFn: () => achievementsAPI.getAll().then(r => r.data),
        enabled: !!user,
        placeholderData: [],
    })
}

export function useUpdateProfile() {
    const qc = useQueryClient()
    const { updateProfile } = useAuthStore()
    return useMutation({
        mutationFn: (data) => usersAPI.update(data).then(r => r.data),
        onSuccess: (data) => {
            updateProfile(data)
            qc.invalidateQueries({ queryKey: ['profile'] })
            qc.invalidateQueries({ queryKey: ['leaderboard'] })
            showToast.success('Perfil actualizado correctamente', '✓ Guardado')
        },
        onError: (err) => {
            showToast.error(err.response?.data?.error ?? 'Error al actualizar el perfil', 'Error')
        },
    })
}

export function useUploadAvatar() {
    const qc = useQueryClient()
    const { updateProfile } = useAuthStore()
    return useMutation({
        mutationFn: (file) => usersAPI.uploadAvatar(file).then(r => r.data),
        onSuccess: (data) => {
            updateProfile({ avatar_url: data.avatar_url })
            qc.invalidateQueries({ queryKey: ['profile'] })
            showToast.success('Foto de perfil actualizada', '📷 Avatar')
        },
        onError: (err) => {
            showToast.error(err.response?.data?.error ?? 'Error al subir la imagen', 'Error')
        },
    })
}

// ── THEORY ────────────────────────────────────────────────────────────────────

export function useTheoryTopics(filters = {}) {
    const user = useAuthStore(s => s.user)
    return useQuery({
        queryKey: ['theory', filters],
        queryFn: () => theoryAPI.getAll(filters).then(r => r.data),
        enabled: !!user,
        placeholderData: [],
        staleTime: 1000 * 60 * 10,  // 10 min — los temas no cambian frecuentemente
    })
}

export function useTheoryTopic(slug) {
    const user = useAuthStore(s => s.user)
    return useQuery({
        queryKey: ['theory', 'topic', slug],
        queryFn: () => theoryAPI.getBySlug(slug).then(r => r.data),
        enabled: !!slug && !!user,
        staleTime: 1000 * 60 * 60,  // 1 hora — el contenido es estático
    })
}

// ── YOUTUBE ───────────────────────────────────────────────────────────────────

export function useYouTubeVideos(query, enabled = true) {
    return useQuery({
        queryKey: ['youtube', query],
        queryFn: async () => {
            const { youtubeAPI } = await import('../services/api')
            return youtubeAPI.search(query, 3)
        },
        enabled: !!query && enabled && !!import.meta.env.VITE_YOUTUBE_API_KEY,
        staleTime: 1000 * 60 * 60 * 24,  // 24h — vídeos no cambian
        placeholderData: [],
    })
}