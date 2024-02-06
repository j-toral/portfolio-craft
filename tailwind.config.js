/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./templates/**/*.twig", "./config/redactor/*.json", "./web/assets/js/**/*.js"],
  theme: {
    extend: {
      screens: {
        ty: '360px',
      },
      margin: {
        'narrow': '1rem',
        'regular': '2rem',
        'large': '3rem',
      },
      padding: {
        'narrow': '1rem',
        'regular': '2rem',
        'large': '3rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries')
  ],
  safelist: [
      'max-w-x-narrow',
      'max-w-medium',
      'max-w-narrow',
      'md:grid-cols-2',
      'md:grid-cols-3',
      'sm:grid-cols-2',
      'sm:grid-cols-3',
      'col-start-3',
      'col-start-4',
      'btn-outline-light',
      'btn-outline-dark',
      'btn-solid-light',
      'btn-solid-dark',
    {
      pattern: /^[mp][blrtxy]?-(?:regular|narrow|large)$/mg,
    }
  ]
}
