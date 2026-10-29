import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Для GitHub Pages используем относительный путь './' вместо абсолютного '/career-radar/'
  // Это гарантирует, что ассеты будут искаться относительно текущего HTML файла
  base: './', 
})
