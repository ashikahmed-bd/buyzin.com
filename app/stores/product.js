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

    async getReviews(slug, code, page = 1) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/products/${slug}/${code}/reviews`, {
          method: "GET",
          query: {
            page,
          },
        });
        return response;
      } catch (error) {
        throw error;
      }
    },

    async getRelated(slug, code, params = {}) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api(`/api/products/${slug}/${code}/related`, {
          method: "GET",
          query: {
            page: params.page,
          },
        });

        return response;
      } catch (error) {
        console.error("Failed to fetch related products:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
