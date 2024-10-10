/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      scrollbar: {
        thin: {
          'scrollbar-width': 'thin',
          msOverflowStyle: 'none',
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'), // Add this line
  ],
};
