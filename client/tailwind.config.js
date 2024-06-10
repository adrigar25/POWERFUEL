import {nextui} from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        black: '#000000',
        primary: '#0d6efd',
        secondary: '#6c757d',
        success: '#198754',
        danger: '#dc3545',
        warning: '#ffc107',
        info: '#0dcaf0',
        light: '#f4f4f4',
        dark: '#212529',
      },
      textShadow: {
        default: '0 2px 5px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  darkMode: "class",
  variants: {
    extend: {
      textShadow: ['responsive'],
    },
  },
  plugins: [
    nextui(),
    require('tailwindcss-textshadow')
  ],
}
