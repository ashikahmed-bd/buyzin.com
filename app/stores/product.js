import apiClient from "~/utils/axios";

export const useProductStore = defineStore("product", {
  state: () => ({
    loading: false,
    errors: null,
    product: null,
    related: null,
  }),

  getters: {},

  actions: {
    async index(params = {}) {
      this.loading = true;
      try {
        const response = await apiClient.get("/api/products", { params });
        if (response.status === 200) {
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.response.data) {
          return Promise.reject(error.response.data);
        }
      } finally {
        this.loading = false;
      }
    },

    async getProduct(slug, sku) {
      try {
        const response = await apiClient.get(`/api/products/${slug}/${sku}`);
        if (response.status === 200) {
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.response) {
          return Promise.reject(error.response);
        }
      }
    },


    async getSearch(query) {
      this.loading = true;
      try {
        const response = await apiClient.get("api/products/search", {
          params: { query: query },
        });
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
