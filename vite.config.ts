import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ⚠️ КРИТИЧНО ДЛЯ GITHUB PAGES:
  // Указываем точное имя репозитория как префикс всех путей.
  // Это гарантирует, что ассеты будут искаться по адресу /career-radar/assets/...
  base: '/career-radar/', 
})
