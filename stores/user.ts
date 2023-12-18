export const useUserStore = defineStore("user", () => {
  return { user: ref(), session: ref() };
});
