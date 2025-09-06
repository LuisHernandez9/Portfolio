import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'my-portfolio' with your repo name if deploying to a project site.
export default defineConfig({
  plugins: [react()],
  base: 'Portfolio',
})
