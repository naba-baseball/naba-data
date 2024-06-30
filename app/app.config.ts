export default defineAppConfig({
  ui: {
    primary: 'dodger',
    gray: 'woodsmoke',
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
