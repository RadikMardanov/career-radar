import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Имя репозитория = префикс всех путей. Совпадает с basename в App.tsx.
  base: '/career-radar/',
})
