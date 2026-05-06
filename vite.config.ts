import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// Configuración para que __dirname funcione en módulos ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Mapea el símbolo @ a la carpeta src
      '@': path.resolve(__dirname, './src'),
    },
  },
})