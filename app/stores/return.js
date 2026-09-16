export const useReturnStore = defineStore("return", {
  state: () => ({
    loading: false,
    errors: null,
  }),

  getters: {},

  actions: {
    async getReturns() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/returns");
        return response;
      } catch (error) {
        this.errors = error?.response?._data;
        return error?.response?._data;
      }
    },

    async store(payload) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/products/${slug}/${product}`);
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },
  },
});
