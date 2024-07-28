import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    overrides: {
      '@stylistic/newline-per-chained-call': 'error',
    },
  },
})
// export default withNuxt(
//   ...antfu({
//     stylistic: {
//       overrides: {
//         '@stylistic/newline-per-chained-call': 'error',
//       },
//     },
//   }),
// )
