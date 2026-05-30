import { defineStore } from "pinia";
import apiClient from "~/utils/axios";

export const useCartStore = defineStore("cart", {
  state: () => ({
    loading: false,
    errors: {},
    cart_token: null,
    dialog: false,
    items: [],
  }),

  persist: true,

  getters: {},

  actions: {

    async getItems() {
      try {
        const response = await apiClient.get("/api/cart");
        if (response.status === 200) {
          this.items = response.data.data.items;
          return Promise.resolve(response.data.data);
        }
      } catch (error) {
        console.log(error?.response?.data);
        toast.error(error?.response?.data.message);
      }
    },

    async store(payload) {
      this.loading = true;
      try {
        const response = await apiClient.post("/api/cart/items", payload);
        if (response.status === 201) {
          this.cart_token = response.data.cart_token;
          this.dialog = true;
          toast.success(response?.data.message);
          return Promise.resolve(response.data);
        }
      } catch (error) {
        console.log(error?.response?.data);
        toast.error(error?.response?.data.message);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Increase item quantity
     */
    increase(item) { },

    /**
     * Decrease item quantity
     */
    decrease(item) { },

    /**
     * Remove item
     */
    remove(item) { },

    /**
     * Clear cart
     */
    clear() {
      this.$reset();
    },

    /**
     * Apply coupon
     */
    async couponApply(code) {
      this.loading = true;

      try {
        const response = await apiClient.post("/api/coupon/apply", {
          code: code
        });

        if (response.status === 200) {
          toast.success(response.data.message);
        }
      } catch (error) {
        this.errors = error.response.data;
        toast.error(error.response.data.message);
      } finally {
        this.loading = false;
      }
    },
  },
});
