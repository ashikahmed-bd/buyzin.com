export const useGiftCardStore = defineStore("giftCard", {
  state: () => ({
    loading: false,
    errors: [],
    giftCard: null,
  }),

  persist: {
    pick: ["giftCard"],
  },

  getters: {},

  actions: {
    async all() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/gift-cards`);
        return response;
      } catch (error) {
        this.errors = error?.response?._data;
        throw error;
      }
    },

    async apply(code, amount) {
      const { $api } = useNuxtApp();
      this.loading = true;
      const toast = useToast();

      try {
        const response = await $api("/api/gift-cards/apply", {
          method: "POST",
          body: {
            code: code,
            amount: amount,
          },
        });
        toast.add({
          title: response?.message,
          color: "success",
        });
        this.giftCard = response.data;
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

    async remove() {
      const { $api } = useNuxtApp();
      this.loading = true;
      const toast = useToast();

      try {
        const response = await $api("/api/gift-cards/remove", {
          method: "DELETE",
        });
        toast.add({
          title: response?.message,
          color: "success",
        });

        this.$reset();

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
