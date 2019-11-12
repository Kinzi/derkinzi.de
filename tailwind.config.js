/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  prefix: '',
  important: false,
  separator: ':',
  theme: {
    extend: {
      height: {
        '96': '27rem'
      }
    },
    colors: {
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      white50: '#ffffff99',
      gray: {
        100: '#f7fafc',
        200: '#edf2f7',
        300: '#e2e8f0',
        400: '#cbd5e0',
        500: '#a0aec0',
        600: '#718096',
        700: '#4a5568',
        800: '#2d2d2d',
        900: '#1a202c'
      },
      orange: {
        500: '#f08d49'
      },
      teal: {
        500: '#7ec699'
      },
      purple: {
        500: '#cc99cd'
      }
    },
    fontFamily: {
      sans: [
        'Muli',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"'
      ],
      serif: [
        'Merriweather',
        'Georgia',
        'Cambria',
        '"Times New Roman"',
        'Times',
        'serif'
      ],
      mono: [
        'Source Code Pro',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace'
      ]
    }
  },
  corePlugins: {},
  plugins: []
}
