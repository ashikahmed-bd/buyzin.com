export default defineNuxtPlugin((nuxtApp) => {
  const toast = useToast();

  const $toast = {
    success(message, options = {}) {
      toast.add({
        title: "Success",
        description: message,
        color: "success",
        ...options,
      });
    },

    error(message, options = {}) {
      toast.add({
        title: "Error",
        description: message,
        color: "error",
        ...options,
      });
    },

    warning(message, options = {}) {
      toast.add({
        title: "Warning",
        description: message,
        color: "warning",
        ...options,
      });
    },

    info(message, options = {}) {
      toast.add({
        title: "Info",
        description: message,
        color: "info",
        ...options,
      });
    },
  };

  // Client-side global
  if (import.meta.client) {
    globalThis.$toast = $toast;
  }

  return {
    provide: {
      toast: $toast,
    },
  };
});
