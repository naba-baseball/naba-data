export default defineAppConfig({
  ui: {
    colors: {
      // @ts-expect-error defined in tailwind config
      primary: 'dodger',
      // @ts-expect-error defined in tailwind config
      neutral: 'woodsmoke',
    },
    card: {
      slots: {
        root: 'bg-white dark:bg-gray-900/25 text-gray-700 dark:text-gray-100 leading-relaxed',
      },
    },
    tabs: {
      slots: {
        indicator: 'bg-primary-700 dark:bg-primary-700',
        root: 'bg-primary-700/5 dark:bg-primary-500/10',
        trigger: 'data-[state=active]:text-primary-700 dark:data-[state=active]:text-primary-700',

      },
    },
  },
})
