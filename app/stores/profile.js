import { defineStore } from "pinia";
import apiClient from "~/utils/axios";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    loading: false,
    errors: [],
    user: null,
    addresses: null,
  }),

  getters: {},

  actions: {
    async getProfile() {
      try {
        const response = await apiClient.get("/api/profile");
        if (response.status === 200) {
          this.user = response.data.data;
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.response) {
          this.errors = error.response.errors;
          return Promise.reject(error.response);
        }
      }
    },

    async update(payload) {
      this.loading = true;
      try {
        const response = await apiClient.put("/api/profile", payload);
        if (response.status === 200) {
          toast.success(response.data.message);
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.response) {
          this.errors = error.response.errors;
          return Promise.reject(error.response);
        }
      } finally {
        this.loading = false;
      }
    },

    async getOrders() {
      this.loading = true;
      try {
        const response = await apiClient.get("/api/orders");
        if (response.status === 200) {
          return Promise.resolve(response);
        }
      } catch (error) {
        if (error.response) {
          return Promise.reject(error.response);
        }
      } finally {
        this.loading = false;
      }
    },

    async getOrder(order_number) {
      try {
        const response = await apiClient.get(`/api/orders/${order_number}`);
        if (response.status === 200) {
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.response) {
          return Promise.reject(error.response);
        }
      }
    },

    async getAddresses() {
      this.loading = true;
      try {
        const response = await apiClient.get(`/api/addresses`);
        if (response.status === 200) {
          this.addresses = response.data;
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.response) {
          return Promise.reject(error.response);
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
