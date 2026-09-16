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
      const toast = useToast();
      this.loading = true;
      try {
        const response = await $api("/api/conversations", {
          method: "POST",
          body: payload,
        });
        this.dialog = false;
        toast.add({
          title: response.message,
          color: "success",
        });
        return response;
      } catch (error) {
        toast.add({
          title: error.response._data.message,
          color: "error",
        });
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
