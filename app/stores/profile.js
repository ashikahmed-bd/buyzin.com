export const useProfileStore = defineStore("profile", {
  state: () => ({
    loading: false,
    errors: [],
    user: null,
  }),

  getters: {},

  actions: {
    async getProfile() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/profile");
        this.user = response.data;
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors
        throw error
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
        this.errors = error?.response?._data?.errors
        throw error
      }
    },

    async getOrders() {
      this.loading = true;
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/orders");
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors
        throw error
      }
    },


  },
});
