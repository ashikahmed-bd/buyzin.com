export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    loading: false,
    errors: [],
    items: [],
  }),

  getters: {},

  actions: {
    async addItem(product) {
      const { $api } = useNuxtApp();
      this.loading = product.id;
      try {
        const response = await $api("/api/wishlist", {
          method: "POST",
          body: {
            product_id: product.id,
          },
        });

        return response;
      } catch (error) {
        this.errors = error?.response?._data;
        return error?.response?._data;
      } finally {
        this.loading = false;
      }
    },

    async remove(wishlist) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api.delete(`/api/wishlist/${wishlist}`);
        toast.success(response.message);
        await this.getWishlist();
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async getWishlist() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api.get("/api/wishlist");
        this.items = response;
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },
  },
});
