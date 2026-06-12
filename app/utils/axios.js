//app/utils/axios.js

import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://api.buyzin.com", // http://127.0.0.1:8000  https://api.buyzin.com
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Source": "Web",
        "X-APP-KEY": "$2y$10$.RUlpmXqOBSnmxl67aHDC.uowDpsgkIjGn/cU9iFXKmbnlkQMWfG2",
    },
    withCredentials: false,
});

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore();
        const cartToken = useCartToken();

        if (authStore.token) {
            config.headers["Authorization"] = `Bearer ${authStore.token}`;
        }
        config.headers["X-Cart-Token"] = cartToken.value;
        return config;
    },
    (error) => Promise.reject(error),
);

// Response interceptor
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                const authStore = useAuthStore();
                authStore.$reset();
                navigateTo("/auth/login");
                return Promise.reject(error);
            }
            return Promise.reject(error);
        }

        return Promise.reject(error);
    },
);

export default apiClient;
