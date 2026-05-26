import { defineStore } from "pinia";
import apiClient from "~/utils/axios";

export const useCheckoutStore = defineStore("checkout", {
  state: () => ({
    loading: false,
    errors: [],
  }),

  getters: {},

  actions: {
    async getShippings() {
      try {
        const response = await apiClient.get("/api/shippings");
        if (response.status === 200) {
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.response) {
          return Promise.reject(error.response);
        }
      }
    },
  },
});
