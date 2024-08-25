export function useTeams() {
  const api = useFetch('/api/teams', {
    default: () => [],
    key: 'get-teams',
  })

  return { teams: toRef(() => api.data.value), api }
}
