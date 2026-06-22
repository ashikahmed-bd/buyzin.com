export const useVendorStore = defineStore("vendor", {
  state: () => ({
    loading: false,
    errors: {},
  }),

  getters: {},

  actions: {
    async getStores() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/stores`);
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors
        throw error
      }
    },


  },
});
