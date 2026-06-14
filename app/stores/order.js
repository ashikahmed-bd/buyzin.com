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
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/orders");
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors
        throw error
      }
    },
  },
});
