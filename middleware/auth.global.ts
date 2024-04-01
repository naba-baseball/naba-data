export default defineNuxtRouteMiddleware(async () => {
  const user = useUser();
  if (!user.value && import.meta.browser) {
    useRequestFetch()("/api/user").then((data) => {
      if (data) {
        user.value = data;
      }
    });
  }
});
