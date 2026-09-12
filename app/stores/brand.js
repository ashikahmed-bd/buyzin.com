export const useBrandStore = defineStore("brand", {
  state: () => ({
    loading: false,
    errors: {},
  }),

  getters: {},

  actions: {
    async getBrands(query = {}) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/brands`, {
          method: "GET",
          query: query,
        });

        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async getProducts(brand, query = {}) {
      this.loading = true;
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/brands/${brand}/products`, {
          method: "GET",
          query: query,
        });

        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },
  },
});
