import apiClient from "~/utils/axios";

export const useReviewStore = defineStore("review", {
  state: () => ({
    loading: false,
    errors: [],
    modal: true,
  }),

  getters: {},

  actions: {
    async getReviews(sku) {
      try {
        const response = await apiClient.get(`/api/products/${sku}/reviews`);
        if (response.status === 200) {
          return Promise.resolve(response);
        }
      } catch (error) {
        if (error.response) {
          return Promise.reject(error.response);
        }
      }
    },

    async like(review) {
      try {
        const response = await apiClient.post(`/api/reviews/${review}/like`);
        if (response.status === 200) {
          review.helpful_count++;
          return Promise.resolve(response);
        }
      } catch (error) {
        if (error.response) {
          return Promise.reject(error.response);
        }
      }
    },

    async unlike(review) {
      try {
        const response = await apiClient.post(`/api/reviews/${review}/unlike`);
        if (response.status === 200) {
          review.not_helpful_count++;
          return Promise.resolve(response);
        }
      } catch (error) {
        if (error.response) {
          return Promise.reject(error.response);
        }
      }
    },
  },
});
