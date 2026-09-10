export const useShippingStore = defineStore("shipping", {
  state: () => ({
    loading: false,
    errors: {},
  }),

  getters: {},

  actions: {
    async getRates() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/shipping/rates");
        return response;
      } catch (error) {
        this.errors = error?.response?._data;
        throw error;
      }
    },

    async calculate(address) {
      const toast = useToast();
      const { $api } = useNuxtApp();

      try {
        const response = await $api("/api/cart/shipping/calculate", {
          method: "POST",
          body: {
            address_id: address,
          },
        });
        return response;
      } catch (error) {
        toast.add({
          title: error?.response?._data.message,
          color: "error",
        });
        this.errors = error?.response?._data.errors;
        throw error;
      }
    },
  },
});
