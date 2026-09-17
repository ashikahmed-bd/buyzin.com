export const usePlanStore = defineStore("plan", {
  state: () => ({
    loading: false,
    errors: null,
  }),

  getters: {},

  actions: {
    async getPlans() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/plans");
        return response;
      } catch (error) {
        this.errors = error?.response?._data;
        return error?.response?._data;
      }
    },
  },
});
