export default defineNuxtPlugin((nuxtApp) => {
  const toast = useToast();

  // Inject globally as globalThis.toast
  if (!globalThis.toast) {
    globalThis.toast = {
      success(message) {
        toast.add({
          title: "Success",
          description: message,
          icon: "i-lucide-check-circle",
          color: "primary",
          progress: true,
        });
      },
      error(message) {
        toast.add({
          title: "Error",
          description: message,
          icon: "i-lucide-x-circle",
          color: "error",
          progress: true,
        });
      },
      warning(message) {
        toast.add({
          title: "Warning",
          description: message,
          icon: "i-lucide-alert-triangle",
          color: "neutral",
          progress: true,
        });
      },
      info(message) {
        toast.add({
          title: "Info",
          description: message,
          icon: "i-lucide-info",
          color: "neutral",
          progress: true,
        });
      },
    };
  }
});
