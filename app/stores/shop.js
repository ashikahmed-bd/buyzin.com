export const useShopStore = defineStore("shop", {
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
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async getStoreBySlug(slug) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/stores/${slug}`);
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async getProducts(slug, params = {}) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/stores/${slug}/products`, {
          method: "GET",
          query: {
            page: params.page,
            search: params.search?.trim(),
            sort: params.sort,
          },
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },
  },
});
