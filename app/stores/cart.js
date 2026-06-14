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
        const response = await $api("/api/cart/items", payload);
        this.dialog = true;
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data?.errors
        throw error
      }
    },

    /**
     * Increase item quantity
     */
    increase(item) { },

    /**
     * Decrease item quantity
     */
    decrease(item) { },

    /**
     * Remove item
     */
    remove(item) { },

    /**
     * Clear cart
     */
    clear() {
      this.$reset();
    },


    async getShippingCost(payload) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/cart/shipping/calculate", payload);
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
          code: code
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
        const response = await $api("/api/cart/checkout", payload);
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
