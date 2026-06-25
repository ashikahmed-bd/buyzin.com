export const useReviewStore = defineStore("review", {
  state: () => ({
    loading: false,
    errors: [],
    modal: true,
  }),

  getters: {},

  actions: {
    async getReviews(product) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/products/${product}/reviews`);
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors
        throw error
      }
    },

    async like(review) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/reviews/${review}/like`);
        review.helpful_count++;
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors
        throw error
      }
    },

    async unlike(review) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/reviews/${review}/unlike`);
        review.not_helpful_count++;
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors
        throw error
      }
    },
  },
});
