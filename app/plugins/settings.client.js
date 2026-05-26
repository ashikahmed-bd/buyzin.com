// ~/plugins/settings.js
import apiClient from "~/utils/axios";

export default defineNuxtPlugin(async (nuxtApp) => {
  const settings = ref({
    branding: {},
    general: {},
    contact: {},
    seo: {},
    payment_gateways: [],
  });

  if (process.client) {
    try {
      const response = await apiClient.get("/api/settings");
      if (response.data) settings.value = response.data;
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    }
  }

  // This provides $settings const { $settings } = useNuxtApp();
  nuxtApp.provide("settings", settings);
});
