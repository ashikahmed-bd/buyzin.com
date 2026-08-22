export const useCartStore = defineStore("cart", {
  state: () => ({
    loading: false,
    errors: {},
    dialog: false,
    cart: {},
  }),

  getters: {
    items: (state) => state.cart?.items,
    itemsCount: (state) => state.cart?.items_count,
    subtotal: (state) => state.cart?.subtotal,
    total: (state) => state.cart?.total,
    discount: (state) => state.cart?.discount,
    shipping: (state) => state.cart?.shipping,
    token: (state) => state.cart?.token,
    isEmpty: (state) => state.cart?.items_count === 0,
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

    async store(payload) {
      this.loading = true;
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/cart/items", {
          method: "POST",
          body: payload,
        });
        this.dialog = true;
        return response;
      } catch (error) {
        this.errors = error?.response?._data;
        return error?.response?._data;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Increase item quantity
     */
    async increase(item) {
      const { $api } = useNuxtApp();

      try {
        const response = await $api(`/api/cart/items/${item.id}`, {
          method: "PUT",
          body: {
            quantity: item.quantity + 1,
          },
        });

        await this.getItems();

        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors || {};

        throw error;
      }
    },

    /**
     * Decrease item quantity
     */
    async decrease(item) {
      const { $api } = useNuxtApp();

      try {
        if (item.quantity <= 1) {
          return this.remove(item.id);
        }

        const response = await $api(`/api/cart/items/${item.id}`, {
          method: "PUT",
          body: {
            quantity: item.quantity - 1,
          },
        });

        await this.getItems();

        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors || {};

        throw error;
      }
    },

    /**
     * Remove item
     */
    async remove(item) {
      const { $api } = useNuxtApp();

      try {
        const response = await $api(`/api/cart/items/${item.id}`, {
          method: "DELETE",
        });

        await this.getItems();

        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors || {};
        throw error;
      }
    },

    /**
     * Clear cart
     */
    async clear() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/cart/clear", {
          method: "DELETE",
        });

        await this.getItems();
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors || {};
        throw error;
      }
    },
  },
});
