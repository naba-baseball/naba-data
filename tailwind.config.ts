import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {

    extend: {
      width: {
        sm: '240px',
        md: '400px',
        lg: '800px',
        xl: '1200px',
      },
      colors: {
        dodger: {
          50: '#edf9ff',
          100: '#d7f1ff',
          200: '#b9e8ff',
          300: '#88dbff',
          400: '#50c5ff',
          500: '#28a7ff',
          600: '#1e90ff',
          700: '#0a71eb',
          800: '#0f5abe',
          900: '#134e95',
          950: '#11305a',
        },
        woodsmoke: {
          50: '#f3f7f8',
          100: '#e1e9ec',
          200: '#c5d4dc',
          300: '#9eb6c2',
          400: '#6e90a2',
          500: '#537487',
          600: '#476073',
          700: '#3f515f',
          800: '#394651',
          900: '#333d46',
          950: '#080a0c',
        },
      },
    },
  },
}
