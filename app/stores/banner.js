import apiClient from "~/utils/axios";

export const useBannerStore = defineStore("banner", {
  state: () => ({
    errors: {},
    loading: false,
    banner: {},
  }),

  getters: {},

  actions: {
    async getBanner() {
      this.loading = true;
      try {
        const response = await apiClient.get("/api/home");
        if (response.status === 200) {
          this.banner = response.data;
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
