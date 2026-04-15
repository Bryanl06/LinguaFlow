import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            session: null,
            profile: null,
            isRestoring: true,
            darkMode: false,

            setUser: (user) => set({ user }),
            setSession: (session) => set({ session }),
            setProfile: (profile) => set({ profile }),
            setIsRestoring: (v) => set({ isRestoring: v }),

            toggleDarkMode: () => {
                const next = !get().darkMode
                set({ darkMode: next })
                document.documentElement.classList.toggle('dark', next)
            },

            initDarkMode: () => {
                const { darkMode } = get()
                document.documentElement.classList.toggle('dark', darkMode)
            },

            updateProfile: (updates) =>
                set({ profile: { ...get().profile, ...updates } }),

            clearAuth: () => set({ user: null, session: null, profile: null }),
        }),
        {
            name: 'englishapp-auth',
            partialize: (state) => ({
                user: state.user,
                profile: state.profile,
                darkMode: state.darkMode,
            }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.isRestoring = true
                    // Aplicar modo oscuro guardado al cargar
                    document.documentElement.classList.toggle('dark', !!state.darkMode)
                }
            },
        }
    )
)