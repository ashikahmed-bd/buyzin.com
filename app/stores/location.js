export const useLocationStore = defineStore("location", {
  state: () => ({
    loading: false,
    errors: [],
    states: [],
    cities: [],
    areas: [],
  }),

  getters: {},

  actions: {
    async getStates() {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api(`/api/locations/states`);
        this.states = response.data;
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data;
        return error?.response?._data;
      } finally {
        this.loading = false;
      }
    },

    async getCities(state) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/locations/states/${state}/cities`);
        this.cities = response.data;
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data;
        return error?.response?._data;
      } finally {
        this.loading = false;
      }
    },

    async getAreas(city) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api(`/api/locations/cities/${city}/areas`);
        this.areas = response.data;
        return response.data;
      } catch (error) {
        this.errors = error?.response?._data;
        return error?.response?._data;
      } finally {
        this.loading = false;
      }
    },
  },
});
