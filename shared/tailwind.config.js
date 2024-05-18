/** @type {import('tailwindcss').Config} */
export const tailwindConfig = {
  darkMode: ['selector'],
  content: [
    `${process.cwd()}/**/*.{html,js,ts,ejs,handlebars}`,
    '../../shared/**/*.{html,js,ts,ejs,handlebars}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
      fontFamily: {
        sans: [
          'Helvetica Neue',
          'Segoe UI',
          'Arial',
          'Ubuntu',
          'Cantarell',
          'Droid Sans',
          'sans-serif',
        ],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        mono: [
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
};
