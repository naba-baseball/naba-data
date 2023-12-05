import { defineConfig } from 'unocss'

export default defineConfig({
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        './**/*.{js,ts}',
      ],
    },
  },
  theme: {
    fontSize: {
      'xs': 'clamp(0.6075rem, 0.5987rem + 0.0441vw, 0.64rem)',
      'sm': 'clamp(0.7294rem, 0.7102rem + 0.0958vw, 0.8rem)',
      'base': 'clamp(0.875rem, 0.8411rem + 0.1695vw, 1rem)',
      'md': 'clamp(1.05rem, 0.9958rem + 0.2712vw, 1.25rem)',
      'lg': 'clamp(1.26rem, 1.178rem + 0.4102vw, 1.5625rem)',
      'xl': 'clamp(1.5119rem, 1.3922rem + 0.5983vw, 1.9531rem)',
      '2xl': 'clamp(1.8144rem, 1.6444rem + 0.85vw, 2.4413rem)',
      '3xl': 'clamp(2.1775rem, 1.9404rem + 1.1856vw, 3.0519rem)',
    },
    spacing: {
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
    width: {
      'grid-max': '62.00rem',
      'grid-gutter': 'clamp(0.875rem, 0.3393rem + 2.6786vw, 2rem)',
      'grid-columns': '12',
    },
  },
  shortcuts: {
    'u-container': 'max-w-grid-max mx-auto px-grid-gutter',
    'u-grid': 'grid gap-grid-gutter',
  },
  preflights: [
    { getCSS: ({ theme }) => `
    :root {
      --step--2: ${theme.fontSize.xs};
      --step--1: ${theme.fontSize.sm};
      --step-0: ${theme.fontSize.base};
      --step-1: ${theme.fontSize.md};
      --step-2: ${theme.fontSize.lg};
      --step-3: ${theme.fontSize.xl};
      --step-4: ${theme.fontSize['2xl']};
      --step-5: ${theme.fontSize['3xl']};

      /* Spacing */

      --space-3xs: ${theme.spacing['3xs']};
      --space-2xs: ${theme.spacing['2xs']};
      --space-xs: ${theme.spacing.xs};
      --space-s: ${theme.spacing.sm};
      --space-m: ${theme.spacing.md};
      --space-l: ${theme.spacing.lg};
      --space-xl: ${theme.spacing.xl};
      --space-2xl: ${theme.spacing['2xl']};
      --space-3xl: ${theme.spacing['3xl']};

      /* One-up pairs */
      --space-3xs-2xs:  ${theme.spacing['3xs-2xs']};
      --space-2xs-xs:  ${theme.spacing['2xs-xs']};
      --space-xs-s:  ${theme.spacing['xs-s']};
      --space-s-m:  ${theme.spacing['s-m']};
      --space-m-l:  ${theme.spacing['m-l']};
      --space-l-xl:  ${theme.spacing['l-xl']};
      --space-xl-2xl:  ${theme.spacing['xl-2xl']};
      --space-2xl-3xl:  ${theme.spacing['2xl-3xl']};

      /* Custom spacing pairs */
      --space-s-l: ${theme.spacing['s-l']};

      --grid-max-width: ${theme.width['grid-max']};
      --grid-gutter: ${theme.width['grid-gutter']};
      --grid-columns: ${theme.width['grid-columns']};
    }
  ` },
    {
      getCSS: ({ theme }) => `
    *,*::after,*::before {
      font-family: ${theme.fontFamily.sans};
    }
    `,
    },
    {
      getCSS: ({ theme }) => `
      [data-rating="20"],[data-rating="25"]{
        color: ${theme.colors.red[600]};
      }
      [data-rating="30"],[data-rating="35"],[data-rating="40"]{
        color: ${theme.colors.orange[600]};
      }
      [data-rating="45"],[data-rating="50"]{
        color: ${theme.colors.yellow[600]};
      }
      [data-rating="55"],[data-rating="60"],[data-rating="65"]{
        color: ${theme.colors.green[600]};
      }
      [data-rating="70"],[data-rating="75"],[data-rating="80"]{
        color: ${theme.colors.blue[600]};
      }
      `,
    },
  ],
})
