export const useCartStore = defineStore("cart", {
  state: () => ({
    loading: false,
    errors: {},
    cart: null,
    dialog: false,
  }),

  persist: {
    pick: ["items"],
  },

  getters: {
    itemCount: (state) => state.cart?.items?.length ?? 0,

    totalItems: (state) =>
      state.cart?.items?.reduce((total, item) => total + item.quantity, 0) ?? 0,
  },

  actions: {
    async getItems() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/cart");
        this.cart = response.data;
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async add(product, variant, quantity) {
      this.loading = true;
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/cart/items", {
          method: "POST",
          body: {
            product_id: product,
            variant_id: variant,
            quantity: quantity,
          },
        });
        $toast.success(response.message);
        this.dialog = true;
        return response;
      } catch (error) {
        this.errors = error?.response?._data;
        return error?.response?._data;
      } finally {
        this.loading = false;
      }
    },

    async update(item, quantity) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api(`/api/cart/items/${item.id}`, {
          method: "PATCH",
          body: {
            quantity: quantity,
          },
        });

        return response;
      } catch (error) {
        this.errors = error?.response?._data || {};
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async remove(item) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api(`/api/cart/items/${item}`, {
          method: "DELETE",
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors || {};
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async clear() {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api("/api/cart/clear", {
          method: "DELETE",
        });

        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors || {};
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
