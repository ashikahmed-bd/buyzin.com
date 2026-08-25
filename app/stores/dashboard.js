import { defineStore } from "pinia";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    loading: false,
    errors: [],
  }),

  getters: {},

  actions: {
    async index() {
      const { $api } = useNuxtApp();

      this.loading = true;
      this.errors = [];

      try {
        const response = await $api("/api/dashboard");
        return response;
      } catch (error) {
        this.errors = error?.response?._data ?? [];
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
