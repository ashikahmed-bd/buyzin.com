export const useAppStore = defineStore("app", {
  state: () => ({
    errors: null,
    loading: false,
  }),

  getters: {},

  actions: {
    async getHome() {
      const { $api } = useNuxtApp();
      try {
        return await $api("/api/home");
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async giftCardTemplates() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/gift-card-templates");
        return response;
      } catch (error) {
        this.errors = error?.response?._data;
        throw error;
      }
    },
  },
});
