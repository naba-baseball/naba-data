export const useTeamsStore = defineStore("teams", () => {
  return useFetch("/api/teams", { server: false });
});
