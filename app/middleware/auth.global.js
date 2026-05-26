import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore();

  if (authStore.token && !authStore.user) {
    await authStore.getProfile();
  }
});
