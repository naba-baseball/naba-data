export function usePagination() {
  const total = ref<number>(10)
  const limit = ref(15)
  const page = ref(1)
  const sortBy = ref<{ column: string, direction: 'asc' | 'desc' }>()
  const pageCount = computed(() => Math.ceil(total.value / limit.value))
  const offset = computed(() => {
    if (page.value === 1)
      return 0
    return (page.value - 1) * limit.value
  })
  /** meant for orderBy query param */
  const orderBy = computed(() => sortBy.value ? [sortBy.value.column, sortBy.value.direction] : [])
  return { total, limit, page, sortBy, pageCount, offset, orderBy }
}
