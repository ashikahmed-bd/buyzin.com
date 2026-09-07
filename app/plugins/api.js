export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const toast = useToast();

  const api = $fetch.create({
    baseURL: config.public.apiBase,
    credentials: "include",
    headers: {
      Accept: "application/json",
    },

    onRequest({ options }) {
      options.headers = new Headers(options.headers);
      options.headers.set("Accept", "application/json");

      const xsrfToken = useCookie("XSRF-TOKEN");

      if (xsrfToken.value) {
        options.headers.set(
          "X-XSRF-TOKEN",
          decodeURIComponent(xsrfToken.value),
        );
      }
    },

    onResponseError({ response }) {
      switch (response.status) {
        case 401:
          console.warn("You are not authenticated. Please log in to continue.");
          break;

        case 403:
          console.warn("You are not authorized to perform this action.");
          break;

        case 404:
          console.warn("The requested resource was not found.");
          break;

        case 422:
          console.warn("The provided data is invalid.");
          break;

        case 429:
          console.warn("Too many requests. Please try again later.");
          break;

        case 500:
          console.error("An unexpected server error occurred.");
          break;

        default:
          console.error(`API error: ${response.status}`);
      }
    },
  });

  return {
    provide: {
      api,
    },
  };
});
