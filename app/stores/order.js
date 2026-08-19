export const useOrderStore = defineStore("order", {
  state: () => ({
    loading: false,
    errors: [],
    orders: [],
    order: {},
  }),

  getters: {},

  actions: {
    async getOrders(page) {
      this.loading = true;
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/orders", {
          query: {
            page: page,
          },
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data;
        return error?.response?._data;
      }
    },

    async getOrder(order) {
      this.loading = true;
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/orders/${order}`);
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data;
        return error?.response?._data;
      }
    },
  },
});
