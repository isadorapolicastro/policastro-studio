import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: https://isadorapolicastro.github.io/policastro-studio/
// Com domínio próprio, troque base para '/'.
export default defineConfig({
  base: '/policastro-studio/',
  plugins: [react()],
})
