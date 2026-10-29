import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ⚠️ КРИТИЧНО ДЛЯ GITHUB PAGES:
  // Используем относительный путь './', чтобы избежать двойного префикса /repo-name/repo-name/
  base: './', 
})
