export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const toast = useToast();
  const authStore = useAuthStore();

  const api = $fetch.create({
    baseURL: config.public.apiBase,
    credentials: "include",
    headers: {
      Accept: "application/json",
    },

    onRequest({ options }) {
      options.headers = new Headers(options.headers);
      options.headers.set("Accept", "application/json");

      if (authStore.token) {
        options.headers.set("Authorization", `Bearer ${authStore.token}`);
      }
    },

    async onResponseError({ response }) {
      if (response.status === 401) {
        authStore.$reset();

        if (import.meta.client && window.location.pathname !== "/auth/login") {
          await navigateTo("/auth/login", {
            replace: true,
          });
        }
      }
    },
  });

  return {
    provide: {
      api,
    },
  };
});
