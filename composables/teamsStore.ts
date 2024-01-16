export const useTeamsStore = defineStore("teams", () => {
  const api = useFetch("/api/teams", { immediate: false, default: () => [] });

  return api;
});
