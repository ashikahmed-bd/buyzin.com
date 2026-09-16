export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();

  if (!authStore.token) {
    authStore.$reset();

    return navigateTo("/auth/login", {
      replace: true,
    });
  }
});
