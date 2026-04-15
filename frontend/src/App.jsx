import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from './store/authStore'
import { supabase } from './services/supabaseClient'

import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard'
import LessonList from './pages/Lessons/LessonList'
import LessonDetail from './pages/Lessons/LessonDetail'
import ExerciseRunner from './pages/Exercises/ExerciseRunner'
import Profile from './pages/Profile/Profile'
import ReviewSession from './pages/Exercises/ReviewSession'
import TheoryList from './pages/Theory/TheoryList'
import TheoryDetail from './pages/Theory/TheoryDetail'
import Layout from './components/Layout/Layout'

function AuthLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
        <p className="text-sm text-slate-400 font-medium">Cargando sesión...</p>
      </div>
    </div>
  )
}

function PrivateRoute({ children }) {
  const user = useAuthStore(s => s.user)
  const isRestoring = useAuthStore(s => s.isRestoring)
  if (isRestoring) return <AuthLoader />
  return user ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
  const user = useAuthStore(s => s.user)
  const isRestoring = useAuthStore(s => s.isRestoring)
  if (isRestoring) return <AuthLoader />
  return !user ? children : <Navigate to="/dashboard" replace />
}

export default function App() {
  const { setUser, setSession, setProfile, setIsRestoring, initDarkMode } = useAuthStore()

  // Aplicar dark mode guardado en cuanto monta la app
  useEffect(() => { initDarkMode() }, [])

  useEffect(() => {
    /**
     * onAuthStateChange es la fuente de verdad.
     * Se dispara:
     *  - Al cargar la app (con la sesión guardada en localStorage por Supabase)
     *  - Tras signInWithPassword (login directo con SDK)
     *  - Tras signOut
     *  - Cuando el token se renueva automáticamente
     *
     * Como el login ahora usa el SDK directamente (no el backend),
     * este listener siempre tiene la sesión actualizada.
     */
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setSession(session ?? null)

        if (!session) {
          setProfile(null)
        }

        // Marcar la restauración como completada en cualquier evento
        setIsRestoring(false)
      }
    )

    // Timeout de seguridad: si onAuthStateChange no dispara en 3s
    // (caso extremo), liberar el bloqueo igualmente
    const timeout = setTimeout(() => setIsRestoring(false), 3000)

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeout)
    }
  }, [setUser, setSession, setProfile, setIsRestoring])

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lessons" element={<LessonList />} />
          <Route path="/lessons/:id" element={<LessonDetail />} />
          <Route path="/exercise/:id" element={<ExerciseRunner />} />
          <Route path="/review" element={<ReviewSession />} />
          <Route path="/theory" element={<TheoryList />} />
          <Route path="/theory/:slug" element={<TheoryDetail />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

