export const useCategoryStore = defineStore("category", {
  state: () => ({
    errors: null,
    loading: false,
  }),

  getters: {},

  actions: {
    async getCategories() {
      const { $api } = useNuxtApp()
      try {
        return await $api("/api/categories")
      } catch (error) {
        this.errors = error?.response?._data?.errors
        throw error
      }
    },
  },
});
