export const useProfileStore = defineStore("profile", {
  state: () => ({
    loading: false,
    errors: [],
  }),

  getters: {},

  actions: {
    async getProfile() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/profile");
        return response.data;
      } catch (error) {
        this.errors = error?.data ?? error?.response?._data ?? null;
        throw error;
      }
    },

    async update(payload) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api("/api/profile", payload);
        toast.success(response.message);
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },
  },
});
