import { defineStore } from "pinia";
import apiClient from "~/utils/axios";

export const useOrderStore = defineStore("order", {
  state: () => ({
    loading: false,
    errors: [],
    orders: [],
    order: {},
  }),

  getters: {},

  actions: {
    async all() {
      this.loading = true;
      try {
        const response = await apiClient.get("/api/orders");
        if (response.status === 200) {
          return Promise.resolve(response);
        }
      } catch (error) {
        return Promise.reject(error.response);
      } finally {
        this.loading = false;
      }
    },

    async store(form) {
      this.loading = true;
      const cartStore = useCartStore();
      try {
        const response = await apiClient.post("/api/orders/store", form);
        if (response.status === 200) {
          toast.success(response.data.message);
          cartStore.$reset();
          setTimeout(() => {
            window.location.href = response.data.redirect_url;
          }, 2500);
        }
      } catch (error) {
        if (error.response) {
          this.errors = error.response.errors;
        }
      } finally {
        this.loading = false;
      }
    },

    
    async tracking(order_number) {
      try {
        const response = await apiClient.get(
          `api/orders/${order_number}/tracking`
        );

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
