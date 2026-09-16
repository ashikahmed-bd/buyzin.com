export const useChatStore = defineStore("chat", {
  state: () => ({
    loading: false,
    errors: {},
    dialog: false,
    conversation: null,
  }),

  persist: {
    pick: ["conversation"],
  },

  getters: {},

  actions: {
    async getConversations() {
      const { $api } = useNuxtApp();

      try {
        return await $api("/api/conversations", {
          method: "GET",
        });
      } catch (error) {
        this.errors = error?.response?._data ?? {};
        throw error;
      }
    },

    async store(payload) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api("/api/conversations", {
          method: "POST",
          body: payload,
        });
        this.dialog = false;
        $toast.success(response.message);
        return response;
      } catch (error) {
        $toast.error(error.response._data.message);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async show(conversation) {
      const { $api } = useNuxtApp();

      try {
        const response = await $api(`/api/conversations/${conversation}`, {
          method: "GET",
        });

        this.conversation = response.data;

        return response.data;
      } catch (error) {
        this.errors = error?.response?._data ?? {};
        throw error;
      }
    },

    async delete(conversation) {
      const { $api } = useNuxtApp();

      try {
        const response = await $api(`/api/conversations/${conversation}`, {
          method: "DELETE",
        });

        return response;
      } catch (error) {
        this.errors = error?.response?._data ?? {};
        throw error;
      }
    },
  },
});
