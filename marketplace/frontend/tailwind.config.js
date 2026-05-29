/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: 'hsl(36, 77%, 49%)',
        accent:  'hsl(145, 40%, 42%)',
      },
      borderRadius: {
        DEFAULT: '0.625rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
