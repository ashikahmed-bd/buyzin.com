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

    onResponseError({ response }) {
      switch (response.status) {
        case 401:
          toast.add({
            title: "Authentication Required",
            description:
              "You are not authenticated. Please log in to continue.",
            color: "error",
          });
          authStore.$reset();
          window.location.replace("/auth/login");

          break;

        case 403:
          console.warn("You are not authorized to perform this action.");
          toast.add({
            title: "Access Denied",
            description: "You do not have permission to perform this action.",
            color: "error",
          });
          break;

        case 404:
          console.warn("The requested resource was not found.");
          toast.add({
            title: "Not Found",
            description: "The requested resource could not be found.",
            color: "error",
          });
          break;

        case 422:
          console.warn("The provided data is invalid.");
          toast.add({
            title: "Validation Error",
            description: "Please check your input and try again.",
            color: "error",
          });
          break;

        case 429:
          console.warn("Too many requests. Please try again later.");
          toast.add({
            title: "Too Many Requests",
            description:
              "You are making requests too quickly. Please try again later.",
            color: "error",
          });
          break;

        case 500:
          console.error("An unexpected server error occurred.");
          toast.add({
            title: "Server Error",
            description:
              "Something went wrong on our server. Please try again later.",
            color: "error",
          });
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
