import { defineStore } from "pinia";
import apiClient from "~/utils/axios";

export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    loading: false,
    errors: [],
    items: [],
  }),

  getters: {},

  actions: {
    async addItem(product) {
      this.loading = product.id;

      try {
        const response = await apiClient.post("/api/wishlist", {
          product_id: product.id,
        });
        if (response.status === 201) {
          toast.success(response.data.message);
          await this.getWishlist();
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      } finally {
        this.loading = false;
      }
    },

    async remove(wishlist) {
      try {
        const response = await apiClient.delete(`/api/wishlist/${wishlist}`);

        if (response.status === 200) {
          toast.success(response.data.message);
          await this.getWishlist();
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      }
    },

    async getWishlist() {
      try {
        const response = await apiClient.get("/api/wishlist");
        if (response.status === 200) {
          this.items = response.data;
          return Promise.resolve(response);
        }
      } catch (error) {
        if (error.response) {
          return Promise.reject(error.response);
        }
      }
    },
  },
});
