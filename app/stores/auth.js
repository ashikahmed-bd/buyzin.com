export const useAuthStore = defineStore("auth", {
  state: () => ({
    loading: false,
    user: null,
    errors: {},
    dialog: false,
    token: null,
  }),

  persist: {
    pick: ["user", "token"],
  },

  getters: {
    loggedIn: (state) => !!state.user,
  },

  actions: {
    async login(payload) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api("/api/auth/login", {
          method: "POST",
          body: {
            email: payload.email,
            password: payload.password,
            remember: payload.remember,
          },
        });
        this.token = response.token;
        this.user = response.user;
        $toast.success(response.message);
        return navigateTo("/account");
      } catch (error) {
        this.errors = error?.response?._data;
        $toast.error(error?.response?._data?.message);
        throw error;
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
        $toast.success(response.message);
        return navigateTo("/auth/login");
      } catch (error) {
        this.errors = error?.response?._data.errors;
        $toast.error(error?.response?._data.message);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async forgot(formData) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api("/api/auth/forgot-password", {
          method: "POST",
          body: formData,
        });
        $toast.success(response.message);
        return response;
      } catch (error) {
        this.errors = error?.response?._data;
        $toast.error(error?.response?._data?.message);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async reset(payload) {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        const response = await $api("/api/auth/reset-password", {
          method: "POST",
          body: payload,
        });
        $toast.success(response.message);
        return navigateTo('/auth/login');
      } catch (error) {
        this.errors = error?.response?._data;
        $toast.error(error?.response?._data?.message);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      const { $api } = useNuxtApp();
      this.loading = true;
      try {
        await $api("/api/auth/logout", {
          method: "POST",
        });
        this.$reset();
        return navigateTo("/");
      } catch (error) {
        this.errors = error?.response?._data;
        throw error;
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
