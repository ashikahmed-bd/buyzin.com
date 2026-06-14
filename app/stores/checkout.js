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
        this.errors = error?.response?._data?.errors
        throw error
      }
    },
  },
});
