export default defineAppConfig({
  ui: {
    primary: 'dodger',
    gray: 'woodsmoke',
    card: {
      background: 'bg-white dark:bg-gray-900/25',
      base: 'text-gray-700 dark:text-gray-100 leading-relaxed',
    },
    tabs: {
      list: {
        background: 'bg-primary-700/5 dark:bg-primary-500/10',
        marker: {
          background: 'bg-primary-700 dark:bg-primary-700',
        },
        tab: {
          active: 'text-white bg-primary-700 text-white',
        },
      },
    },
    notifications: {
      position: 'top-0 left-1/2 bottom-auto -translate-x-1/2',
    },
  },
})
