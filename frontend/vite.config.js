import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    port: process.env.PORT || 5173,
    host: true, // Required to bind to 0.0.0.0
    allowedHosts: ['elevateu-frontend.onrender.com'] // ✅ Add this line
  }
})
