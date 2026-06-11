import apiClient from "~/utils/axios";

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
      try {
        const response = await apiClient.get("/api/cart");
        if (response.status === 200) {
          return Promise.resolve(response.data?.data);
        }
      } catch (error) {
        console.log(error?.response?.data);
        toast.error(error?.response?.data.message);
      }
    },

    async store(payload) {
      this.loading = true;
      try {
        const response = await apiClient.post("/api/cart/items", payload);
        if (response.status === 201) {
          this.dialog = true;
          toast.success(response?.data.message);
          return Promise.resolve(response.data);
        }
      } catch (error) {
        console.log(error?.response?.data);
        toast.error(error?.response?.data.message);
      } finally {
        this.loading = false;
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
      try {
        const response = await apiClient.put("/api/cart/shipping/calculate", payload);

        if (response.status === 200) {
          return Promise.resolve(response.data)
        }
      } catch (error) {
        return Promise.reject(error?.response?.data)
      }
    },

    /**
     * Apply coupon
     */
    async couponApply(code) {
      this.loading = true;

      try {
        const response = await apiClient.post("/api/cart/coupon/apply", {
          code: code
        });

        if (response.status === 200) {
          toast.success(response.data.message);
        }
      } catch (error) {
        this.errors = error.response.data;
        toast.error(error.response.data.message);
      } finally {
        this.loading = false;
      }
    },


    async checkout(payload) {  
      this.loading = true;
      try {
        const response = await apiClient.post("/api/cart/checkout", payload);
        console.log(response)

        if (response.status === 200) {
          return navigateTo(response.data?.redirect_url, {
            external: true,
          });
        }
      } catch (error) {
        if (error.response) {
          this.errors = error.response.errors;
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
