export const useSearchStore = defineStore("search", {
  state: () => ({
    loading: false,
    errors: {},
    query: "",
    dialog: false,
  }),

  getters: {
    hasQuery: (state) => {
      return state.query.trim().length > 0;
    },
  },

  actions: {
    async search(keyword) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/products/search", {
          method: "GET",
          query: {
            keyword: keyword,
          },
        });
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data;
        throw error;
      }
    },

    async setQuery(query) {
      this.query = query ?? "";
    },

    async openDialog() {
      this.dialog = true;
    },

    async closeDialog() {
      this.dialog = false;
    },

    async clear() {
      this.query = "";
      this.errors = {};
    },

    async reset() {
      this.query = "";
      this.errors = {};
      this.dialog = false;
      this.loading = false;
    },
  },
});
