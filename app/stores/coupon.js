export const useCouponStore = defineStore("coupon", {
  state: () => ({
    loading: false,
    errors: [],
  }),

  getters: {},

  actions: {
    async apply(code) {
      const { $api } = useNuxtApp();
      this.loading = true;
      const toast = useToast();

      try {
        const response = await $api("/api/cart/coupon/apply", {
          method: "POST",
          body: {
            code: code,
          },
        });
        toast.add({
          title: response?.message,
          color: "success",
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data;
        toast.add({
          title: error?.response?._data?.message,
          color: "error",
        });
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
