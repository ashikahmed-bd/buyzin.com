export const useAddressStore = defineStore("address", {
  state: () => ({
    loading: false,
    errors: [],
  }),

  getters: {},

  actions: {
    async all() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/addresses");
        return response;
      } catch (error) {
        this.errors = error?.response?._data;
        throw error;
      }
    },

    async store(payload) {
      const { $api } = useNuxtApp();
      this.loading = true;
      const toast = useToast();
      try {
        const response = await $api("/api/addresses", {
          method: "POST",
          body: payload,
        });
        toast.add({
          title: response.message,
        });
        return navigateTo("/account/addresses");
      } catch (error) {
        this.errors = error?.response?._data;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async show(address) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/addresses/${address}`);
        return response;
      } catch (error) {
        this.errors = error?.response?._data;
        throw error;
      }
    },

    async update(address, payload) {
      const { $api } = useNuxtApp();
      this.loading = true;
      const toast = useToast();
      try {
        const response = await $api(`/api/addresses/${address}`, {
          method: "PUT",
          body: payload,
        });
        toast.add({
          title: response.message,
        });
        return navigateTo("/account/addresses");
      } catch (error) {
        this.errors = error?.response?._data;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async delete(address) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api(`/api/addresses/${address}`, {
          method: "DELETE",
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data;
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
