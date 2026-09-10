export const useCheckoutStore = defineStore("checkout", {
  state: () => ({
    loading: false,
    errors: [],
  }),

  getters: {},

  actions: {
    async placeOrder(payload) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api("/api/cart/order", {
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
