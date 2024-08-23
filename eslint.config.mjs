// @ts-check
import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    stylistic: {
      overrides: {
        '@stylistic/newline-per-chained-call': 'error',
      },
    },
    vue: {
      overrides: {
        'vue/component-name-in-template-casing': [
          'error',
          'PascalCase',
          {
            registeredComponentsOnly: false,
          },
        ],
      },
    },
  }),
)
