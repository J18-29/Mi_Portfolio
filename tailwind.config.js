/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Esto es vital para que lea el AdminCursos.tsx
  ],
  theme: {
    extend: {
      colors: {
        // Aquí puedes añadir tu color medianoche para usarlo con Tailwind si quieres
        'medianoche': '#020617',
      }
    },
  },
  plugins: [],
}