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
        return response;
      } catch (error) {
        this.errors = error?.response?._data;
        return error?.response?._data;
      } finally {
        this.loading = false;
      }
    },

    async register(payload) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api("/api/auth/register", {
          method: "POST",
          body: payload,
        });
        return response;
      } catch (error) {
        this.errors = error?.response?._data;
        return error?.response?._data;
      } finally {
        this.loading = false;
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
        this.errors = error?.response?._data;
        return error?.response?._data;
      }
    },

    async logout() {
      const { $api } = useNuxtApp();
      const toast = useToast();
      this.loading = true;
      try {
        const response = await $api("/api/auth/logout", {
          method: "POST",
        });
        this.$reset();
        toast.add({
          title: response.message,
        });
        return navigateTo("/");
      } catch (error) {
        this.errors = error?.response?._data;
        return error?.response?._data;
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
        this.errors = error?.response?._data;
        return error?.response?._data;
      }
    },
  },
});
