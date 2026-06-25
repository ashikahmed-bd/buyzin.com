export const useCartStore = defineStore("cart", {
  state: () => ({
    loading: false,
    errors: {},
    dialog: false,
    items: [],
  }),

  // persist: {
  //   pick: ["items"],
  // },

  getters: {},

  actions: {

    async getItems() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/cart");
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data?.errors
        throw error
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
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data?.errors
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
 * Increase item quantity
 */
    async increase(item) {
      const { $api } = useNuxtApp()

      try {
        const response = await $api(`/api/cart/items/${item.id}`, {
          method: 'PUT',
          body: {
            quantity: item.quantity + 1
          }
        })

        await this.getItems()

        return response
      } catch (error) {
        this.errors = error?.response?._data?.errors || {}

        throw error
      }
    },

    /**
     * Decrease item quantity
     */
    async decrease(item) {
      const { $api } = useNuxtApp()

      try {
        if (item.quantity <= 1) {
          return this.remove(item.id)
        }

        const response = await $api(`/api/cart/items/${item.id}`, {
          method: 'PUT',
          body: {
            quantity: item.quantity - 1
          }
        })

        await this.getItems()

        return response
      } catch (error) {
        this.errors = error?.response?._data?.errors || {}

        throw error
      }
    },

    /**
     * Remove item
     */
    async remove(item) {
      const { $api } = useNuxtApp()

      try {

        const response = await $api(`/api/cart/items/${item.id}`, {
          method: 'DELETE',
        });

        await this.getItems()

        return response
      } catch (error) {
        this.errors = error?.response?._data?.errors || {}
        throw error
      }
    },

    /**
     * Clear cart
     */
    async clear() {
      const { $api } = useNuxtApp()
      try {
        const response = await $api('/api/cart/clear', {
          method: 'DELETE'
        })

        await this.getItems()
        return response
      } catch (error) {
        this.errors = error?.response?._data?.errors || {}
        throw error
      }
    },


    async getShippingCost(payload) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/cart/shipping/calculate", {
          method: "PUT",
          body: payload,
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors
        throw error
      }
    },

    /**
     * Apply coupon
     */
    async couponApply(code) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const response = await $api("/api/cart/coupon/apply", {
          method: "POST",
          body: {
            code: code
          }
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors
        throw error
      }
    },


    async checkout(payload) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api("/api/cart/checkout", {
          method: "POST",
          body: payload,
        });
        return navigateTo(response.redirect_url, {
          external: true,
        });
      } catch (error) {
        this.errors = error?.response?._data?.errors
        throw error
      }
    },
  },
});
