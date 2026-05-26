import { defineStore } from "pinia";
import apiClient from "~/utils/axios";

export const useAddressStore = defineStore("address", {
  state: () => ({
    loading: false,
    errors: [],
    addresses: null,
  }),

  getters: {},

  actions: {
    async all() {
      this.loading = true;
      try {
        const response = await apiClient.get("/api/addresses");
        if (response.status === 200) {
          this.addresses = response.data;
          return Promise.resolve(response);
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          return Promise.reject(error.response);
        }
      } finally {
        this.loading = false;
      }
    },

    async store(payload) {
      this.loading = true;
      try {
        const response = await apiClient.post("/api/addresses", payload);
        if (response.status === 201) {
          toast.success(response.data.message);
          return Promise.resolve(response);
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          return Promise.reject(error.response);
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
