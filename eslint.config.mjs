import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    overrides: {
      '@stylistic/newline-per-chained-call': 'error',
    },
  },
  vue: {
    overrides: {
      'vue/component-name-in-template-casing': ['error', 'PascalCase', {
        registeredComponentsOnly: false,
      }],
    },
  },
})
