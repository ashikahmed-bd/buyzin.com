export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    loading: false,
    errors: [],
  }),

  getters: {},

  actions: {
    async getWishlist() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/wishlist");
        return response;
      } catch (error) {
        this.errors = error?.response?._data;
        return error?.response?._data;
      } finally {
        this.loading = false;
      }
    },
    async addItem(product) {
      const { $api } = useNuxtApp();
      this.loading = product;
      try {
        const response = await $api("/api/wishlist", {
          method: "POST",
          body: {
            product_id: product,
          },
        });
        $toast.success(response.message);
        return response;
      } catch (error) {
        $toast.error(error?.response?._data.message);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async remove(wishlist) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/wishlist/${wishlist}`, {
          method: "DELETE",
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data;
        return error?.response?._data;
      } finally {
        this.loading = false;
      }
    },
  },
});
