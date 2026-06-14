// plugins/api.js
export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    const api = $fetch.create({
        baseURL: config.public.apiBase,

        onRequest({ options }) {
            const authStore = useAuthStore();
            const cartToken = useCartToken();

            options.headers = new Headers(options.headers);
            options.headers.set("X-Source", "Web");
            options.headers.set("X-APP-KEY", config.public.appKey);

            if (authStore.token) {
                options.headers.set("Authorization", `Bearer ${authStore.token}`);
            }

            if (cartToken.value) {
                options.headers.set("X-Cart-Token", cartToken.value)
            }
        },

        onResponseError({ response }) {
            console.error("API Error:", response)
        }
    })

    return {
        provide: {
            api,
        },
    }
})