export const useMessageStore = defineStore("message", {
  state: () => ({
    loading: false,
    errors: {},
    messages: null,
  }),

  persist: {
    pick: ["messages"],
    storage: piniaPluginPersistedstate.localStorage(),
  },

  getters: {},

  actions: {
    async getMessages(conversation) {
      const { $api } = useNuxtApp();

      try {
        const response = await $api(
          `/api/conversations/${conversation}/messages`,
          {
            method: "GET",
          },
        );

        this.messages = response.data;
        return response;
      } catch (error) {
        this.errors = error?.response?._data ?? {};
        throw error;
      }
    },

    async sendMessage(conversation, payload) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const response = await $api(
          `/api/conversations/${conversation}/messages`,
          {
            method: "POST",
            body: payload,
          },
        );

        return response;
      } catch (error) {
        this.errors = error?.response?._data ?? {};
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async markAsRead(conversation) {
      const { $api } = useNuxtApp();

      try {
        const response = await $api(`/api/conversations/${conversation}/read`, {
          method: "POST",
        });

        return response;
      } catch (error) {
        this.errors = error?.response?._data ?? {};
        throw error;
      }
    },
  },
});
