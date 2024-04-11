import { presetForms } from '@julr/unocss-preset-forms'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

const sizing = {
  '1': 'clamp(0.25rem, 0.163rem + 0.4348vw, 0.5rem)',
  '2': 'clamp(0.5rem, 0.413rem + 0.4348vw, 0.75rem)',
  '3': 'clamp(0.75rem, 0.663rem + 0.4348vw, 1rem)',
  '4': 'clamp(1rem, 0.913rem + 0.4348vw, 1.25rem)',
  '5': 'clamp(1.25rem, 1.163rem + 0.4348vw, 1.5rem)',
  '6': 'clamp(1.5rem, 1.413rem + 0.4348vw, 1.75rem)',
  '7': 'clamp(1.75rem, 1.663rem + 0.4348vw, 2rem)',
  '8': 'clamp(2rem, 1.913rem + 0.4348vw, 2.25rem)',
  '9': 'clamp(2.25rem, 2.163rem + 0.4348vw, 2.5rem)',
  '10': 'clamp(2.5rem, 2.413rem + 0.4348vw, 2.75rem)',
  '11': 'clamp(2.75rem, 2.663rem + 0.4348vw, 3rem)',
  '12': 'clamp(3rem, 2.913rem + 0.4348vw, 3.25rem)',
  '13': 'clamp(3.25rem, 3.163rem + 0.4348vw, 3.5rem)',
  '14': 'clamp(3.5rem, 3.413rem + 0.4348vw, 3.75rem)',
  '15': 'clamp(3.75rem, 3.663rem + 0.4348vw, 4rem)',
  'grid-max': '62.00rem',
  'grid-gutter': 'clamp(0.875rem, 0.3393rem + 2.6786vw, 2rem)',
  'grid-columns': '12',
}

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
    presetForms(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    animation: {
      keyframes: {
        'slide-down-and-fade':
          `{from{opacity:0;transform:translateY(-2px);}to{opacity:1;transform:translateY(0);}}`,
        'slide-left-and-fade':
          `{from{opacity:0;transform:translateX(2px);}to{opacity:1;transform:translateX(0);}}`,
        'slide-up-and-fade':
          `{from{opacity:0;transform:translateY(2px);}to{opacity:1;transform:translateY(0);}}`,
        'slide-right-and-fade':
          `{from{opacity:0;transform:translateX(-2px);}to{opacity:1;transform:translateX(0);}}`,
      },
      durations: {
        'slide-down-and-fade': '400ms',
        'slide-left-and-fade': '400ms',
        'slide-up-and-fade': '400ms',
        'slide-right-and-fade': '400ms',
      },
      timingFns: {
        'slide-down-and-fade': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-left-and-fade': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up-and-fade': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right-and-fade': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
    colors: {
      rating: {
        red: '#dc2626',
        orange: '#ea580c',
        yellow: '#ca8a04',
        green: '#16a34a',
        blue: '#2563eb',
      },
      primary: {
        50: '#f1f8fe',
        100: '#e3effb',
        200: '#c0e1f7',
        300: '#88c8f1',
        400: '#49ace7',
        500: '#2293d5',
        600: '#1474b5',
        700: '#115d93',
        800: '#124e78',
        900: '#154365',
        950: '#0e2b43',
      },
      accent: {
        50: '#fffeeb',
        100: '#fffcc6',
        200: '#fff888',
        300: '#ffee49',
        400: '#ffe020',
        500: '#f2bb05',
        600: '#dd9602',
        700: '#b86c05',
        800: '#95520b',
        900: '#7a430d',
        950: '#462402',
      },
      tertiary: {
        50: '#fff8ed',
        100: '#ffefd4',
        200: '#ffdba8',
        300: '#ffc071',
        400: '#ff9b38',
        500: '#fe7c11',
        600: '#ef6107',
        700: '#d74e09',
        800: '#9d390f',
        900: '#7e3110',
        950: '#441606',
      },
      surface: {
        50: '#f1f5f8',
        100: '#ebf1f5',
        200: '#d1dde6',
        300: '#a8c1d1',
        400: '#7a9fb8',
        500: '#59819b',
        600: '#436a84',
        700: '#38576b',
        800: '#324957',
        900: '#314049',
        950: '#202b31',
      },
    },
    fontFamily: {
      sans: 'Fira Sans, sans-serif',
      serif: 'Baskerville, serif',
    },
    fontSize: {
      'xs': 'clamp(0.6075rem, 0.5754rem + 0.1607vw, 0.72rem)',
      'sm': 'clamp(0.7294rem, 0.6806rem + 0.2438vw, 0.9rem)',
      'base': 'clamp(0.875rem, 0.8036rem + 0.3571vw, 1.125rem)',
      'lg': 'clamp(1.05rem, 0.9482rem + 0.5089vw, 1.4063rem)',
      'xl': 'clamp(1.26rem, 1.1177rem + 0.7116vw, 1.7581rem)',
      '2xl': 'clamp(1.5119rem, 1.316rem + 0.9795vw, 2.1975rem)',
      '3xl': 'clamp(1.8144rem, 1.5479rem + 1.3321vw, 2.7469rem)',
      '4xl': 'clamp(2.1775rem, 1.8188rem + 1.7937vw, 3.4331rem)',
      '5xl': 'clamp(2.6125rem, 2.1329rem + 2.3982vw, 4.2913rem)',
      '6xl': 'clamp(3.135rem, 2.498rem + 3.1848vw, 5.3644rem)',
      '7xl': 'clamp(3.7625rem, 2.9216rem + 4.2045vw, 6.7056rem)',
      '8xl': 'clamp(4.515rem, 3.4102rem + 5.5241vw, 8.3819rem)',
      '9xl': 'clamp(5.4175rem, 3.9718rem + 7.2286vw, 10.4775rem)',
    },
    spacing: {
      '1': 'clamp(0.25rem, 0.163rem + 0.4348vw, 0.5rem)',
      '2': 'clamp(0.5rem, 0.413rem + 0.4348vw, 0.75rem)',
      '3': 'clamp(0.75rem, 0.663rem + 0.4348vw, 1rem)',
      '4': 'clamp(1rem, 0.913rem + 0.4348vw, 1.25rem)',
      '5': 'clamp(1.25rem, 1.163rem + 0.4348vw, 1.5rem)',
      '6': 'clamp(1.5rem, 1.413rem + 0.4348vw, 1.75rem)',
      '7': 'clamp(1.75rem, 1.663rem + 0.4348vw, 2rem)',
      '8': 'clamp(2rem, 1.913rem + 0.4348vw, 2.25rem)',
      '9': 'clamp(2.25rem, 2.163rem + 0.4348vw, 2.5rem)',
      '10': 'clamp(2.5rem, 2.413rem + 0.4348vw, 2.75rem)',
      '11': 'clamp(2.75rem, 2.663rem + 0.4348vw, 3rem)',
      '12': 'clamp(3rem, 2.913rem + 0.4348vw, 3.25rem)',
      '13': 'clamp(3.25rem, 3.163rem + 0.4348vw, 3.5rem)',
      '14': 'clamp(3.5rem, 3.413rem + 0.4348vw, 3.75rem)',
      '15': 'clamp(3.75rem, 3.663rem + 0.4348vw, 4rem)',
      '3xs': 'clamp(0.25rem, 0.25rem + 0vw, 0.25rem)',
      '2xs': 'clamp(0.4375rem, 0.4206rem + 0.0847vw, 0.5rem)',
      'xs': 'clamp(0.6875rem, 0.6706rem + 0.0847vw, 0.75rem)',
      'sm': 'clamp(0.875rem, 0.8411rem + 0.1695vw, 1rem)',
      'md': 'clamp(1.3125rem, 1.2617rem + 0.2542vw, 1.5rem)',
      'lg': 'clamp(1.75rem, 1.6822rem + 0.339vw, 2rem)',
      'xl': 'clamp(2.625rem, 2.5233rem + 0.5085vw, 3rem)',
      '2xl': 'clamp(3.5rem, 3.3644rem + 0.678vw, 4rem)',
      '3xl': 'clamp(5.25rem, 5.0466rem + 1.0169vw, 6rem)',
      // One-up pairs
      '3xs-2xs': 'clamp(0.25rem, 0.1822rem + 0.339vw, 0.5rem)',
      '2xs-xs': 'clamp(0.4375rem, 0.3528rem + 0.4237vw, 0.75rem)',
      'xs-s': 'clamp(0.6875rem, 0.6028rem + 0.4237vw, 1rem)',
      's-m': 'clamp(0.875rem, 0.7055rem + 0.8475vw, 1.5rem)',
      'm-l': 'clamp(1.3125rem, 1.1261rem + 0.9322vw, 2rem)',
      'l-xl': 'clamp(1.75rem, 1.411rem + 1.6949vw, 3rem)',
      'xl-2xl': 'clamp(2.625rem, 2.2521rem + 1.8644vw, 4rem)',
      '2xl-3xl': 'clamp(3.5rem, 2.822rem + 3.3898vw, 6rem)',
      // Custom pairs
      's-l': 'clamp(0.875rem, 0.5699rem + 1.5254vw, 2rem)',
    },
    width: sizing,
    height: sizing,
  },
  shortcuts: {
    'flow-flex': 'gap-$flow-space',
    'text-label':
      'text-xs font-semibold text-surface-800 uppercase tracking-wider',
    'field-container': 'grid gap-2xs',
    'field-input': 'bg-surface-50 border-surface-300 shadow shadow-sm text-surface-950 rounded min-h-9',
    'bg-primary': 'bg-primary-700 text-white font-normal',
    'text-primary': 'text-primary-900',
    'btn': 'rounded p-2 disabled:(opacity-80 cursor-not-allowed)',
  },
})
