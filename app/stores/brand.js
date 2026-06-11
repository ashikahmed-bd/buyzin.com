import apiClient from "~/utils/axios";

export const useBrandStore = defineStore("brand", {
  state: () => ({
    loading: false,
    errors: {},
    brands: [],
    brand: {},
  }),

  getters: {},

  actions: {
    async all(params = {}) {
      this.loading = true;
      try {
        const response = await apiClient.get(`/api/brands`, {
          params: params,
        });
        if (response.status === 200) {
          this.brands = response.data;
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

    async getProducts(brand, params = {}) {
      this.loading = true;
      try {
        const response = await apiClient.get(`/api/brands/${brand}/products`, {
          params: {
            page: params.page,
            limit: params.limit,
            sort: params.sort,
          },
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
