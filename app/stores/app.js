import apiClient from "~/utils/axios";

export const useAppStore = defineStore("app", {
  state: () => ({
    errors: {},
    loading: false,
  }),

  getters: {},

  actions: {
    async getHome() {
      this.loading = true;
      try {
        const response = await apiClient.get("/api/home");
        if (response.status === 200) {
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.response) {
          return Promise.reject(error.response.data);
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
