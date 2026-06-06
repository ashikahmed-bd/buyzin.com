import apiClient from "~/utils/axios";

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
    async login(formData) {
      this.loading = true;
      try {
        const response = await apiClient.post("/api/auth/login", formData);
        if (response.status === 200) {
          this.token = response.data.token;
          this.user = response.data.user;
          toast.success(response.data.message);
          setTimeout(() => {
            navigateTo("/account");
          }, 3000);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        this.errors = error.response.data;
      } finally {
        this.loading = false;
      }
    },

    async getProfile() {
      if (this.user) return this.user;
      try {
        const token = this.token;
        if (!token) throw new Error("No token found");

        const response = await apiClient.get("/api/profile");
        this.user = response.data.data;
      } catch (error) {
        this.errors = error.response?.data?.errors;
      } finally {
        this.loading = false;
      }
    },

    async register(formData) {
      this.loading = true;
      try {
        const response = await apiClient.post("/api/auth/register", formData);
        if (response.status === 201) {
          toast.success(response.data.message);
          setTimeout(() => {
            navigateTo("/auth/login");
          }, 2000);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        this.errors = error.response.data.errors;
      } finally {
        this.loading = false;
      }
    },

    async forgot(formData) {
      this.loading = true;
      try {
        const response = await apiClient.post("/api/auth/forgot", formData);
        if (response.status === 200) {
          toast.success(response.data.message);
          setTimeout(() => {
            navigateTo("/auth/login");
          }, 2000);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        this.errors = error.response.data.errors;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      try {
        const response = await apiClient.post("/api/auth/logout");
        if (response.status === 200) {
          toast.success(response.data.message);
          this.$reset();
          return navigateTo("/");
        }
      } catch (error) {
        if (error.response) {
          return Promise.reject(error.response.data);
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
