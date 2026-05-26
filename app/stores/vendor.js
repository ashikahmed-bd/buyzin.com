import { defineStore } from "pinia";
import apiClient from "~/utils/axios";

export const useVendorStore = defineStore("vendor", {
  state: () => ({
    loading: false,
    errors: [],
  }),

  getters: {},

  actions: {
    async all() {
      this.loading = product.id;

      try {
        const response = await apiClient.get("/api/vendor");
        if (response.status === 200) {
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
          return Promise.reject(error.response.data);
        }
      } finally {
        this.loading = false;
      }
    },

    async getStore(slug) {
      try {
        const response = await apiClient.get(`/api/stores/${slug}`);
        if (response.status === 200) {
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
          return Promise.reject(error.response.data);
        }
      }
    },

    async getProducts(slug, page) {
      try {
        const response = await apiClient.get(`/api/stores/${slug}/products`, {
          params: {
            page: page,
          },
        });
        if (response.status === 200) {
          return Promise.resolve(response);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
          return Promise.reject(error.response.data);
        }
      }
    },
  },
});
