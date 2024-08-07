export function useTeams() {
  const api = useFetch('/api/teams', {
    default: () => [],
    key: 'get-teams',
  })
  const teamsData = useNuxtData<typeof api.data.value>('get-teams').data
  const teams = computed(() => teamsData.value ?? [])

  return { teams, api }
}
