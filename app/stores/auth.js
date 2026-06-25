export const useAuthStore = defineStore("auth", {
  state: () => ({
    loading: false,
    user: null,
    token: null,
    errors: {},
  }),

  // persist: true,
  persist: {
    pick: ["user", "token"],
  },

  getters: {
    loggedIn: (state) => !!state.token,
  },

  actions: {
    async login(payload) {
      this.loading = true;
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/auth/login", {
          method: "POST",
          body: payload,
        });
        this.token = response.token;
        this.user = response.user;
        toast.success(response.message);
        setTimeout(() => {
          navigateTo("/account");
        }, 2000);
      } catch (error) {
        this.errors = error?.response?._data?.errors
        throw error
      } finally {
        this.loading = false;
      }
    },

    async getProfile() {
      const { $api } = useNuxtApp();

      if (this.user) return this.user;
      try {
        const token = this.token;
        if (!token) throw new Error("No token found");
        const response = await $api("/api/profile");
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors
        throw error
      }
    },

    async register(formData) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api("/api/auth/register", formData);
        toast.success(response.data.message);
        setTimeout(() => {
          navigateTo("/auth/login");
        }, 2000);
      } catch (error) {
        this.errors = error?.response?._data?.errors
        throw error
      }
    },

    async forgot(formData) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api("/api/auth/forgot", formData);
        if (response.status === 200) {
          toast.success(response.data.message);
          setTimeout(() => {
            navigateTo("/auth/login");
          }, 2000);
        }
      } catch (error) {
        this.errors = error?.response?._data?.errors
        throw error
      }
    },

    async logout() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api("/api/auth/logout");
        if (response.status === 200) {
          toast.success(response.data.message);
          this.$reset();
          return navigateTo("/");
        }
      } catch (error) {
        this.errors = error?.response?._data?.errors
        throw error
      }
    },
  },
});
