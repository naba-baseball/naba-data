export default defineNuxtPlugin((nuxtApp) => {
  const userTeam = useUserTeam();
  userTeam.value = useCookie("userFavoriteTeam", { httpOnly: true }).value;
});
