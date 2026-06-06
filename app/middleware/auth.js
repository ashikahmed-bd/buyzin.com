export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  if (!authStore.token) {
    return navigateTo("/auth/login");
  }

  // profile lazy load ensure
  if (!authStore.user) {
    try {
      await authStore.getProfile();
    } catch (e) {
      authStore.logout?.();
      return navigateTo("/auth/login");
    }
  }
});