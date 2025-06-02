import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    port: process.env.PORT || 5173,
    host: true, // Required to bind to 0.0.0.0
    allowedHosts: ['elevateu-three.vercel.app'] // ✅ Add this line
  }
})
