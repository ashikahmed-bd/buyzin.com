export const useCheckoutStore = defineStore("checkout", {
  state: () => ({
    loading: false,
    errors: [],
  }),

  getters: {},

  actions: {
    async getShippings() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/shippings");
        return response;
      } catch (error) {
        this.errors = error?.response?._data;
        throw error;
      }
    },

    async getShippingCost(payload) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/shipping/calculate", {
          method: "PUT",
          body: payload,
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data;
        throw error;
      }
    },

    async placeOrder(payload) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api("/api/cart/checkout", {
          method: "POST",
          body: payload,
        });
        return navigateTo(response.redirect_url, {
          external: true,
        });
      } catch (error) {
        this.errors = error?.response?._data;
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
