/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'Logo': "url('../src/assets/logo.png')",
      },
      colors: {
        // Brand color palette
        cream: "#fefdf9",        // Background color (from logo background)
        maroon: "#993f3c",       // Primary brand color (from "RANJAYA" text)
        darkMaroon: "#761f1c",   // Darker shade for hover states
        darkBrown: "#4a3e3e",    // Text color (muted brown)
        lightPink: "#f5e8e8",    // Light accent (very light pink)
      },
      boxShadow: {
        'custom': '0 4px 6px rgba(153, 63, 60, 0.1)',
      },
      borderColor: {
        'maroon-20': 'rgba(153, 63, 60, 0.2)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)' },
          '100%': { transform: 'translateY(0)' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        }
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out',
        'slideUp': 'slideUp 0.5s ease-out',
        'zoomIn': 'zoomIn 0.5s ease-out',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}