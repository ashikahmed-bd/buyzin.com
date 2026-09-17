export const useShopStore = defineStore("shop", {
  state: () => ({
    loading: false,
    errors: {},
  }),

  getters: {},

  actions: {
    async apply(payload) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api(`/api/stores/apply`, {
          method: "POST",
          body: payload,
        });
        $toast.success(response.message);
        return navigateTo("/store/apply/success");
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        $toast.error(error?.response?._data.message);
        return error?.response?._data;
      } finally {
        this.loading = false;
      }
    },

    async getStores() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/stores`);
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        return error?.response?._data;
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
