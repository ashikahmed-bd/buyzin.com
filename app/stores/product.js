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
      const { $api } = useNuxtApp();
      try {
        return await $api("/api/products", { params });
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async getProduct(slug, code) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/products/${slug}/${code}`);
        return response;
      } catch (error) {
        this.errors = error?.response?._data;
        return error?.response?._data;
      }
    },

    async getReviews(slug, code) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/products/${slug}/${code}/reviews`);
        return response;
      } catch (error) {
        throw error;
      }
    },

    async getRelated(slug, code) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/products/${slug}/${code}/related`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
});
