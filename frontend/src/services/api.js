import axios from 'axios'
import { supabase } from './supabaseClient'

// En dev usa el proxy de Vite ('/api' → localhost:3000/api)
// En producción usa la URL del backend desplegado en Render
const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

// ── Interceptor REQUEST — adjunta JWT ─────────────────────────────────────────
api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession()
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`
  }
  return config
})

// ── Interceptor RESPONSE — renueva token en 401 ───────────────────────────────
let _refreshing = false

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error.response?.status

    if (status === 401 && !error.config._retry) {
      if (_refreshing) return Promise.reject(error)

      _refreshing = true
      error.config._retry = true

      try {
        const { data: { session }, error: refreshError } = await supabase.auth.refreshSession()
        if (!refreshError && session?.access_token) {
          error.config.headers.Authorization = `Bearer ${session.access_token}`
          _refreshing = false
          return api.request(error.config)
        }
      } catch {
        // Token inválido — onAuthStateChange cerrará sesión automáticamente
      }

      _refreshing = false
    }

    return Promise.reject(error)
  }
)

// ── APIs por recurso ──────────────────────────────────────────────────────────

export const lessonsAPI = {
  getAll: (params) => api.get('/lessons', { params }),
  getById: (id) => api.get(`/lessons/${id}`),
  create: (data) => api.post('/lessons', data),
}

export const exercisesAPI = {
  getAll: (params) => api.get('/exercises', { params }),
  getById: (id) => api.get(`/exercises/${id}`),
  getReview: () => api.get('/exercises/review'),
}

export const progressAPI = {
  submit: (data) => api.post('/progress/submit', data),
  getAll: () => api.get('/progress'),
}

export const statsAPI = {
  dashboard: () => api.get('/stats/dashboard'),
  accuracy: () => api.get('/stats/accuracy'),
}

export const usersAPI = {
  profile: () => api.get('/users/profile'),
  update: (data) => api.patch('/users/profile', data),
  leaderboard: () => api.get('/users/leaderboard'),
  uploadAvatar: (file) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const base64 = reader.result.split(',')[1]
        const res = await api.post('/users/avatar', { base64, mimeType: file.type })
        resolve(res)
      } catch (err) { reject(err) }
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  }),
}

export const achievementsAPI = {
  getAll: () => api.get('/achievements'),
}

export const theoryAPI = {
  getAll: (params) => api.get('/theory', { params }),
  getBySlug: (slug) => api.get(`/theory/${slug}`),
  regenerate: (slug) => api.post(`/theory/${slug}/regenerate`),
  checkGrammar: (text) => api.post('/theory/check-grammar', { text }),
}

export const youtubeAPI = {
  // Busca vídeos educativos de inglés usando YouTube Data API v3
  search: async (query, maxResults = 3) => {
    const key = import.meta.env.VITE_YOUTUBE_API_KEY
    if (!key) return []
    const params = new URLSearchParams({
      part: 'snippet',
      q: query,
      type: 'video',
      maxResults,
      safeSearch: 'strict',
      key,
    })
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`)
    if (!res.ok) return []
    const data = await res.json()
    return (data.items ?? []).map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails?.medium?.url ?? '',
    }))
  },
}

export default api