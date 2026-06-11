import apiClient from "~/utils/axios";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    loading: false,
    errors: {},
    categories: [],
  }),

  getters: {},

  actions: {
    async getCategories() {
      try {
        const response = await apiClient.get("/api/categories");
        if (response.status === 200) {
          this.categories = response.data;
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.response) {
          return Promise.reject(error.response);
        }
      }
    }
  },
});
