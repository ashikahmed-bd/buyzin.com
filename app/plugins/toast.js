export default defineNuxtPlugin(() => {
  const toast = useToast();

  const $toast = {
    success(message, options = {}) {
      toast.add({
        title: "Success",
        description: message,
        color: "success",
        icon: "i-lucide-circle-check",
        ...options,
      });
    },

    error(message, options = {}) {
      toast.add({
        title: "Error",
        description: message,
        color: "error",
        icon: "i-lucide-circle-x",
        ...options,
      });
    },

    warning(message, options = {}) {
      toast.add({
        title: "Warning",
        description: message,
        color: "warning",
        icon: "i-lucide-triangle-alert",
        ...options,
      });
    },

    info(message, options = {}) {
      toast.add({
        title: "Info",
        description: message,
        color: "info",
        icon: "i-lucide-info",
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
