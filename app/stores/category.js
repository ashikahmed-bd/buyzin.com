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
        this.categories = response.data;
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  },
});
