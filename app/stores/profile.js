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
      const toast = useToast();
      try {
        const response = await $api("/api/profile", {
          method: "PUT",
          body: payload,
        });
        toast.add({
          title: response.message,
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async changePassword(payload) {
      const { $api } = useNuxtApp();
      this.loading = true;
      const toast = useToast();
      try {
        const response = await $api("/api/change-password", {
          method: "PUT",
          body: payload,
        });
        toast.add({
          title: response.message,
        });
        return response;
      } catch (error) {
        console.log("Validation Errors:", error?.response?._data?.errors);
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
