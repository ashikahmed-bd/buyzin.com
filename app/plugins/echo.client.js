import Echo from "laravel-echo";
import Pusher from "pusher-js";

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();

  window.Pusher = Pusher;

  const echo = new Echo({
    broadcaster: "reverb",
    key: "ulj6j2coiersri7xzl1g",
    wsHost: "127.0.0.1",
    wsPort: 8090,
    wssPort: 8090,
    forceTLS: false,
    enabledTransports: ["ws", "wss"],
    authEndpoint: "http://localhost:8000/broadcasting/auth",
    auth: {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
        Accept: "application/json",
      },
    },
  });

  return {
    provide: {
      echo,
    },
  };
});
