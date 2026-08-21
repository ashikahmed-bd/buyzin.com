export const useAddressStore = defineStore("address", {
  state: () => ({
    loading: false,
    errors: [],
  }),

  getters: {},

  actions: {
    async all() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/addresses");
        return response;
      } catch (error) {
        this.errors = error?.response?._data;
        throw error;
      }
    },
  },
});
