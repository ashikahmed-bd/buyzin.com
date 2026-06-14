export const useProductStore = defineStore("product", {
  state: () => ({
    loading: false,
    errors: null,
    product: null,
    related: null,
  }),

  getters: {},

  actions: {
    async index(params = {}) {
      const { $api } = useNuxtApp()
      try {
        return await $api("/api/products", { params });
      } catch (error) {
        this.errors = error?.response?._data?.errors
        throw error
      }
    },

    async getProduct(slug, id) {
      const { $api } = useNuxtApp();
      try {
        return await await $api(`/api/products/${slug}/${id}`);
      } catch (error) {
        this.errors = error?.response?._data?.errors
        throw error
      }
    },

  },
});
