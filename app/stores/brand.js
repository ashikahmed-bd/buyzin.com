export const useBrandStore = defineStore("brand", {
  state: () => ({
    loading: false,
    errors: {},
    brands: [],
    brand: {},
  }),

  getters: {},

  actions: {
    async getBrands() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/brands`);
        this.brands = response;
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
