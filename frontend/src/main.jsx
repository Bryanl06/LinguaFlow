import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            retry: 1,
            refetchOnWindowFocus: false,
            gcTime: 1000 * 60 * 10,
        },
        mutations: { retry: 0 },
    },
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
            <Toaster
                position="top-center"
                gutter={8}
                toastOptions={{
                    duration: 3500,
                    style: {
                        background: 'rgba(22,27,39,0.95)',
                        color: '#e2e8f0',
                        borderRadius: '14px',
                        padding: '12px 18px',
                        fontFamily: '"Nunito", sans-serif',
                        fontWeight: '600',
                        fontSize: '13px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.40), 0 0 0 1px rgba(99,102,241,0.15)',
                        border: '1px solid rgba(99,102,241,0.20)',
                        backdropFilter: 'blur(12px)',
                        maxWidth: '360px',
                    },
                    success: {
                        iconTheme: { primary: '#4ade80', secondary: 'rgba(22,27,39,0.95)' },
                        style: {
                            borderLeft: '3px solid #22c55e',
                            background: 'rgba(34,197,94,0.08)',
                            border: '1px solid rgba(34,197,94,0.25)',
                            borderLeftColor: '#22c55e',
                        },
                    },
                    error: {
                        iconTheme: { primary: '#f87171', secondary: 'rgba(22,27,39,0.95)' },
                        style: {
                            borderLeft: '3px solid #ef4444',
                            background: 'rgba(239,68,68,0.08)',
                            border: '1px solid rgba(239,68,68,0.25)',
                            borderLeftColor: '#ef4444',
                        },
                    },
                }}
            />
        </QueryClientProvider>
    </React.StrictMode>
)