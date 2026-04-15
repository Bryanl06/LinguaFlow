# LinguaFlow — TFG DAM2

> Plataforma web de aprendizaje de inglés de nivel A1 a C2 con ejercicios
> interactivos, repetición espaciada (SM-2) y gamificación.

## Stack tecnológico

| Capa         | Tecnología                                        |
|--------------|--------------------------------------------------|
| Frontend     | React 18 · Vite · TailwindCSS v3 · Framer Motion |
| Backend      | Node.js · Express (ESM) · Helmet · Rate limiting  |
| Base de datos| Supabase (PostgreSQL · Auth · Storage · RLS)      |
| APIs externas| LanguageTool · Free Dictionary API · Open Trivia  |

## Estructura del repositorio

```
linguaflow/
├── frontend/          React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── store/
│   ├── vercel.json    Configuración de deploy en Vercel
│   └── .env.example
└── backend/
    ├── src/
    │   ├── routes/
    │   ├── services/
    │   └── middleware/
    ├── render.yaml    Configuración de deploy en Render
    ├── supabase_setup.sql
    ├── fix_rls_policies.sql
    ├── seed_full_lessons.sql
    └── .env.example
```

## Instalación local

### Requisitos previos
- Node.js 18+
- Cuenta en [Supabase](https://supabase.com) (gratuita)

### 1. Base de datos (Supabase)

En el **SQL Editor** de Supabase ejecuta estos archivos en orden:

```
backend/supabase_setup.sql      → crea tablas y RLS
backend/fix_rls_policies.sql    → corrige políticas
backend/seed_full_lessons.sql   → carga 40 lecciones A1–C2
```

### 2. Backend

```bash
cd backend
cp .env.example .env
# Edita .env con tus credenciales de Supabase
npm install
npm run dev          # http://localhost:3000
```

### 3. Frontend

```bash
cd frontend
cp .env.example .env
# Edita .env con tus credenciales de Supabase
npm install
npm run dev          # http://localhost:5173
```

## Variables de entorno

### `backend/.env`

```env
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173
SUPABASE_URL=https://TU_PROYECTO.supabase.co
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### `frontend/.env`

```env
VITE_SUPABASE_URL=https://TU_PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=...
VITE_API_URL=http://localhost:3000
```

## Deploy en producción

| Servicio    | Plataforma | Coste    |
|-------------|-----------|----------|
| Frontend    | Vercel    | Gratis   |
| Backend     | Render    | Gratis*  |
| Base datos  | Supabase  | Gratis   |

*El plan gratuito de Render duerme tras 15 min de inactividad.

### Frontend → Vercel
1. Importa el repo en [vercel.com](https://vercel.com)
2. Root directory: `frontend`
3. Añade las variables de entorno del `.env` en el dashboard
4. El `vercel.json` ya gestiona el routing de React Router

### Backend → Render
1. Crea un **Web Service** en [render.com](https://render.com)
2. Root directory: `backend`
3. Build: `npm install` · Start: `node src/app.js`
4. Añade las variables de entorno
5. En `FRONTEND_URL` pon la URL de Vercel: `https://tu-app.vercel.app`

## Funcionalidades

- 40 lecciones A1 → C2 con 100+ ejercicios (opción múltiple, completar, flashcards, escucha)
- 115 temas de gramática con explicaciones, ejemplos y audio
- Algoritmo SM-2 de repetición espaciada
- Sistema de XP, niveles (1–9) y rachas diarias
- 8 logros desbloqueables
- Leaderboard global
- Corrector gramatical (LanguageTool)
- TTS multicapa: Edge Neural → Google → ElevenLabs → Web Speech
- 3 acentos: British, American, Australian
- Modo oscuro / claro
- Responsive (móvil, tablet, escritorio)

## Autor

TFG DAM2 — Desarrollo de Aplicaciones Multiplataforma
