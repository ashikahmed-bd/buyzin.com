import apiClient from "~/utils/axios";

export const useAppStore = defineStore("app", {
  state: () => ({
    errors: {},
    loading: false,
  }),

  getters: {},

  actions: {
    async getHome() {
      try {
        const response = await apiClient.get("/api/home");
        if (response.status === 200) {
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.response) {
          return Promise.reject(error.response);
        }
      }
    },

    // async getCategories() {
    //   try {
    //     const response = await apiClient.get("/api/categories");
    //     this.categories = response.data;
    //     return response.data;
    //   } catch (error) {
    //     console.error(error);
    //     throw error;
    //   }
    // }
  },
});
