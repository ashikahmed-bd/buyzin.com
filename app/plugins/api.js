export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: config.public.apiBase,

    onRequest({ options }) {
      const authStore = useAuthStore();
      const cartToken = useCartToken();

      options.headers = new Headers(options.headers);

      options.headers.set("Accept", "application/json");
      options.headers.set("X-Source", "Web");

      if (authStore.token) {
        options.headers.set("Authorization", `Bearer ${authStore.token}`);
      }

      if (cartToken.value) {
        options.headers.set("X-Cart-Token", cartToken.value);
      }
    },

    onResponseError({ response }) {
      if (import.meta.dev) {
        console.error("API ERROR:", {
          status: response.status,
          url: response.url,
          data: response._data,
        });
      }

      // Authentication is handled by auth middleware/page.
      // Do not reset the store or redirect here.

      if (response.status === 401 && import.meta.client) {
        const authStore = useAuthStore();

        authStore.$reset();

        return navigateTo("/auth/login", {
          replace: true,
        });
      }
    },
  });

  return {
    provide: {
      api,
    },
  };
});
