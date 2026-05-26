import apiClient from "~/utils/axios";

export const useCollectionStore = defineStore("collection", {
  state: () => ({
    loading: false,
    errors: [],
  }),

  getters: {},

  actions: {
    async index() {
      this.loading = true;
      try {
        const response = await apiClient.get(`/api/collections`);
        if (response.status === 200) {
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.response) {
          return Promise.reject(error.response);
        }
      } finally {
        this.loading = false;
      }
    },

    async show(slug, params = {}) {
      this.loading = true;
      try {
        const response = await apiClient.get(`/api/collections/${slug}`, {
          params: {
            page: params.page,
            limit: params.limit,
            sort: params.sort,
          },
        });
        if (response.status === 200) {
          return Promise.resolve(response);
        }
      } catch (error) {
        if (error.response) {
          return Promise.reject(error.response);
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
