export const useGiftCardStore = defineStore("giftCard", {
  state: () => ({
    loading: false,
    errors: [],
  }),

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
  },
});
